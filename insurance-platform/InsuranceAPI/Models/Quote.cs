using System.Text.Json;

namespace InsuranceAPI.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int PolicyId { get; set; }
        public string PersonalDataJson { get; set; } // Store JSON as string
        public decimal CalculatedPrice { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Policy Policy { get; set; }
    }
}
