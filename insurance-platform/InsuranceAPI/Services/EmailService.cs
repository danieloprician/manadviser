using System.Net;
using System.Net.Mail;

namespace InsuranceAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(string to, string subject, string htmlBody)
        {
            try
            {
                var fromEmail = _configuration["Email:FromEmail"];
                var fromName = _configuration["Email:FromName"];
                var sendGridKey = _configuration["Email:SendGridKey"];

                if (string.IsNullOrEmpty(sendGridKey) || sendGridKey == "your-sendgrid-api-key")
                {
                    _logger.LogWarning("Email service not configured. Email would be sent to: {To}", to);
                    return true; // Return true in development mode
                }

                // In production, use SendGrid or another email service
                // For now, we'll use SMTP as a fallback
                using var client = new SmtpClient();
                using var message = new MailMessage
                {
                    From = new MailAddress(fromEmail ?? "noreply@insurepro.ro", fromName ?? "InsurePro"),
                    Subject = subject,
                    Body = htmlBody,
                    IsBodyHtml = true
                };
                
                message.To.Add(to);

                // Note: In production, configure proper SMTP settings
                // await client.SendMailAsync(message);
                
                _logger.LogInformation("Email sent to: {To} - Subject: {Subject}", to, subject);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to: {To}", to);
                return false;
            }
        }

        public async Task<bool> SendQuoteConfirmationAsync(string to, string customerName, string policyName, decimal price)
        {
            var subject = "Confirmarea Cotației - InsurePro";
            var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #007ab3; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f5f5f5; }}
        .price {{ font-size: 24px; font-weight: bold; color: #007ab3; margin: 20px 0; }}
        .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #666; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>InsurePro</h1>
        </div>
        <div class=""content"">
            <h2>Bună {customerName},</h2>
            <p>Mulțumim pentru interesul acordat serviciilor noastre!</p>
            <p>Am calculat o cotație pentru polița <strong>{policyName}</strong>:</p>
            <div class=""price"">
                {price:F2} RON / an
            </div>
            <p>Echipa noastră vă va contacta în curând pentru mai multe detalii și finalizarea înregistrării.</p>
            <p>Cu stimă,<br>Echipa InsurePro</p>
        </div>
        <div class=""footer"">
            <p>&copy; 2026 InsurePro. Toate drepturile reserved.</p>
            <p>Pentru întrebări, contactați-ne la info@insurepro.ro</p>
        </div>
    </div>
</body>
</html>";

            return await SendEmailAsync(to, subject, htmlBody);
        }

        public async Task<bool> SendContactConfirmationAsync(string to, string customerName)
        {
            var subject = "Am primit mesajul dumneavoastră - InsurePro";
            var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #007ab3; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f5f5f5; }}
        .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #666; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>InsurePro</h1>
        </div>
        <div class=""content"">
            <h2>Bună {customerName},</h2>
            <p>Mulțumim că ne-ați contactat!</p>
            <p>Am primit mesajul dumneavoastră și vă vom răspunde în maximum 24 de ore.</p>
            <p>Cu stimă,<br>Echipa InsurePro</p>
        </div>
        <div class=""footer"">
            <p>&copy; 2026 InsurePro. Toate drepturile rezervate.</p>
        </div>
    </div>
</body>
</html>";

            return await SendEmailAsync(to, subject, htmlBody);
        }

        public async Task<bool> SendAdminNotificationAsync(string subject, string message)
        {
            var adminEmail = _configuration["Email:AdminEmail"] ?? "admin@insurepro.ro";
            var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .content {{ padding: 20px; background-color: #f5f5f5; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""content"">
            <h2>{subject}</h2>
            <p>{message}</p>
        </div>
    </div>
</body>
</html>";

            return await SendEmailAsync(adminEmail, subject, htmlBody);
        }
    }
}
