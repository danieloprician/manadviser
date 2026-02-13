using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using InsuranceAPI.Models;
using InsuranceAPI.DTOs;

namespace InsuranceAPI.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(User user, string secret, string issuer, string audience, int expirationMinutes);
        User AuthenticateUser(string email, string password, List<User> users);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }

    public class AuthService : IAuthService
    {
        /// <summary>
        /// Generate JWT token for authenticated user
        /// </summary>
        public string GenerateJwtToken(User user, string secret, string issuer, string audience, int expirationMinutes)
        {
            if (string.IsNullOrEmpty(secret) || secret.Length < 32)
                throw new ArgumentException("JWT secret must be at least 32 characters");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<System.Security.Claims.Claim>
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id.ToString()),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, user.Email),
                new System.Security.Claims.Claim("FirstName", user.FirstName ?? ""),
                new System.Security.Claims.Claim("LastName", user.LastName ?? ""),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, user.Role ?? "User")
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Authenticate user by email and password
        /// </summary>
        public User AuthenticateUser(string email, string password, List<User> users)
        {
            var user = users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.IsActive);
            
            if (user == null)
                return null;

            // Verify password hash
            if (!VerifyPassword(password, user.PasswordHash))
                return null;

            // Update last login
            user.LastLogin = DateTime.UtcNow;
            return user;
        }

        /// <summary>
        /// Hash password using PBKDF2
        /// </summary>
        public string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password));

            using (var deriveBytes = new Rfc2898DeriveBytes(password, 20))
            {
                deriveBytes.IterationCount = 10000;
                byte[] salt = deriveBytes.Salt;
                byte[] hash = deriveBytes.GetBytes(20);

                byte[] saltAndHash = new byte[40];
                System.Buffer.BlockCopy(salt, 0, saltAndHash, 0, 20);
                System.Buffer.BlockCopy(hash, 0, saltAndHash, 20, 20);

                return Convert.ToBase64String(saltAndHash);
            }
        }

        /// <summary>
        /// Verify password against hash
        /// </summary>
        public bool VerifyPassword(string password, string hash)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hash))
                return false;

            try
            {
                byte[] saltAndHash = Convert.FromBase64String(hash);
                byte[] salt = new byte[20];
                System.Buffer.BlockCopy(saltAndHash, 0, salt, 0, 20);

                using (var deriveBytes = new Rfc2898DeriveBytes(password, salt))
                {
                    deriveBytes.IterationCount = 10000;
                    byte[] newHash = deriveBytes.GetBytes(20);
                    
                    for (int i = 0; i < 20; i++)
                    {
                        if (saltAndHash[i + 20] != newHash[i])
                            return false;
                    }
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
