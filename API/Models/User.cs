using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models {
    public class User {
        public int UserId { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public DateTime? Birthdate { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }

    }
}