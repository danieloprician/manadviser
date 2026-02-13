namespace InsuranceAPI.DTOs
{
    public class CreatePolicyDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description_Ro { get; set; }
        public string Description_En { get; set; }
        public decimal BasePrice { get; set; }
        public string Coverage { get; set; }
        public int CategoryId { get; set; }
        public string Details_Ro { get; set; }
        public string Details_En { get; set; }
    }

    public class UpdatePolicyDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description_Ro { get; set; }
        public string Description_En { get; set; }
        public decimal BasePrice { get; set; }
        public string Coverage { get; set; }
        public string Details_Ro { get; set; }
        public string Details_En { get; set; }
        public bool IsActive { get; set; }
    }
}
