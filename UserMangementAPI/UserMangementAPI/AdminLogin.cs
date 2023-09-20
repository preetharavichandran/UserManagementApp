using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using NuGet.Protocol.Plugins;
using UserManagementAPI.ApiModels;

namespace UserManagementAPI
{
    public class AdminLogin
    {
        private readonly IConfiguration _configuration;

        public static AdminInfo admin = new AdminInfo();

        public AdminLogin(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public LoginResponse ValidateCredentials(LoginRequest loginRequest)
        {
            try
            {
                admin.Username = _configuration.GetSection("AppSettings:UserName").Value;
                if (admin.Username != loginRequest.UserName)
                {
                    return new LoginResponse() { statusCodes = 400, Response = "User Name or Password is Invalid" };
                }

                CreatePasswordHash(out byte[] passwordHash, out byte[] passwordSalt);

                admin.PasswordHash = passwordHash;
                admin.PasswordSalt = passwordSalt;

                if (!VerifyPasswordHash(loginRequest.Password, admin.PasswordHash, admin.PasswordSalt))
                {
                    return new LoginResponse() { statusCodes = 400, Response = "User Name or Password is Invalid" };
                }

                string token = CreateToken(admin);

                return new LoginResponse() { statusCodes = 200, Response = token };
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string CreateToken(AdminInfo admin)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, admin.Username),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(out byte[] passwordHash, out byte[] salt)
        {
            var validPassword = _configuration.GetSection("AppSettings:Password").Value;

            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(validPassword));
            }
        }
    }
}

