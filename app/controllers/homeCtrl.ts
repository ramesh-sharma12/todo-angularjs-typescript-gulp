/// <reference path="../../typings/tsd.d.ts" />

import {TodoService} from '../services/todoService';
import {Todo} from '../models/todo';

let self;

export class HomeCtrl
{
    todo: Todo;
    todoService: TodoService;
    location: ng.ILocationService;
    scope: any;

    static $inject = ['$scope', '$stateParams', '$location', 'todoService'];

    constructor($scope: ng.IScope, $stateParams, $location, service: TodoService)
    {
        this.scope = $scope;
        self = this;

        self.todo = {};
        this.todoService = service;
        this.location = $location;

        this.getTodoList();
    }

    getTodoList(): void
    {
        this.todoService.getTodos().then((response) =>
        {
            self.scope.$apply(() => self.todo = response[1]);
        });
    }

    viewDetails(id: string)
    {
        this.location.path('/todo/details/' + id);
    }
}

