import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { 
  }

  getTasks() {
    return this.http.get(`${this.uri}/tasks`);
  }

  getTaskById(id) {
    return this.http.get(`${this.uri}/tasks/${id}`);
  }

  addTask(title, responsible, description, receiver) {
    const task = {
      title: title,
      responsible: responsible,
      description: description,
      receiver: receiver
    }
    return this.http.post(`${this.uri}/tasks/add`, task);
  }

  updateTask(id, title, responsible, description, receiver, status) {
    const task = {
      title: title,
      responsible: responsible,
      description: description,
      receiver: receiver,
      status: status
    }
    return this.http.post(`${this.uri}/tasks/update/${id}`, task);
  }

  deleteTask(id) {
    return this.http.get(`${this.uri}/tasks/delete/${id}`)
  }
}
