using AutoMapper;
using Core.Entities;
using Core.Paging;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.FileDtos;
using Infrastructure.Dtos.SessionDtos;
using Infrastructure.Dtos.StudentDtos;
using Infrastructure.Dtos.TeacherDtos;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {

                   
           CreateMap<Course, CourseDto>().ReverseMap();
           CreateMap<Course, CourseVm>().ReverseMap();
           CreateMap<Course, CourseCreateDto>().ReverseMap();
           CreateMap<Course, CourseUpdateDto>().ReverseMap();
           CreateMap<Course, CourseSessionDto>().ReverseMap();
     

           CreateMap<Session, SessionDto>().ReverseMap();
           CreateMap<Session, SessionVm>().ReverseMap();
           CreateMap<Session, SessionCreateDto>().ReverseMap();
           CreateMap<Session, SessionUpdateDto>().ReverseMap();
           CreateMap<Session, SessionStudentDto>().ReverseMap();

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Student, StudentVm>().ReverseMap();
            CreateMap<Student, StudentCreateDto>().ReverseMap();
            CreateMap<Student, StudentUpdateDto>().ReverseMap();
          

            CreateMap<Teacher, TeacherDto>().ReverseMap();
            CreateMap<Teacher, TeacherVm>().ReverseMap();
            CreateMap<Teacher, TeacherCreateDto>().ReverseMap();
            CreateMap<Teacher, TeacherUpdateDto>().ReverseMap();
            
            
            CreateMap<File,FileDto>().ReverseMap();
            CreateMap<File, SessionFilesDto>().ReverseMap();
            CreateMap<Task<File>, File>().ReverseMap();
            CreateMap<File, FileVm>().ReverseMap();

        } 
    }
}
