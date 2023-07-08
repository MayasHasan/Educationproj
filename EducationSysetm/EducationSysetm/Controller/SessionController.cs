using AutoMapper;
using Core.Entities;
using Core.IRepository;
using Core.Paging;
using EducationSysetm.Others;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.SessionDtos;
using Microsoft.AspNetCore.Http;
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
    public class SessionController : ControllerBase
    {
        private IUnitOfWork _uow;
        private ILogger<SessionController> _logger;
        private IMapper _mapper;

        public SessionController(IUnitOfWork uow, ILogger<SessionController> logger, IMapper mapper)
        {
            _uow = uow;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{sessionsId}")]
        public async Task<IActionResult> GetSessionWithDetails(Guid sessionsId)
        {

            var sessionsItem = await _uow.Sessions.GetAsync(x => x.SessionId == sessionsId, new List<string>() { "Students" ,"Files","Course" });
            if (sessionsItem != null)
            {
                return Ok(_mapper.Map<SessionVm>(sessionsItem));

            }
            _logger.LogError("Something Went Wrong Try again.");
            return NotFound();


        }


        [HttpGet]
        public async Task<IActionResult> GetSessions([FromQuery] PagingDetails paging, string sortOrder, string searchString, DateTime? sessionDate)
        {
            var sessions =await _uow.Sessions.GetAllAsync(null, null);

            if (!String.IsNullOrEmpty(searchString))
            {
                sessions.Where(x => x.SessionTitle.Contains(searchString))  ;
            }

            if (sessionDate.HasValue)
            {
                sessions.Where(x => x.Date == sessionDate)  ;
            }

            switch (sortOrder)
            {
                case "SessionTitle_desc":

                    sessions.OrderByDescending(x => x.SessionTitle).ThenByDescending(x => x.Date)   ;
                    break;
                case "SessionTitle_asc":
                    sessions.OrderBy(x => x.SessionTitle).ThenByDescending(x => x.Date) ;
                    break;


                case "SessionDate_desc":
                    sessions.OrderByDescending(x => x.Date).ThenBy(x => x.SessionTitle) ;
                    break;

                case "SessionDate_asc":
                    sessions.OrderBy(x => x.Date).ThenBy(x => x.SessionTitle)   ;
                    break;

                default:
                    sessions.OrderByDescending(x => x.Date).ThenBy(x => x.SessionTitle) ;
                    break;
            }

            var result = PagedList<Session>.ToPagedList(sessions, paging.PageNumber, paging.PageSize);
            Utility.Result(result, Response);
            return Ok(_mapper.Map<IList<SessionDto>>(result));

        }


        [HttpPost("{courseid}")]
        public async Task<IActionResult> CreateSession(SessionCreateDto sessionCreateDto, Guid courseid)
        {
             var sessionItem = _mapper.Map<Session>(sessionCreateDto);
            sessionItem.CourseId = courseid;
            await _uow.Sessions.AddAsync(sessionItem);
            await _uow.Save();
            return Ok(sessionItem.SessionId);

        }
     

        [HttpPut("{sessionId}")]
        public async Task<IActionResult> UpdateSession(Guid sessionId, SessionUpdateDto sessionUpdateDto)
        {
            var sessionItem = await _uow.Sessions.GetAsync(x => x.SessionId == sessionId);
            if (sessionItem == null)
            {
                return NotFound("it's not found in the database");
            }
            _mapper.Map(sessionUpdateDto, sessionItem);
            _uow.Sessions.Update(sessionItem);
            await _uow.Save();
            return Ok("Success");


        }
        [HttpDelete("{sessionId}")]
        public async Task<IActionResult> DeleteSession(Guid sessionId)
        {
            var sessionItem = await _uow.Sessions.GetByIdAsync(sessionId);
            if (sessionItem == null)
            {
                return NotFound("it's not found in the database");
            }
            await _uow.Sessions.Delete(sessionId);
            await _uow.Save();
            _logger.LogInformation("someone deleted a Course");
            return NoContent();

        }


        [HttpGet("count")]
        public async Task<IActionResult> GetSessionCount()
        {
            var sessionCount = await _uow.Sessions.CountAsync();
            return Ok(sessionCount);
        }



        [HttpPut("{SessionId:Guid}/addStudent/{studentId}")]
        public async Task<IActionResult> AddStudentToSessionAsync(Guid SessionId, SessionStudentDto sessionStudentDto, Guid studentId)
        {
            var sessionItem = await _uow.Sessions.GetByIdAsync(SessionId);
            var student = await _uow.Students.GetByIdAsync(studentId);
            if (sessionItem == null)
            {
                return NotFound("it's not found in the database");
            }
            sessionItem.Students = new List<Student>();
            sessionItem.Students.Add(student);
            _mapper.Map(sessionStudentDto, sessionItem);
            _uow.Sessions.Update(sessionItem);
            await _uow.Save();
            return Ok("Success");

        }

    }
}

