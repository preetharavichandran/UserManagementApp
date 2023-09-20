using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementAPI.ApiModels;
using UserManagementAPI.Data;
using UserManagementAPI.Models;

namespace UserMangementAPI.Controllers
{
    
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly UserInfoContext _context;

        public UserInfoController(UserInfoContext context)
        {
            _context = context;
        }

        // GET: To Get All Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserInfoMaster>>> GetUserInfoMasters()
        {
          if (_context.UserInfoMasters == null)
          {
              return NotFound();
          }
            return await _context.UserInfoMasters.ToListAsync();
        }

        // GET: TO Get Specific User
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfoMaster>> GetUserInfoMaster(long id)
        {
          if (_context.UserInfoMasters == null)
          {
              return NotFound();
          }
            var userInfoMaster = await _context.UserInfoMasters.FindAsync(id);

            if (userInfoMaster == null)
            {
                return NotFound();
            }

            return userInfoMaster;
        }


        // POST: To Add a new User
        [HttpPost]
        public async Task<ActionResult<UserInfoMaster>> PostUserInfoMaster(UserInfo AddNewUserRequest)
        {
            if (_context.UserInfoMasters == null)
            {
                return Problem("Entity set 'UserInfoContext.UserInfoMasters'  is null.");
            }
            var userInfoMaster = new UserInfoMaster()
            {
                FirstName = AddNewUserRequest.FirstName,
                LastName = AddNewUserRequest.LastName,
                DateOfBirth = AddNewUserRequest.DateOfBirth
            };

            _context.UserInfoMasters.Add(userInfoMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserInfoMaster", new { id = userInfoMaster.UserId }, userInfoMaster);
        }


        // PUT: To Update an existing user
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserInfoMaster(long id, UserInfoMaster userInfoMaster)
        {
            if (id != userInfoMaster.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userInfoMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInfoMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        // DELETE: to delete an user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserInfoMaster(long id)
        {
            if (_context.UserInfoMasters == null)
            {
                return NotFound();
            }
            var userInfoMaster = await _context.UserInfoMasters.FindAsync(id);
            if (userInfoMaster == null)
            {
                return NotFound();
            }

            _context.UserInfoMasters.Remove(userInfoMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserInfoMasterExists(long id)
        {
            return (_context.UserInfoMasters?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
