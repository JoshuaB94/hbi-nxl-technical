using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Threading.Tasks;

namespace API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET Endpoint for All Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET Endpoint by ID
        [HttpGet("{id}")]
        public async aysnc Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            // Check for User ID
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT Endpoint by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            // Check for User ID Match
            if (id != user.UserId)
            {
                return BadRequest("User ID does not match");
            }

            // Validation for Required First & Last Name Fields
            if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                return BadRequest("First Name & Last Name are REQUIRED");
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST Endpoint
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                return BadRequest("First Name & Last Name are REQUIRED");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser)), new { id = user.UserId }, user;
        }

        // DELETE Endpoint by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}