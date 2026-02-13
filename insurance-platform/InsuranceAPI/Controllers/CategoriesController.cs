using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Data;
using InsuranceAPI.Models;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly InsuranceDbContext _context;

        public CategoriesController(InsuranceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PolicyCategory>>> GetCategories()
        {
            var categories = await _context.PolicyCategories
                .OrderBy(c => c.Order)
                .ToListAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PolicyCategory>> GetCategory(int id)
        {
            var category = await _context.PolicyCategories
                .Include(c => c.Policies)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound(new { message = "Category not found" });

            return Ok(category);
        }
    }
}
