namespace InsuranceAPI.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description_Ro { get; set; }
        public string Description_En { get; set; }
        public decimal BasePrice { get; set; }
        public string Coverage { get; set; }
        public int CategoryId { get; set; }
        public string Details_Ro { get; set; }
        public string Details_En { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public PolicyCategory Category { get; set; }
        public ICollection<Quote> Quotes { get; set; } = new List<Quote>();
    }
}
