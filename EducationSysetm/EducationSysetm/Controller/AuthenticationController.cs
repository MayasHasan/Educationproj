using Core.Contracts;
using Core.IRepository;
using Core.Models.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSysetm.Controller
{
    [Route("api/v1/[controller]")]
    [ApiController]

    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUnitOfWork _uow;

        public AuthenticationController(IAuthenticationService authenticationService, IUnitOfWork uow)
        {
            _authenticationService = authenticationService;
            _uow = uow;
        }

        [Authorize]
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetCoursesAsync()
        {
            var users = await _uow.ApplicationUsers.GetAllAsync();
            return Ok(users);
        }



        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegistrationRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authenticationService.RegisterAsync(model);
            if (result.Message is not null)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);
        }


        [HttpPost("SignIn")]
        public async Task<IActionResult> GetTokenAsync([FromBody] AuthenticationRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authenticationService.GetTokenAsync(model);
            if (result.Message is not null)
            {
                return Unauthorized(result.Message);
            }
            return Ok(result);
        }


        [HttpPost("addRoletoUser")]
        public async Task<IActionResult> AddRoleAsync([FromBody] AddRole model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authenticationService.AddRoleAsync(model);

            if (!string.IsNullOrEmpty(result))
                return BadRequest(result);

            return Ok(model);
        }

        [HttpPost("removeRoleFromUser")]
        public async Task<IActionResult> RemoveRoleAsync([FromBody] AddRole model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authenticationService.RemoveRoleAsync(model);

            if (!string.IsNullOrEmpty(result))
                return BadRequest(result);

            return Ok(model);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetUserCount()
        {
            var userCount = await _uow.ApplicationUsers.CountAsync();
            return Ok(userCount);
        }
    }

}