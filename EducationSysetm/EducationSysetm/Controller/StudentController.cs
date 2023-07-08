using AutoMapper;
using Core.Contracts;
using Core.Entities;
using Core.IRepository;
using Core.Models.Authentication;
using Core.Paging;
using EducationSysetm.Others;
using Infrastructure.Dtos.StudentDtos;
using Infrastructure.Dtos.TeacherDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Controller
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private IUnitOfWork _uow;
        private ILogger<CourseController> _logger;
        private IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthenticationService _authenticationService;

        public StudentController(IUnitOfWork uow, IAuthenticationService authenticationService, ILogger<CourseController> logger, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _uow = uow;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authenticationService = authenticationService;
        }


        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudentById(Guid studentId)
        {

            var studentItem = await _uow.Students.GetAsync(x => x.StudentId == studentId, new List<string>() { "Courses" ,"Sessions"});
            if (studentItem != null)
            {

                return Ok(_mapper.Map<StudentVm>(studentItem));

            }

            _logger.LogError("Something Went Wrong Try Later.");
            return NotFound();

        }


        [HttpGet]
        public async Task<IActionResult> GetStudents([FromQuery] PagingDetails paging, string sortOrder, string searchString, string level, DateTime? joinedDateFrom, DateTime? joinedDateTo)
        {
            var students = await _uow.Students.GetAllAsync(null, null);
            if (!String.IsNullOrEmpty(searchString))
            {
                students.Where(x => x.FirstName.Contains(searchString) || x.LastName.Contains(searchString));
            }

            if (!String.IsNullOrEmpty(level))
            {
                students.Where(x => x.Level == level)   ;
            }
            if (joinedDateFrom.HasValue && !joinedDateTo.HasValue)
            {
                students.Where(x => x.JoinedDate == joinedDateFrom) ;
            }

            if (joinedDateFrom.HasValue && joinedDateTo.HasValue)
            {
                students.Where(x => x.JoinedDate >= joinedDateFrom && x.JoinedDate <= joinedDateTo) ;
            }
            switch (sortOrder)
            {
                case "FirstName_desc":

                    students.OrderByDescending(x => x.FirstName).ThenByDescending(x => x.Level).ThenByDescending(x => x.JoinedDate) ;
                    break;
                case "FirstName_asc":
                    students.OrderBy(x => x.FirstName).ThenByDescending(x => x.Level).ThenByDescending(x => x.JoinedDate)   ;
                    break;

                case "JoinedDate_asc":
                    students.OrderBy(x => x.JoinedDate).ThenBy(x => x.FirstName).ThenByDescending(x => x.Level) ;
                    break;

                default:
                    students.OrderByDescending(x => x.JoinedDate).ThenBy(x => x.FirstName).ThenByDescending(x => x.Level)   ;
                    break;
            }

            var result = PagedList<Student>.ToPagedList(students, paging.PageNumber, paging.PageSize);
            Utility.Result(result, Response);
            return Ok(_mapper.Map<IList<StudentDto>>(result));

        }



        //[Authorize(Roles ="User")]
        [HttpPost]
        public async Task<IActionResult> CreateStudent(StudentCreateDto studentCreateDto)
        {

            var studentItem = _mapper.Map<Student>(studentCreateDto);
            var newStudent = await _uow.Students.AddAsync(studentItem);

            RegistrationRequest model = new RegistrationRequest();
            model.FirstName = studentCreateDto.FirstName;
            model.LastName = studentCreateDto.LastName;
            model.Username = studentCreateDto.UserName;
            model.Email= studentCreateDto.Email;
            model.UserId = studentItem.StudentId.ToString();
            model.Password=studentCreateDto.Password;

            var result = await _authenticationService.RegisterAsync(model);
            if (result.Message is not null)
            {
                return BadRequest(result.Message);
            }
            newStudent.AppUserId = studentItem.StudentId;
        
            await _uow.Save();
            return Ok(result);
        }






        //[HttpPost]
        //public async Task<IActionResult> CreateStudent(StudentCreateDto studentCreateDto)
        //{

        //    if (User.IsInRole("User"))
        //    {
        //        var studentItem = _mapper.Map<Student>(studentCreateDto);

        //        var newStudent = await _uow.Students.AddAsync(studentItem);

        //        var result = await _userManager.CreateAsync(new ApplicationUser { Id = studentItem.StudentId.ToString(), FirstName = newStudent.FirstName, LastName = newStudent.LastName, UserName = newStudent.Email, Email = newStudent.Email }, studentCreateDto.Password);
        //        if (result.Succeeded)
        //        {
        //            newStudent.AppUserId = studentItem.StudentId;
        //            var user = await _userManager.FindByIdAsync(studentItem.StudentId.ToString());
        //            await _userManager.AddToRoleAsync(user, "USER");
        //        }
        //        else
        //        {
        //            return BadRequest();
        //        }
        //        await _uow.Save();
        //        return Ok("Success");
        //    }
        //    else
        //        return StatusCode(403);

        //}





        [HttpPut("{studentId}")]
        public async Task<IActionResult> UpdateStudent( Guid studentId, StudentUpdateDto  studentUpdateDto)
        {
            var studentItem = await _uow.Students.GetByIdAsync(studentId);
            if (studentItem == null)
            {
                return NotFound("it's not found in the database");
            }
            _mapper.Map(studentUpdateDto, studentItem);
            _uow.Students.Update(studentItem);
            await _uow.Save();
            return Ok("Success");


        }
        [HttpDelete("{studentId}")]
        public async Task<IActionResult> DeleteStudent(Guid studentId)
        {
            var studentItem = await _uow.Students.GetByIdAsync(studentId);
            if (studentItem == null)
            {
                return NotFound("it's not found in the database");
            }
            ApplicationUser studentAsUser =await _userManager.FindByIdAsync(studentItem.AppUserId.ToString());
            await _userManager.DeleteAsync(studentAsUser);
            await _uow.Students.Delete(studentId);
            await _uow.Save();
            _logger.LogInformation("someone deleted a Course");
            return NoContent();

        }


        [HttpPut("{studentId}/courses")]
        public async Task<IActionResult> AddStudentToCourseAsync(Guid studentId, List<Guid> coursesIds)
        {
            var studentItem = await _uow.Students.GetAsync(x => x.StudentId == studentId, new List<string>() { "Courses" });
            if (studentItem == null)
            {
                return NotFound("it's not found in the database");
            }

            for (int i = 0; i < coursesIds.Count; ++i)
            {
                var courseItem = await _uow.Courses.GetByIdAsync(coursesIds[i]);

                studentItem.Courses.Add(courseItem);
            }

            _uow.Students.Update(studentItem);
            await _uow.Save();
            return Ok("Success");

        }



        [HttpGet("count")]
        public async Task<IActionResult> GetStudnetCount()
        {

            var studentCount = await _uow.Students.CountAsync();
            return Ok(studentCount);
        }
    }
}
