using AssetManagement.Model.DTO.EmployeeDto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Validators.EmployeeCheck
{
    public class CreateEmployeeValidator : AbstractValidator<CreateEmployeeDTO>
    {
        public CreateEmployeeValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("First Name is required");
            /*RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Last Name is required");*/
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format");
            RuleFor(x => x.Department)
                .NotEmpty()
                .WithMessage("Department is required");
        }
    }
}
