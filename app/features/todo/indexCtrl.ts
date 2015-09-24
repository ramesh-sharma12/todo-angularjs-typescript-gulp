/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../_reference.ts" />

import {TodoService} from 'services/todoService';
import {Todo} from 'models/todo';

var self : any;

export class TodoIndexCtrl {    

    todos: Array<Todo>;
    todo: Todo;
    todoService: TodoService;
    location: ng.ILocationService;
    scope: any;

    static $inject = ['$scope','$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService) {
        this.scope = $scope;        
        self = this;

        self.todos = [];
        this.todoService = service;
        this.location = $location;

       this.getTodoList();
    }

    getTodoList(): void { 
        self.todos = [];
               
        this.todoService.getTodos().then((response) => {
            self.scope.$apply(() => self.todos = response);
        });
    }

    addTodo(): void {
        var newTodo = new Todo();
                
        newTodo.Title = self.scope.todo.Title;
        newTodo.Description = self.scope.todo.Description;
        newTodo.CreatedDate = new Date().toDateString();
        newTodo.ModifiedDate = new Date().toDateString();
        newTodo.DueDate = new Date().toDateString();
        newTodo.Status = true;

        this.todoService.addTodo(newTodo).then((response) => {
            if (response) {
                this.location.path('/todos');
            }
        });       
    }

    getDetails(event, id) : void {
        this.location.path('/todo/details/' + id);
    }

    removeTodo(event, id) : void {
        this.todoService.removeTodo(id);
        this.getTodoList();
    }  
}

