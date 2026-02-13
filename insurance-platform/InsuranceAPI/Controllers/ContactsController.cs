using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Data;
using InsuranceAPI.Models;
using InsuranceAPI.DTOs;
using InsuranceAPI.Services;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly InsuranceDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<ContactsController> _logger;

        public ContactsController(InsuranceDbContext context, IEmailService emailService, ILogger<ContactsController> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await _context.Contacts
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound(new { message = "Contact not found" });

            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact([FromBody] CreateContactDto dto)
        {
            var contact = new Contact
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Subject = dto.Subject,
                Message = dto.Message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            // Send confirmation email to customer
            try
            {
                await _emailService.SendContactConfirmationAsync(contact.Email, contact.FullName);
                
                // Notify admin about new contact
                await _emailService.SendAdminNotificationAsync(
                    "New Contact Message",
                    $"New contact from {contact.FullName} ({contact.Email}). Subject: {contact.Subject}"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email for contact {ContactId}", contact.Id);
            }

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        [Authorize]
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound(new { message = "Contact not found" });

            contact.IsRead = true;
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound(new { message = "Contact not found" });

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
