using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;
using UserManagementAPI.ApiModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AdminLogin _login;


        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _login = new AdminLogin(_configuration);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginRequest loginRequest)
        {
            try
            {
                if (loginRequest == null || !ModelState.IsValid)
                    return BadRequest();

                var response = this._login.ValidateCredentials(loginRequest);
                switch (response.statusCodes)
                {
                    case StatusCodes.Status200OK:
                        return Ok(response.Response);

                    default:
                        return BadRequest(response.Response);

                }

            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

