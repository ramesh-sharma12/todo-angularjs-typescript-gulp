/// <reference path="../../../typings/tsd.d.ts" />

import {TodoService} from 'services/todoService';

var self;

export class TodoEditCtrl {
    todo: Object;
    stateParams: any;
    todoService: TodoService;
    scope: any;
    location: ng.ILocationService;

    static $inject = ['$scope', '$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService) {

        this.scope = $scope;
        this.stateParams = $stateParams;
        this.todoService = service;
        this.location = $location;

        this.todo = {};
        self = this;

        this.getTodoDetails();
    }

    public getTodoDetails() : void {
        var id = this.stateParams.id;

        this.todoService.getTodoDetail(id).then((response) => {
            self.scope.$apply(() => self.todo = response);
        });
    }

    private formatDateTime(date) : string {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    public saveTodo() : void {
        this.todoService.updateTodo(self.todo).then((response) => {
            this.location.path('todo/details/' + self.todo.Id);
        });
    }

    public resetForm() {
        self.scope.$apply(() => self.todo = {});
    }
}

