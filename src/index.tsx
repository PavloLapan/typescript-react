import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './App';
import {TodoModel} from "./Utils/todoModel";
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const model = new TodoModel('react-todos');

function render() {
    root.render(
        <React.StrictMode>
            <TodoApp model={model}/>
        </React.StrictMode>
    );
}

model.subscribe(render);
render();
