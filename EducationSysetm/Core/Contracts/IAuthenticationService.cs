using Core.Models.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts
{
    public interface IAuthenticationService
    {
        Task<RegistrationResponse> RegisterAsync(RegistrationRequest model);
        Task<RegistrationResponse> GetTokenAsync(AuthenticationRequest model);
        Task<string> AddRoleAsync(AddRole model);
        Task<string> RemoveRoleAsync(AddRole model);
    }
}
