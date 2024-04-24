import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { StudentsService } from '../services/students.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe , CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  
  students$!:Observable<Student[]>
  //studentService = Inject(StudentsService);
  
  constructor(private studentService:StudentsService , private toaster:ToastrService) {
  
    
  }
  
  ngOnInit(): void {
   this.getStudents();
  }

  delete(id:number){
    console.log(id);

    this.studentService.deleteStudent(id).subscribe({
      next:response=>{
        this.getStudents();
        this.toaster.success("Successfully Deleted");
      },
      error:err=>{
        console.log(err);
        this.toaster.success("Successfully Deleted");
      }
    })
  }

  private getStudents(): void{
    this.students$ = this.studentService.getStudents()

  }

}
