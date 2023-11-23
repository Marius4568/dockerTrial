using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Travelist.Data.DTO.TravelEntities;
using Travelist.Data.DTO.Users;
using Travelist.Models;
using Travelist.Services.TravelEntities;
using Travelist.Services.Users;

namespace Travelist.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelEntityController : ControllerBase
    {
        private readonly ITravelEntityService travelEntityService;
        private readonly IUserService userService;
        private readonly IValidator<CreateTravelEntityDto> createTravelEntityDtoValidator;
        private readonly IValidator<UpdateTravelEntityDto> updateTravelEntityDtoValidator;

        public TravelEntityController(
            ITravelEntityService travelEntityService, 
            IUserService userService,
            IValidator<CreateTravelEntityDto> createTravelEntityDtoValidator,
            IValidator<UpdateTravelEntityDto> updateTravelEntityDtoValidator)
        {
            this.travelEntityService = travelEntityService;
            this.userService = userService;
            this.createTravelEntityDtoValidator = createTravelEntityDtoValidator;
            this.updateTravelEntityDtoValidator = updateTravelEntityDtoValidator;
        }

        [HttpGet("locations")]
        [AllowAnonymous]
        public async Task<ActionResult> GetLocations()
        {
            var locations = await this.travelEntityService.GetAllLocationsAsync();
            return Ok(locations);
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult> Filter(string? query, int count, int offset)
        {
            int userId = await GetUserIdIfAny();
            var travelEntityPreviews =
                await this.travelEntityService
                          .FilterTravelEntityPreviewsAsync(query, count, offset, userId);

            return Ok(travelEntityPreviews);
        }

        [HttpGet("{travelEntityId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetTravelEntity(int travelEntityId)
        {
            int userId = await GetUserIdIfAny();
            var travelEntity = 
                await this.travelEntityService.GetTravelEntityDtoAsync(travelEntityId, userId);

            if (travelEntity is null)
            {
                return NotFound();
            }

            return Ok(travelEntity);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<ActionResult> CreateTravelEntity(CreateTravelEntityDto createTravelEntityDto)
        {
            var validationResult = 
                await this.createTravelEntityDtoValidator.ValidateAsync(createTravelEntityDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var travelEntityDto = 
                await this.travelEntityService.CreateTravelEntityAsync(
                    createTravelEntityDto,
                    await GetCurrentUser());

            return CreatedAtAction(nameof(GetTravelEntity), new { travelEntityId = travelEntityDto.Id }, travelEntityDto);
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<ActionResult> UpdateTravelEntity(UpdateTravelEntityDto updateTravelEntityDto)
        {
            var validationResult = 
                await this.updateTravelEntityDtoValidator.ValidateAsync(updateTravelEntityDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var travelEntity = 
                await this.travelEntityService.GetTravelEntityAsync(updateTravelEntityDto.Id);
            if (travelEntity is null)
            {
                return NotFound();
            }

            if (travelEntity.UserId != (await GetCurrentUser()).Id)
            {
                return Forbid();
            }

            var updatedTravelEntity = 
                await this.travelEntityService.UpdateTravelEntityAsync(updateTravelEntityDto);

            return Ok(updatedTravelEntity);
        }

        [HttpDelete("delete/{travelEntityId}")]
        [Authorize]
        public async Task<ActionResult> DeleteTravelEntity(int travelEntityId)
        {
            var travelEntity = await this.travelEntityService.GetTravelEntityAsync(travelEntityId);
            if (travelEntity is null)
            {
                return NoContent();
            }

            if (travelEntity.UserId != (await GetCurrentUser()).Id)
            {
                return Forbid();
            }

            await this.travelEntityService.DeleteTravelEntityAsync(travelEntity);
            return NoContent();
        }

        [HttpPost("switch-like/{travelEntityId}")]
        [Authorize]
        public async Task<ActionResult> SwitchTravelEntityLike(int travelEntityId)
        {
            var userId = (await GetCurrentUser()).Id;
            var travelEntity = 
                await this.travelEntityService.GetTravelEntityAsync(travelEntityId);

            if (travelEntity is null)
            {
                return NotFound();
            }

            bool isLiked 
                = await this.travelEntityService.SwitchTravelEntityLikeAsync(
                    travelEntityId, 
                    userId);

            return Ok(isLiked);
        }

        private async Task<User> GetCurrentUser()
        {
            var email = this.User.Identity?.Name;
            if (email is null)
            {
                throw new InvalidOperationException("User is not authenticated");
            }

            var user = await this.userService.GetUserAsync(email);
            if (user is null)
            {
                throw new InvalidOperationException("User is not authenticated");
            }

            return user;
        }

        private async Task<int> GetUserIdIfAny()
        {
            int userId = 0;
            if (this.User.Identity?.IsAuthenticated ?? false)
            {
                userId = (await GetCurrentUser()).Id;
            }

            return userId;
        }
    }
}
