using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Data;
using InsuranceAPI.Models;
using InsuranceAPI.DTOs;
using InsuranceAPI.Services;
using System.Text.Json;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly InsuranceDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<QuotesController> _logger;

        public QuotesController(InsuranceDbContext context, IEmailService emailService, ILogger<QuotesController> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            var quotes = await _context.Quotes
                .Include(q => q.Policy)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return Ok(quotes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var quote = await _context.Quotes
                .Include(q => q.Policy)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quote == null)
                return NotFound(new { message = "Quote not found" });

            return Ok(quote);
        }

        [HttpPost("calculate")]
        public async Task<ActionResult<QuoteResultDto>> CalculatePrice([FromBody] CalculatePriceDto dto)
        {
            var policy = await _context.Policies.FindAsync(dto.PolicyId);

            if (policy == null)
                return NotFound(new { message = "Policy not found" });

            // Simple calculation logic: base price + 10% (can be enhanced)
            decimal calculatedPrice = policy.BasePrice * 1.1m;
            decimal discount = policy.BasePrice * 0.1m;

            var result = new QuoteResultDto
            {
                BasePrice = policy.BasePrice,
                CalculatedPrice = calculatedPrice,
                Discount = discount
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Quote>> CreateQuote([FromBody] CreateQuoteDto dto)
        {
            var policy = await _context.Policies.FindAsync(dto.PolicyId);

            if (policy == null)
                return NotFound(new { message = "Policy not found" });

            // Calculate price
            decimal calculatedPrice = policy.BasePrice * 1.1m;

            var quote = new Quote
            {
                Email = dto.Email,
                PolicyId = dto.PolicyId,
                PersonalDataJson = JsonSerializer.Serialize(dto.PersonalData),
                CalculatedPrice = calculatedPrice,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow
            };

            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            // Send quote confirmation email
            try
            {
                var customerName = "Client";
                if (dto.PersonalData?.ContainsKey("name") == true)
                {
                    customerName = dto.PersonalData["name"]?.ToString() ?? "Client";
                }
                
                await _emailService.SendQuoteConfirmationAsync(
                    quote.Email,
                    customerName,
                    policy.Name,
                    quote.CalculatedPrice
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send quote email for quote {QuoteId}", quote.Id);
            }

            return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateQuoteStatus(int id, [FromBody] Dictionary<string, string> request)
        {
            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
                return NotFound(new { message = "Quote not found" });

            if (request.TryGetValue("status", out var status))
            {
                quote.Status = status;
                _context.Quotes.Update(quote);
                await _context.SaveChangesAsync();
            }

            return Ok(quote);
        }
    }
}
