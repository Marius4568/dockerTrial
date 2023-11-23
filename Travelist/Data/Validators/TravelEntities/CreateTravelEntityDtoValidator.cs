using FluentValidation;
using Travelist.Data.DTO.TravelEntities;

namespace Travelist.Data.Validators.TravelEntities
{
    public class CreateTravelEntityDtoValidator : AbstractValidator<CreateTravelEntityDto>
    {
        public CreateTravelEntityDtoValidator()
        {
            RuleFor(x => x.Title)
                .MaximumLength(50);

            RuleFor(x => x.City)
                .MaximumLength(50);

            RuleFor(x => x.Text)
                .MaximumLength(250);
        }
    }
}
