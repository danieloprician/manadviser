using FluentValidation;
using InsuranceAPI.DTOs;

namespace InsuranceAPI.Validators
{
    public class CreateQuoteDtoValidator : AbstractValidator<CreateQuoteDto>
    {
        public CreateQuoteDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(100).WithMessage("Email cannot exceed 100 characters");

            RuleFor(x => x.PolicyId)
                .GreaterThan(0).WithMessage("Policy ID must be greater than 0");

            RuleFor(x => x.PersonalData)
                .NotNull().WithMessage("Personal data is required")
                .Must(pd => pd != null && pd.Count > 0)
                .WithMessage("Personal data cannot be empty");
        }
    }
}
