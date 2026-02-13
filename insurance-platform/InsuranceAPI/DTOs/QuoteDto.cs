namespace InsuranceAPI.DTOs
{
    public class CreateQuoteDto
    {
        public string Email { get; set; }
        public int PolicyId { get; set; }
        public Dictionary<string, object> PersonalData { get; set; }
    }

    public class QuoteResultDto
    {
        public decimal BasePrice { get; set; }
        public decimal CalculatedPrice { get; set; }
        public decimal Discount { get; set; }
    }

    public class CalculatePriceDto
    {
        public int PolicyId { get; set; }
        public Dictionary<string, object> PersonalData { get; set; }
    }
}
