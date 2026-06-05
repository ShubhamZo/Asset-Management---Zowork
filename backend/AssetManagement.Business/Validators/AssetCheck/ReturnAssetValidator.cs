using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.DTO.AssetDto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Validators.AssetCheck
{
    public class ReturnAssetValidator : AbstractValidator<ReturnAssetDTO>
    {
        public ReturnAssetValidator() 
        {
            RuleFor(x => x.ConditionAtReturn)
            .NotEmpty()
            .MaximumLength(200);
        }
    }
}
