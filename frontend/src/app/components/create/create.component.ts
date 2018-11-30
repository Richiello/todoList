import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms' 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  constructor(private taskService: TaskService, private fb: FormBuilder, private router: Router) { 
    this.createForm = this.fb.group({
      title: ['', Validators],
      responsible: '',
      description: '',
      receiver: ''
    });
  }

  addTask(title, responsible, description, receiver) {
    this.taskService.addTask(title, responsible, description, receiver).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
