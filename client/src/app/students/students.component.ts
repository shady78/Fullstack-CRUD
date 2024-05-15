import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { StudentsService } from '../services/students.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe ,ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  
  students$!:Observable<Student[]>
  //studentService = Inject(StudentsService);
  form!:  FormGroup;
  
  constructor(private fb:FormBuilder, private studentService:StudentsService , private toaster:ToastrService) {
  }
  
  ngOnInit(): void {
    this.initializeForm();
   this.getStudents(); 
  }


  private initializeForm(): void {
    this.form = this.fb.group({
      searchControl: [''] // Initialize the searchControl field
    });
      // Subscribe to form value changes
    this.form.get('searchControl')!.valueChanges.subscribe(name => {
      if (name) {
        this.getAStudentByname(name);
      } else {
        this.getStudents();
      }
    });
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
    
  getAStudentByname(name: string): void {
    this.students$ = this.studentService.getStudentSearch(name);
  }
}
