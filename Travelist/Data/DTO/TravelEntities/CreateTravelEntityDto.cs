﻿using System.ComponentModel.DataAnnotations;
using Travelist.Models;

namespace Travelist.Data.DTO.TravelEntities
{
    public class CreateTravelEntityDto
    {
        public string? Title { get; set; }
        public string? City { get; set; }
        public string? Text { get; set; }
        public string? ImageUrl { get; set; }
        public Location? Location { get; set; }
    }
}
