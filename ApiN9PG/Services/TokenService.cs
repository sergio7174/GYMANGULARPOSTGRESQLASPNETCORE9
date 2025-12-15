using ApiN9PG.Models;
using ApiN9PG.Models.users;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
/**is used to work with claims-based identity for authentication and authorization. It provides access to core types like Claim, ClaimsIdentity, and ClaimsPrincipal, which are essential for:
Creating user identities (e.g., after login)
Storing user data (e.g., roles, permissions, custom claims)
Accessing claims in controllers/services via User.Claims**/
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System;
using ApiN9PG.Data;

namespace ApiN9PG.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
                    
        public TokenService(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string GenerateAccessToken(User user)
        {
            // Validate user data before creating claims
    if (user == null)
        throw new ArgumentException("User cannot be null");

    var claims = new List<Claim>
    {
        // Use null-coalescing operator to avoid null values
        new Claim(ClaimTypes.Name, user.FullName ?? "anonymous"),
        new Claim(ClaimTypes.Email, user.Email ?? "no-email@example.com"),
        new Claim("UserId", user.Id.ToString() ?? "0")
    };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:securitykey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:AccessTokenExpiryMinutes"]));

            var token = new JwtSecurityToken(
                
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken(int userId)
        {
            var tokenId = Guid.NewGuid().ToString();
            var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

            // Set the expiry for the refresh token
            var expiryDays = Convert.ToInt32(_configuration["JwtSettings:RefreshTokenExpiryDays"]);
            var expiryDate = DateTime.UtcNow.AddDays(expiryDays);

            var token = new RefreshToken
            {
                UserId = userId,
                TokenId = tokenId,
                RefreshUserToken = refreshToken
            };

            _context.RefreshTokens.Add(token);
            _context.SaveChanges();

            return refreshToken;
        }

        public RefreshToken GetRefreshToken(string refreshToken)
        {
            return _context.RefreshTokens
                .FirstOrDefault(rt => rt.RefreshUserToken == refreshToken);
        }

        public void RevokeRefreshToken(string refreshToken)
        {
            var token = _context.RefreshTokens.FirstOrDefault(rt => rt.RefreshUserToken == refreshToken);
            if (token != null)
            {
                _context.RefreshTokens.Remove(token);
                _context.SaveChanges();
            }
        }
    }

}

