import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy{

  form!:FormGroup;
  studentformSubscription!:Subscription;
  paramsSubscription!:Subscription;
  isEdit=false;
  id=0;
  constructor(private fb:FormBuilder , private studentService:StudentsService, private activatedRouter:ActivatedRoute, private router:Router,
    private toaster: ToastrService){}
  ngOnDestroy(): void {
    if(this.studentformSubscription){
      this.studentformSubscription.unsubscribe();
    }

    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {
    
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {
        next:(response)=>{
          console.log(response['id']);
          let id = response['id'];
          this.id =id;
          if(!id) return;
          
          this.studentService.getStudent(id).subscribe({
            next:response=> {
              this.form.patchValue(response);
              this.isEdit = true; 
            }, error:err=> {
              console.log(err)
            }
          })
        },
        error:(err)=>{
          console.log(err);
        }
      }
    )

    this.form = this.fb.group({
      name:['',Validators.required],
      address:[],
      phoneNumber:[],
      email:['',Validators.email]
    })
  }

  onSubmit(){
    if(!this.isEdit){
      this.studentformSubscription= this.studentService.addStudent(this.form.value).subscribe({
         next:(response)=>{
           this.toaster.error('Unable to add');
        },
        error:err=>{
          this.toaster.success("Student sucesfully added")
          this.router.navigateByUrl('/students');
          
         }
       })
     }else{
       this.studentService.editStudent(this.id,this.form.value).subscribe(
         {next:value=>{
           this.toaster.success("Edited sucessfully");
           this.router.navigateByUrl('/students')
         },error:err=>{
           this.toaster.error('Unable to edit');
         }}
       )
     }
  }


}
