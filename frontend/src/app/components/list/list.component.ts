import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { Task } from '../../task.module';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasks: Task[];
  displayedColumns = ['title', 'responsible', 'description', 'receiver', 'status', 'actions']
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService
      .getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
        console.log(this.tasks);
      })
  }

  editTask(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.fetchTasks();
    })
  }
}
