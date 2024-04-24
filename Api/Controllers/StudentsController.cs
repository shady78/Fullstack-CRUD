using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //api/students
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get All the Students
        /// </summary>
        /// <returns>All</returns>
        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents(){
            var students = await _context.students.AsNoTracking().ToListAsync();
            return students;
        }


        [HttpPost]
        public async Task<IActionResult> Create(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok("Created");
            }

            return BadRequest();

        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.students.FindAsync(id);
            if (student is null)
            {
                return NotFound();
            }
            return Ok (student);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.students.FindAsync(id);
            if (student is null)
            {
                return NotFound();
            }
            _context.Remove(student);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Unable to delete student");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Student>> EditStudent(int id , Student student)
        {
            var studentFromDb = await _context.students.FindAsync(id);
            if (studentFromDb is null)
            {
                return BadRequest("Student Not found");
            }
            
            studentFromDb!.Name = student.Name;
            studentFromDb.Address = student.Address;
            studentFromDb.Email = student.Email;
            studentFromDb.PhoneNumber = student.PhoneNumber;

            _context.Update(studentFromDb);
            var result = await _context.SaveChangesAsync();
            if(result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}