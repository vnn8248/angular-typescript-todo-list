import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string;
  todosLimit:string;

  constructor(private http:HttpClient) { 
    this.todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.todosLimit = '?_limit=5';
  }

  // Get to dos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  };

  // Toggle completed
  toggleCompleted(todo:Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete to dos
  deleteTodo(todo:Todo):Observable<Todo> {
    // Remove from UI
    const url = `${this.todosUrl}/${todo.id}`;

    // Remove from server
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add To dos
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
};
