﻿/// <reference path="../../../typings/tsd.d.ts" />

import {TodoService} from 'services/todoService';
import {Todo} from 'models/todo';

var self

export class TodoDetailsCtrl {
    todo: Todo;
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

        this.todo = new Todo();
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

    public editTodo() : void {
        this.location.path('/todo/edit/' + this.stateParams.id);
    }
}

