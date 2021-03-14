import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[] = [];


  constructor(private todoService:TodoService) {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    })
  };

  ngOnInit() {
  }

  deleteTodo(todo:Todo) {
    this.todos = this.todos.filter(item => item.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(item => {
      this.todos.push(item);
    });
  }

}
