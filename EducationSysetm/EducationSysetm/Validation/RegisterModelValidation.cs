using Core.Models.Authentication;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Validation
{
    public class RegisterModelValidation: AbstractValidator<RegistrationRequest>
    {
        public RegisterModelValidation()
        {
            RuleFor(r => r.FirstName).NotNull()
               .NotEmpty()
               .MinimumLength(3)
               .MaximumLength(50);

            RuleFor(r => r.LastName).NotNull()
             .NotEmpty()
             .MinimumLength(3)
             .MaximumLength(50);

            RuleFor(r => r.Username).NotNull()
             .NotEmpty()
             .MinimumLength(3)
             .MaximumLength(50);

            RuleFor(r => r.Email).NotNull()
             .NotEmpty()
             .MinimumLength(3)
             .MaximumLength(50);

            RuleFor(r => r.Password).NotNull()
             .NotEmpty()
             .MinimumLength(3)
             .MaximumLength(50);
        }
    }
}
