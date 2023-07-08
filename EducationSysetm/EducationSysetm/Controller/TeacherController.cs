using AutoMapper;
using Core.Entities;
using Core.IRepository;
using Core.Models.Authentication;
using Core.Paging;
using EducationSysetm.Others;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.StudentDtos;
using Infrastructure.Dtos.TeacherDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EducationSysetm.Controller
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private IUnitOfWork _uow;
        private ILogger<TeacherController> _logger;
        private IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public TeacherController(IUnitOfWork uow, ILogger<TeacherController> logger, IMapper mapper ,UserManager<ApplicationUser> userManager)
        {
            _uow = uow;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("{teacherId}")]
        public async Task<IActionResult> GetTeacherById(Guid teacherId)
        {

            var studentItem = await _uow.Teachers.GetAsync(x => x.TeacherId == teacherId, new List<string>() { "Courses" });
            if (studentItem != null)
            {

                return Ok(_mapper.Map<TeacherVm>(studentItem));

            }

            _logger.LogError("Something Went Wrong Try Later.");
            return NotFound();

        }

  

        [HttpGet]
        public async Task<IActionResult> GetTeachers([FromQuery] PagingDetails paging, string sortOrder, string searchString, decimal? salary, DateTime? joinedDateFrom, DateTime? joinedDateTo)
        {
            var teacher =await _uow.Teachers.GetAllAsync(null, null);
            if (!String.IsNullOrEmpty(searchString))
            {
                teacher.Where(x => x.FirstName.Contains(searchString) || x.LastName.Contains(searchString) || x.Specialization.Contains(searchString));
            }
            if (salary != null && salary != 0)
            {
                teacher.Where(x => x.Salary == salary);
            }

            if (joinedDateFrom.HasValue && !joinedDateTo.HasValue)
            {
                teacher.Where(x => x.JoinedDate == joinedDateFrom);
            }

            if (joinedDateFrom.HasValue && joinedDateTo.HasValue)
            {
                teacher.Where(x => x.JoinedDate >= joinedDateFrom && x.JoinedDate <= joinedDateTo) ;
            }
            switch (sortOrder)
            {
                case "FirstName_desc":

                    teacher.OrderByDescending(x => x.FirstName).ThenByDescending(x => x.LastName).ThenByDescending(x => x.JoinedDate);
                    break;
                case "FirstName_asc":
                    teacher.OrderBy(x => x.FirstName).ThenByDescending(x => x.LastName).ThenByDescending(x => x.JoinedDate);
                    break;
                case "Salary_desc":
                    teacher.OrderByDescending(x => x.Salary).ThenByDescending(x => x.LastName).ThenByDescending(x => x.JoinedDate);
                    break;
                case "Salary_asc":
                    teacher.OrderBy(x => x.Salary).ThenByDescending(x => x.LastName).ThenByDescending(x => x.JoinedDate);
                    break;

                case "JoinedDate_asc":
                    teacher.OrderBy(x => x.JoinedDate).ThenBy(x => x.FirstName).ThenByDescending(x => x.LastName);
                    break;

                default:
                    teacher.OrderByDescending(x => x.JoinedDate).ThenBy(x => x.FirstName).ThenByDescending(x => x.LastName);
                    break;
            }

            var result = PagedList<Teacher>.ToPagedList(teacher, paging.PageNumber, paging.PageSize);
            Utility.Result(result, Response);
            return Ok(_mapper.Map<IList<TeacherDto>>(result));

        }


        [HttpPost]
        public async Task<IActionResult> CreateTeacher(TeacherCreateDto teacherCreateDto)
        {

   
                var TeacherItem = _mapper.Map<Teacher>(teacherCreateDto);
                var newTeacher = await _uow.Teachers.AddAsync(TeacherItem);
            
                var result = await _userManager.CreateAsync(new ApplicationUser { Id = TeacherItem.TeacherId.ToString(), FirstName= newTeacher.FirstName, LastName=newTeacher.LastName, UserName = newTeacher.Email, Email = newTeacher.Email }, teacherCreateDto.Password);
                if (result.Succeeded)
                {
                newTeacher.AppUserId = TeacherItem.TeacherId;
                var user = await _userManager.FindByIdAsync(TeacherItem.TeacherId.ToString());
                    await _userManager.AddToRoleAsync(user, "TEACHER");
                }
                else
                {
                    return BadRequest();
                }
                await _uow.Save();
                return Ok("Success");
            

        }




        [HttpPut("{teacherId}")]
        public async Task<IActionResult> UpdateTeacher(Guid teacherId, TeacherUpdateDto teacherUpdateDto)
        {
            var TeacherItem = await _uow.Teachers.GetAsync(x => x.TeacherId == teacherId, new List<string>() { "Courses" });
            if (TeacherItem == null)
            {
                return NotFound("it's not found in the database");
            } 
          _mapper.Map(teacherUpdateDto, TeacherItem);
            _uow.Teachers.Update(TeacherItem);
            await _uow.Save();
            return Ok("Success");

        }


        [HttpPut("{teacherId}/courses")]
        public async Task<IActionResult>AddCourseToTeacher(Guid teacherId, List<Guid> coursesIds)
        {
            var teacherItem = await _uow.Teachers.GetAsync(x => x.TeacherId == teacherId, new List<string>() { "Courses" });
            if (teacherItem == null)
            {
                return NotFound("it's not found in the database");
            }

            for (int i = 0; i < coursesIds.Count; ++i)
            {
                var courseItem = await _uow.Courses.GetByIdAsync(coursesIds[i]);

                teacherItem.Courses.Add(courseItem);
            }

            _uow.Teachers.Update(teacherItem);
            await _uow.Save();
            return Ok("Success");

        }



        [HttpDelete("{teacherId}")]
        public async Task<IActionResult> DeleteTeacher( Guid teacherId)
        {
            var tacherItem = await _uow.Teachers.GetByIdAsync(teacherId);
            if (tacherItem == null)
            {
                return NotFound("it's not found in the database");
            }
            ApplicationUser teacherAsUser = await _userManager.FindByIdAsync(tacherItem.AppUserId.ToString());
            await _userManager.DeleteAsync(teacherAsUser);
            await _uow.Teachers.Delete(teacherId);
            await _uow.Save();
            _logger.LogInformation("someone deleted a Course");
            return NoContent();

        }

        [HttpGet("count")]
        public async Task<IActionResult> GetTeacherCount()
        {
            var TeacherCount = await _uow.Teachers.CountAsync();
            return Ok(TeacherCount);
        }
    }
}
