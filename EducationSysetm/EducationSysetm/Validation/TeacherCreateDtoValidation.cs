using Core.Entities;
using FluentValidation;
using Infrastructure.Dtos.TeacherDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Validation
{
    public class TeacherCreateDtoValidation : AbstractValidator<TeacherCreateDto>
    {
        public TeacherCreateDtoValidation()
        {
            RuleFor(t => t.FirstName).NotNull()
              .NotEmpty().WithMessage("{PropertyName} should be not empty. NEVER!")
              .MinimumLength(3)
              .MaximumLength(15);

            RuleFor(t => t.LastName).NotNull()
               .NotEmpty().WithMessage("{PropertyName} should be not empty. NEVER!")
               .MinimumLength(3)
               .MaximumLength(15);

            RuleFor(c => c.Salary).NotNull().NotEmpty().WithMessage("{PropertyName} should be not empty. NEVER!");

        }
    }
}
