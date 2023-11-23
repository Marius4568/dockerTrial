using FluentValidation;
using Travelist.Data.DTO.TravelEntities;

namespace Travelist.Data.Validators.TravelEntities
{
    public class UpdateTravelEntityDtoValidator : AbstractValidator<UpdateTravelEntityDto>
    {
        public UpdateTravelEntityDtoValidator()
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
