namespace InsuranceAPI.Models
{
    public class PolicyCategory
    {
        public int Id { get; set; }
        public string Name_Ro { get; set; }
        public string Name_En { get; set; }
        public string Description_Ro { get; set; }
        public string Description_En { get; set; }
        public string Icon { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property
        public ICollection<Policy> Policies { get; set; } = new List<Policy>();
    }
}
