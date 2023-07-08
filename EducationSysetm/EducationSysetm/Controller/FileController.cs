using AutoMapper;
using Core.Entities;
using Core.IRepository;
using Core.Paging;
using Core.Repository;
using EducationSysetm.Others;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.FileDtos;
using Infrastructure.Dtos.StudentDtos;
using Infrastructure.Dtos.TeacherDtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace EducationSysetm.Controller
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IUnitOfWork _uow;
  
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _mapper;
        private List<string> _allowedImagesExtenstions = new List<string> { ".jpg", ".png", ".mp4" };
        private List<string> _allowedFilesExtenstions = new List<string> { ".pdf", ".docx" };
        private long _maxAllowedPosterSize = 10485760;
        string path = "";
        public FileController(IUnitOfWork  uow, IWebHostEnvironment webHostEnvironment, IMapper mapper)
        {
            _uow = uow;
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
        }




        [HttpPost("AddStudentFile/{studentId}")]
        public async Task<IActionResult> AddFileByStudent(Guid studentId, [FromForm] FileDto fileDto, bool isProfile)
        {
       
            if (isProfile)
            {
                var file = await _uow.Files.GetAllAsync();
                var cureentStudentprofile = file.Where(x => x.StudentId == studentId).LastOrDefault();
                if (cureentStudentprofile != null)
                {
                    var fileId = cureentStudentprofile.FileId;
                    System.IO.File.Delete(cureentStudentprofile.FilePath);
                    await _uow.Files.Delete(fileId);
                    await _uow.Save();
                }

            }

            var student = await _uow.Students.GetByIdAsync(studentId);
            if (student == null)
            {
                return NotFound("it's not found in the database");

            }
            student.Files = new List<Core.Entities.File>();
            for (int i = 0; i < fileDto.FilePath.Count; i++)
            {

                if (_allowedImagesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileDto.FilePath[i].FileName);

                }

                if (_allowedFilesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Files", fileDto.FilePath[i].FileName);

                }
                if (fileDto.FilePath[i].Length > _maxAllowedPosterSize)
                    return BadRequest("Max allowed size for poster is 1MB!");

                var file = _mapper.Map<Core.Entities.File>(fileDto);

                var fileName = fileDto.FilePath[i].FileName;
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await fileDto.FilePath[i].CopyToAsync(stream);

                }

                file.FilePath = path;
                file.FileName = fileName;
                file.InsertOn = DateTime.Now;
                if (isProfile)
                {
                    file.IsProfile = true;
                }
                var addFile = await _uow.Files.AddAsync(file);
                student.Files.Add(addFile);
            }

            _uow.Students.Update(student);
            await _uow.Save();
            return Ok("Success");
        }



        [HttpPost("AddTeacherFile/{teacherId}")]
        public async Task<IActionResult> AddFileByTeacher(Guid teacherId, [FromForm] FileDto fileDto, bool isProfile)
        {
        
            if (isProfile)
            {
                var file = await _uow.Files.GetAllAsync();
                var cureentTeacherProfile = file.Where(x => x.TeacherId == teacherId).LastOrDefault();
                if (cureentTeacherProfile != null)
                {
                    var fileId = cureentTeacherProfile.FileId;
                    System.IO.File.Delete(cureentTeacherProfile.FilePath);
                    await _uow.Files.Delete(fileId);
                    await _uow.Save();
                }

            }

            var teacher = await _uow.Teachers.GetByIdAsync(teacherId);
            if (teacher == null)
            {
                return NotFound("it's not found in the database");

            }
            teacher.Files = new List<Core.Entities.File>();
            for (int i = 0; i < fileDto.FilePath.Count; i++)
            {

                if (_allowedImagesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileDto.FilePath[i].FileName);

                }

                if (_allowedFilesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Files", fileDto.FilePath[i].FileName);

                }
                if (fileDto.FilePath[i].Length > _maxAllowedPosterSize)
                    return BadRequest("Max allowed size for poster is 1MB!");

                var file = _mapper.Map<Core.Entities.File>(fileDto);

                var fileName = fileDto.FilePath[i].FileName;
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await fileDto.FilePath[i].CopyToAsync(stream);

                }

                file.FilePath = path;
                file.FileName = fileName;
                file.InsertOn = DateTime.Now;
                if (isProfile)
                {
                    file.IsProfile = true;
                }
                var addFile = await _uow.Files.AddAsync(file);
                teacher.Files.Add(addFile);
            }

            _uow.Teachers.Update(teacher);
            await _uow.Save();
            return Ok("Success");
        }



        [HttpPost("AddCourseFile/{courseId}")]

        public async Task<IActionResult> AddFileToCourse( Guid courseId, [FromForm] FileDto fileDto, bool isProfile)
        {
            if (isProfile)
            {
                var cureentCourseProfile = await _uow.Files.GetAsync(x => x.CourseId == courseId && x.IsProfile);
               
                   if (cureentCourseProfile != null)
                  {
                   
                    var fileId = cureentCourseProfile.FileId;
                    System.IO.File.Delete(cureentCourseProfile.FilePath);
                    await _uow.Files.Delete(fileId);
                    await _uow.Save();
                  }
            }

            var course = await _uow.Courses.GetByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("it's not found in the database");

            }

            for (int i = 0; i < fileDto.FilePath.Count; i++)
            {

                if (_allowedImagesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileDto.FilePath[i].FileName);

                }

                if (_allowedFilesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Files", fileDto.FilePath[i].FileName);

                }
                if (fileDto.FilePath[i].Length > _maxAllowedPosterSize)
                    return BadRequest("Max allowed size for poster is 1MB!");

                var file = _mapper.Map<Core.Entities.File>(fileDto);

                var fileName = fileDto.FilePath[i].FileName;
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await fileDto.FilePath[i].CopyToAsync(stream);

                }

                file.FilePath = path;
                file.FileName = fileName;
                file.InsertOn = DateTime.Now;
                file.CourseId= courseId;
                if (isProfile)
                {
                    file.IsProfile = true;
                }
                await _uow.Files.AddAsync(file);
                await _uow.Save();
                var subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");
                return Ok("http://localhost:5000/" + subUrl);
            }
          
          
            return Ok("Success");

        }



        [HttpPost("AddSessionFile/{sessionId}")]
        public async Task<IActionResult> AddFileToSession(Guid sessionId, [FromForm] FileDto fileDto)
        {

            var session = await _uow.Sessions.GetByIdAsync(sessionId);
            if (session == null)
            {
                return NotFound("it's not found in the database");

            }

            session.Files = new List<Core.Entities.File>();
            for (int i = 0; i < fileDto.FilePath.Count; i++)
            {

                if (_allowedImagesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileDto.FilePath[i].FileName);

                }

                if (_allowedFilesExtenstions.Contains(Path.GetExtension(fileDto.FilePath[i].FileName).ToLower()))
                {
                    path = Path.Combine(_webHostEnvironment.WebRootPath, "Files", fileDto.FilePath[i].FileName);

                }
                if (fileDto.FilePath[i].Length > _maxAllowedPosterSize)
                    return BadRequest("Max allowed size for poster is 1MB!");

                var file = _mapper.Map<Core.Entities.File>(fileDto);

                var fileName = fileDto.FilePath[i].FileName;
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await fileDto.FilePath[i].CopyToAsync(stream);

                }

                file.FilePath = path;
                file.FileName = fileName;
                file.InsertOn = DateTime.Now;
                file.SessionId = sessionId;

                var addFile = await _uow.Files.AddAsync(file);
                session.Files.Add(addFile);
            }

            _uow.Sessions.Update(session);
            await _uow.Save();
            return Ok("Success");


        }



        [HttpDelete("DeleteTeacherFile/file:{fileId}/teacher:{teacherId}")]
        public async Task<IActionResult> DeleteTeacherFileAsync(Guid?fileId, Guid teacherId, bool isProfile)
        {

            if (isProfile )
            {
                var cureentCourseProfile = await _uow.Files.GetAsync(x => x.TeacherId == teacherId && x.IsProfile);
                if (cureentCourseProfile != null)
                {
                    System.IO.File.Delete(cureentCourseProfile.FilePath);
                    await _uow.Files.Delete(cureentCourseProfile.FileId);
                    await _uow.Save();
                }
                return NoContent();

            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.TeacherId == teacherId);
                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                System.IO.File.Delete(file.FilePath);
                await _uow.Files.Delete((Guid)fileId);
                await _uow.Save();
            }
            return NoContent();
        }



        [HttpDelete("DeleteStudentFile/file:{fileId}/student:{studentId}")]
        public async Task<IActionResult> DeleteStudentFileAsync(Guid? fileId, Guid studentId, bool isProfile)
        {
            if (isProfile)
            {
                var cureentstudentProfile = await _uow.Files.GetAsync(x => x.StudentId == studentId && x.IsProfile);
                if (cureentstudentProfile != null)
                {
                    System.IO.File.Delete(cureentstudentProfile.FilePath);
                    await _uow.Files.Delete(cureentstudentProfile.FileId);
                    await _uow.Save();
                }
                return NoContent();


            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.StudentId == studentId);
                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                System.IO.File.Delete(file.FilePath);
                await _uow.Files.Delete((Guid)fileId);
                await _uow.Save();
            }
            return NoContent();
        }





        [HttpDelete("DeleteCourseFile/file:{fileId}/course:{courseId}")]
        public async Task<IActionResult> DeleteCourseFileAsync( Guid? fileId , Guid courseId, bool isProfile)
        {
            if (isProfile)
            {
                var cureentCourseProfile = await _uow.Files.GetAsync(x => x.CourseId == courseId && x.IsProfile);
                if (cureentCourseProfile != null)
                {
                    System.IO.File.Delete(cureentCourseProfile.FilePath);
                    await _uow.Files.Delete((Guid)fileId);
                    await _uow.Save();
                }
                return NoContent();

            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.CourseId == courseId);
                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                System.IO.File.Delete(file.FilePath);
                await _uow.Files.Delete((Guid)fileId);
                await _uow.Save();
            }
            return NoContent();
        }


        [HttpDelete("DeleteSessionFile/file:{fileId}/session:{sessionId}")]
        public async Task<IActionResult> DeleteSessionFileAsync(Guid fileId, Guid sessionId)
        {
            var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.SessionId == sessionId);
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
            System.IO.File.Delete(file.FilePath);
            await _uow.Files.Delete(fileId);
            await _uow.Save();
            return NoContent();
        }



        [HttpGet("GetStudentFile/{studentId}")]
        public async Task<IActionResult> GetStudentFileAsync(Guid studentId , bool isProfile)
        {
            var subUrl = "";
            if (isProfile)
            {
                var cureentStudentProfile = await _uow.Files.GetAsync(x=>x.StudentId==studentId&& x.IsProfile);
                if (cureentStudentProfile != null)
                {
                    var path = cureentStudentProfile.FilePath;
                    subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");
                }
                return Ok("http://localhost:5000/" + subUrl);

            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.StudentId == studentId);

                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                var path = file.FilePath;
                subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");

                return Ok("http://localhost:5000/" + subUrl);
            }
        }


        [HttpGet("GetTeacherFile/{teacherId}")]
        public async Task<IActionResult> GetTeacherFileAsync( Guid teacherId, bool isProfile)
        {
            var subUrl = "";
            if (isProfile)
            {
                var cureentTeacherProfile = await _uow.Files.GetAsync(x => x.TeacherId == teacherId && x.IsProfile);

                if (cureentTeacherProfile != null)
                {
                    var path = cureentTeacherProfile.FilePath;
                    subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");

                    byte[] b = System.IO.File.ReadAllBytes(path);
                    var b64 = Convert.ToBase64String(b);
                }
                return Ok("http://localhost:5000/" + subUrl);

            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.TeacherId == teacherId);

                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                var path = file.FilePath;
                subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");


                return Ok("http://localhost:5000/" + subUrl);
            }
        }

        [HttpGet("GetCourseFile/{courseId}")]
        public async Task<IActionResult> GetCourseFileAsync(Guid courseId, bool isProfile)
        {
            var subUrl = "";
            if (isProfile)
            {
                var cureentCourseProfile = await _uow.Files.GetAsync(x => x.CourseId == courseId && x.IsProfile);

                if (cureentCourseProfile != null)
                {
                    var path = cureentCourseProfile.FilePath;
                    subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");
                }
                return Ok("http://localhost:5000/" + subUrl);

            }
            else
            {
                var file = await _uow.Files.GetAsync(x => x.CourseId == courseId);

                if (file == null)
                {
                    return NotFound("it's not found in the database");

                }
                var path = file.FilePath;
                subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");
                return Ok("http://localhost:5000/" + subUrl);
            }
        }

        [HttpGet("GetSessionFileVideo/{sessionId}")]
        public async Task<IActionResult> GetSessionFileAsync(Guid sessionId)
        {

            var file = await _uow.Files.GetAsync(x => x.SessionId == sessionId && x.FileName.Contains("mp4"));
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
            var path = file.FilePath;
            var subUrl = path.Split("wwwroot\\").Last().Replace("\\", "/");
            return Ok("http://localhost:5000/" + subUrl);
        }


        [HttpGet("DownloadTeacherFile/file:{fileId}/teacher:{teacherId}")]
        public async Task<IActionResult> DownloadTeacherFileAsync(Guid fileId, Guid teacherId)
        {

            var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.TeacherId == teacherId);
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
            var path = file.FilePath;

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }


        [HttpGet("DownloadStudentFile/file:{fileId}/student:{studentId}")]
        public async Task<IActionResult> DownloadStudentFileAsync( Guid fileId ,Guid studentId)
        {

            var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.StudentId == studentId);
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
            var path = file.FilePath;
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }




        [HttpGet("DownloadCourseFile/file:{fileId}/coures:{courseId}")]
        public async Task<IActionResult> DownloadCourseFileAsync(Guid fileId, Guid courseId)
        {

            var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.CourseId == courseId);
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
            var path = file.FilePath;
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }




        [HttpGet("DownloadSessionFile/file:{fileId}/session:{sessionId}")]
        public async Task<IActionResult> DownloadSessionFileAsync(Guid fileId,Guid sessionId)
        {

            var file = await _uow.Files.GetAsync(x => x.FileId == fileId && x.SessionId == sessionId);
            if (file == null)
            {
                return NotFound("it's not found in the database");

            }
  
            var path = file.FilePath;
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }


        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
                    {
                        {".txt", "text/plain"},
                        {".pdf", "application/pdf"},
                        {".doc", "application/vnd.ms-word"},
                        {".docx", "application/vnd.ms-word"},
                        {".xls", "application/vnd.ms-excel"},
                        {".xlsx", "application/vnd.openxmlformats officedocument.spreadsheetml.sheet"},
                        {".png", "image/png"},
                        {".jpg", "image/jpeg"},
                        {".jpeg", "image/jpeg"},
                        {".gif", "image/gif"},
                        {".csv", "text/csv"},
                     {".mp4", "video/.mp4"}
                    };

        }


    }
}

