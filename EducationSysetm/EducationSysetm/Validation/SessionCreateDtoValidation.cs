using Core.Entities;
using FluentValidation;
using Infrastructure.Dtos.SessionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Validation
{
    public class SessionCreateDtoValidation : AbstractValidator<SessionCreateDto>
    {
        public SessionCreateDtoValidation()
        {
            RuleFor(s => s.SessionTitle).NotNull()
               .NotEmpty().WithMessage("{PropertyName} should be not empty. NEVER!")
               .MinimumLength(0)
               .MaximumLength(10);
            RuleFor(s => s.Date).NotNull().NotEmpty().WithMessage("{PropertyName} should be not empty. NEVER!");

        }
    }
}
