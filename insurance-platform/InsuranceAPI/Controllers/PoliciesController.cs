using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Data;
using InsuranceAPI.Models;
using InsuranceAPI.DTOs;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PoliciesController : ControllerBase
    {
        private readonly InsuranceDbContext _context;

        public PoliciesController(InsuranceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPolicies([FromQuery] int? categoryId)
        {
            var query = _context.Policies.Where(p => p.IsActive);

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId);

            var policies = await query
                .Include(p => p.Category)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return Ok(policies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> GetPolicy(int id)
        {
            var policy = await _context.Policies
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

            if (policy == null)
                return NotFound(new { message = "Policy not found" });

            return Ok(policy);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Policy>> CreatePolicy([FromBody] CreatePolicyDto dto)
        {
            var policy = new Policy
            {
                Name = dto.Name,
                Type = dto.Type,
                Description_Ro = dto.Description_Ro,
                Description_En = dto.Description_En,
                BasePrice = dto.BasePrice,
                Coverage = dto.Coverage,
                CategoryId = dto.CategoryId,
                Details_Ro = dto.Details_Ro,
                Details_En = dto.Details_En,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Policies.Add(policy);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPolicy), new { id = policy.Id }, policy);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePolicy(int id, [FromBody] UpdatePolicyDto dto)
        {
            var policy = await _context.Policies.FindAsync(id);

            if (policy == null)
                return NotFound(new { message = "Policy not found" });

            policy.Name = dto.Name;
            policy.Type = dto.Type;
            policy.Description_Ro = dto.Description_Ro;
            policy.Description_En = dto.Description_En;
            policy.BasePrice = dto.BasePrice;
            policy.Coverage = dto.Coverage;
            policy.Details_Ro = dto.Details_Ro;
            policy.Details_En = dto.Details_En;
            policy.IsActive = dto.IsActive;
            policy.UpdatedAt = DateTime.UtcNow;

            _context.Policies.Update(policy);
            await _context.SaveChangesAsync();

            return Ok(policy);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePolicy(int id)
        {
            var policy = await _context.Policies.FindAsync(id);

            if (policy == null)
                return NotFound(new { message = "Policy not found" });

            policy.IsActive = false;
            policy.UpdatedAt = DateTime.UtcNow;
            _context.Policies.Update(policy);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
