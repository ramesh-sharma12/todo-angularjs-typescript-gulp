/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../_reference.ts" />

import {Firebase} from 'firebase/firebase';
import {Todo} from 'models/todo';

var self;

export class TodoService {
    dataRef: Firebase

    constructor() {
        this.dataRef = new Firebase('https://ng2do.firebaseio.com/data');
        self = this;
    }

    public getTodos(): Promise<Array<Todo>> {
        var list = new Array<Todo>();

        return new Promise<Array<Todo>>(function (resolve, reject) {
            var dataRef = self.dataRef.child("todo");

            dataRef.on("value", function (snapshot) {
                snapshot.forEach(function (rec) {
                    if (rec.key()) {

                        var todo = new Todo();

                        todo.Id = rec.key();
                        todo.Title = rec.val().Title;
                        todo.Description = rec.val().Description;
                        todo.CreatedDate = rec.val().CreatedDate;
                        todo.DueDate = rec.val().DueDate;
                        todo.Status = rec.val().Status;

                        list.push(todo);
                    }
                });

                resolve(list);
            }, function (errorObject) {
                    reject(list);
                    console.log("The read failed: " + errorObject.code);
                });
        });
    }

    public addTodo(todo: Todo): Promise<boolean> {
        return new Promise<boolean>(function (resolve, reject) {

            var todoRef = self.dataRef.child("todo");

            if (todoRef) {
                todoRef.push(todo);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    public updateTodo(todo: Todo) {

        return new Promise<boolean>(function (resolve, reject) {

            var todoRef = self.dataRef.child("todo").child(todo.Id);

            if (todoRef) {
                todoRef.update(todo);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    public removeTodo(id) {
        var dataRef = this.dataRef.child("todo").child(id);
        if (dataRef) {
            dataRef.remove();
        }        
    }

    public getTodoDetail(id): Promise<Todo> {
        return new Promise<Todo>(function (resolve, reject) {

            var todoRef = self.dataRef.child("todo").child(id);

            todoRef.on("value", function (snapshot) {
                var rec = snapshot.val();

                var todo = new Todo();

                todo.Id = snapshot.key();
                todo.Title = rec.Title;
                todo.Description = rec.Description;
                todo.CreatedDate = rec.CreatedDate;
                todo.DueDate = rec.DueDate;
                todo.Status = rec.Status;

                resolve(todo);
            }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                    reject(errorObject);
                });
        });
    }
}  


