using FluentValidation;
using Infrastructure.Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Validation
{
    public class AplicationUserValidation : AbstractValidator<ApplicationUser>
    {
        public AplicationUserValidation()
        {
             RuleFor(u => u.FirstName).NotNull()
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50);

            RuleFor(u => u.LastName).NotNull()
           .NotEmpty()
           .MinimumLength(3)
           .MaximumLength(50);
        }
    }
}
