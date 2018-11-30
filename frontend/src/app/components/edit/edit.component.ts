import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms' 
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  id: String;
  task: any = {};
  updateForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ){
      this.updateForm = this.fb.group({
        title: ['', Validators.required],
        responsible: '',
        description: '',
        receiver: '',
        status: ''
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.taskService.getTaskById(this.id).subscribe(res => {
        this.task = res;
        this.updateForm.get('title').setValue(this.task.title);
        this.updateForm.get('responsible').setValue(this.task.responsible);
        this.updateForm.get('description').setValue(this.task.description);
        this.updateForm.get('receiver').setValue(this.task.receiver);
        this.updateForm.get('status').setValue(this.task.status);
      });
    });
  }

  updateTask(title, responsible, description, receiver, status) {
    this.taskService.updateTask(this.id, title, responsible, description, receiver, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }
}