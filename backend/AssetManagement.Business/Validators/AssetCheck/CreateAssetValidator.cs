using AssetManagement.Model.DTO.AssetDto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Validators
{
    public class CreateAssetValidator : AbstractValidator<CreateAssetDTO>
    {
        public CreateAssetValidator()
        {
            RuleFor(x => x.AssetName)
                .NotEmpty()
                .WithMessage("Name is required");
            RuleFor(x => x.AssetType)
                .NotEmpty()
                .WithMessage("Enter Asset Type");
            RuleFor(x => x.SerialNumber)
                .NotEmpty()
                .WithMessage("Serial Number is required");
        }
    }
}