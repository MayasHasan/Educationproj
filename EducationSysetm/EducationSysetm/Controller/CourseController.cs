using AutoMapper;
using Core.Entities;
using Core.IRepository;
using Core.Paging;
using Core;
using EducationSysetm.Others;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos.CourseDtos;

namespace EducationSysetm.Controller
{


    [Route("api/v1/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly ILogger<CourseController> _logger;
        private readonly IMapper _mapper;
        public CourseController( IUnitOfWork uow, ILogger<CourseController> logger, IMapper mapper)
        {
        
            _uow = uow;
            _logger = logger;
            _mapper = mapper;
        }

    

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetCourseWithDetails(Guid courseId)
        {

           var courseItem = await _uow.Courses.GetAsync(x => x.CourseId == courseId, new List<string>() { "Students" ,"Sessions", "Teacher" });
           
            if (courseItem != null)
            {
                return Ok(_mapper.Map<CourseVm>(courseItem));

            }
            _logger.LogError("Something Went Wrong Try Later.");
            return NotFound();


        }


        [HttpGet]
        public async Task<IActionResult> GetCourses([FromQuery] PagingDetails paging, string sortOrder, string title, string level, decimal? price, DateTime? startDate, DateTime? endDate)
        {

            var courses = await _uow.Courses.GetAllAsync( null, null, new List<string>() { "Files" });

            if (!String.IsNullOrEmpty(title))
            {
                courses = courses.Where(c => c.Title.Contains(title));

            }

            if (!String.IsNullOrEmpty(level))
            {
                courses = courses.Where(c => c.Level == level);

            }

            if (price != null)
            {
                courses = courses.Where(x => x.FullPrice == price);
            }

            if (startDate.HasValue && !endDate.HasValue)
            {
                courses = courses.Where(x => x.StartDate == startDate);
            }

            if (!startDate.HasValue && endDate.HasValue)
            {
                courses = courses.Where(x => x.EndDate == endDate);
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                courses = courses.Where(x => x.StartDate >= startDate && x.EndDate <= endDate);
            }

            switch (sortOrder)
            {
                case "Title_desc":

                    courses = courses.OrderByDescending(x => x.Title).ThenByDescending(x => x.StartDate);
                    break;
                case "Title_asc":
                    courses = courses.OrderBy(x => x.Title).ThenByDescending(x => x.StartDate);
                    break;
                case "FulPrice_desc":
                    courses = courses.OrderByDescending(x => x.FullPrice).ThenByDescending(x => x.StartDate);
                    break;
                case "FulPrice_asc":
                    courses = courses.OrderBy(x => x.Title).ThenByDescending(x => x.StartDate);
                    break;
                case "Level_desc":
                    courses = courses.OrderByDescending(x => x.Level).ThenByDescending(x => x.StartDate);
                    break;

                case "Level_asc":
                    courses = courses.OrderBy(x => x.Level).ThenByDescending(x => x.StartDate);
                    break;

                case "StartDate_asc":
                    courses = courses.OrderBy(x => x.StartDate).ThenBy(x => x.Title);
                    break;

                default:
                    courses = courses.OrderByDescending(x => x.StartDate).ThenBy(x => x.Title);
                    break;
            }


            var result = PagedList<Course>.ToPagedList(courses, paging.PageNumber, paging.PageSize);

            Utility.Result(result, Response);

            for (int i = 0; i < result.Count; i++)
            {
                var course = result[i];
                foreach (var item in course.Files)
                {
                    item.FilePath = "http://localhost:5000/" + item.FilePath.Split("wwwroot\\").Last().Replace("\\", "/");

                }

            }

            var c = _mapper.Map<IList<CourseDto>>(result);
            return Ok(c);
        }




        [HttpPost]
        public async Task<IActionResult> CreateCourse(CourseCreateDto courseCreateDto)
        {
            var courseItem = _mapper.Map<Course>(courseCreateDto);
            await _uow.Courses.AddAsync(courseItem);
            await _uow.Save();
            return Ok(courseItem.CourseId);

        }
   
        [HttpPut("{courseId}")]
        public async Task<IActionResult> UpdateCourse(Guid courseId, CourseUpdateDto courseUpdateDto)
        {
            var courseItem = await _uow.Courses.GetAsync(x => x.CourseId == courseId);
            if (courseItem == null)
            {
                return NotFound("it's not found in the database");
            }
            _mapper.Map(courseUpdateDto, courseItem);
            _uow.Courses.Update(courseItem);
            await _uow.Save();
            return Ok("Success");


        }
        [HttpDelete("{courseId}") ]
        public async Task<IActionResult> DeleteCourse(Guid courseId)
        {
            var courseItem = await _uow.Courses.GetByIdAsync(courseId);
            if (courseItem == null)
            {
                return NotFound("it's not found in the database");
            }
            await _uow.Courses.Delete(courseId);
            await _uow.Save();
            _logger.LogInformation("someone deleted a Course");
            return NoContent();

        }


        [HttpPut("{courseId}/removeItemFromCourse")]
        public async Task<IActionResult> RemoveEntityfromCourses(Guid courseId, Guid? studentId ,  Guid? teacherId)
        {
           var courseItem = await _uow.Courses.GetAsync(x=>x.CourseId== courseId, new List<string>{ "Students" });
            if (courseItem == null)
            {
                return NotFound("it's not found in the database");
            }
            if (studentId != null)
            {
                var courseStudent = courseItem.Students.First(x => x.StudentId == studentId);
                if (courseStudent == null)
                {
                    return NotFound("it's not found in the database");

                }
                courseItem.Students.Remove(courseStudent);
            }
            
            if (teacherId != null)
            {
                courseItem.TeacherId = null;

            }

            await _uow.Save();
            return Ok("Success");

        }

        [HttpGet("count")]
        public async Task<IActionResult> GetCoursesCount()
        {

            var coursesCount = await _uow.Courses.CountAsync();
            return Ok(coursesCount);
        }

    }
}
