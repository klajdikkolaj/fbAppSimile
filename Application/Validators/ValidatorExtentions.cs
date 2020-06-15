using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtentions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6)
                .WithMessage("Minimum Length must be 6")
                .Matches("[A-Z]")
                .WithMessage("Should have at least 1 UpperCase letter")
                .Matches("[a-z]")
                .WithMessage("Should have at least 1 lowercase letter")
                .Matches("[0-9]")
                .WithMessage("should have at least a number")
                .Matches("[^a-zA-Z0-9]")
                .WithMessage("should have at least a non alpha numerical value");
            return options;
        }
        
    }
}