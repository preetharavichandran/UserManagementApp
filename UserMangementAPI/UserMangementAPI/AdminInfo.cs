using System;
namespace UserManagementAPI
{
    public class AdminInfo
    {
        public int AdminId { get; set; }

        public string? Username { get; set; } = string.Empty;

        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }
    }
}

