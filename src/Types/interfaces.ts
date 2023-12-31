import React from "react";
import {TodoModel} from "../Utils/todoModel";

export interface ITodo {
    id: string,
    title: string,
    completed: boolean
}

export interface ITodoItemProps {
    key : string,
    todo : ITodo;
    editing? : boolean;
    onSave: (val: any) => void;
    onDestroy: () => void;
    onEdit: ()  => void;
    onCancel: (event : any) => void;
    onToggle: () => void;
}

export interface ITodoItemState {
    editText : string
}

export interface ITodoFooterProps {
    completedCount : number;
    onClearCompleted : any;
    count : number;
}

export interface ITodoModel {
    key: any;
    todos: ITodo[];
    onChanges: Array<() => void>;
    subscribe(onChange: () => void): void;
    inform(): void;
    addTodo(title: string): void;
    toggleAll(checked: boolean): void;
    toggle(todoToToggle: ITodo): void;
    destroy(todo: ITodo): void;
    save(todoToSave: ITodo, text: string): void;
    clearCompleted(): void;
}


export interface IAppProps {
    model : ITodoModel;
}

export interface IAppState {
    editing? : string | null;
    nowShowing? : string
}

