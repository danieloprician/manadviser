namespace InsuranceAPI.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string to, string subject, string htmlBody);
        Task<bool> SendQuoteConfirmationAsync(string to, string customerName, string policyName, decimal price);
        Task<bool> SendContactConfirmationAsync(string to, string customerName);
        Task<bool> SendAdminNotificationAsync(string subject, string message);
    }
}
