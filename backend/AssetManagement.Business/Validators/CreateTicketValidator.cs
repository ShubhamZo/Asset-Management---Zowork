using AssetManagement.Model.DTO.TicketDto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Validators
{
    public class CreateTicketValidator : AbstractValidator<CreateTicketDto>
    {
        public CreateTicketValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Description)
                .NotEmpty()
                .MaximumLength(500);

            RuleFor(x => x.AssetId)
                .GreaterThan(0);

            RuleFor(x => x.EmployeeId)
                .GreaterThan(0);
        }
    }
}
