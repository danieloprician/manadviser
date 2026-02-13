using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Data;
using InsuranceAPI.Models;
using InsuranceAPI.DTOs;
using InsuranceAPI.Services;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly InsuranceDbContext _context;
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(InsuranceDbContext context, IAuthService authService, IConfiguration configuration)
        {
            _context = context;
            _authService = authService;
            _configuration = configuration;
        }

        /// <summary>
        /// User login endpoint
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Email and password are required");

            // Get all users from database (in real app, query specific user)
            var users = await _context.Users.ToListAsync();
            var user = _authService.AuthenticateUser(request.Email, request.Password, users);

            if (user == null)
                return Unauthorized("Invalid email or password");

            // Get JWT settings from configuration
            var jwtSecret = _configuration["Jwt:Secret"];
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];
            var jwtExpirationMinutes = int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "1440");

            if (string.IsNullOrEmpty(jwtSecret) || jwtSecret.Length < 32)
                return StatusCode(500, "JWT secret not properly configured");

            // Generate token
            var token = _authService.GenerateJwtToken(user, jwtSecret, jwtIssuer, jwtAudience, jwtExpirationMinutes);

            // Save updated LastLogin
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                Role = user.Role ?? "User"
            };

            return Ok(new LoginResponseDto
            {
                Token = token,
                User = userDto
            });
        }

        /// <summary>
        /// Register new admin user (admin only in production)
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] LoginDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Email and password are required");

            if (request.Password.Length < 6)
                return BadRequest("Password must be at least 6 characters");

            // Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
            if (existingUser != null)
                return Conflict("Email already registered");

            // Hash password
            var hashedPassword = _authService.HashPassword(request.Password);

            // Create new user
            var newUser = new User
            {
                Email = request.Email.ToLower(),
                PasswordHash = hashedPassword,
                FirstName = "",
                LastName = "",
                Role = "Editor", // Default role
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new UserDto
            {
                Id = newUser.Id,
                Email = newUser.Email,
                FirstName = newUser.FirstName ?? "",
                LastName = newUser.LastName ?? "",
                Role = newUser.Role ?? "User"
            });
        }
    }
}
