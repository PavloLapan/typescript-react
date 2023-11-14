import React from 'react';
import {TodoFooter} from './Components/Footer/Footer';
import {ITodo} from "./Types/interfaces";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {IAppProps} from './Types/interfaces'
import Header from "./Components/Header/Header";
import Main from "./Main/Main";


const TodoApp: React.FC<IAppProps> = ({model}) => {
    const activeTodoCount = model?.todos.reduce(
        (accum: number, todo: ITodo) => (todo.completed ? accum : accum + 1),
        0
    );
    const completedCount = model?.todos.length - activeTodoCount;

    const clearCompleted = () => {
        model.clearCompleted();
    };

    return (
        <Router>
            <div className={'todoapp'}>
                <Header model={model}/>
                <Routes>
                    <Route
                        path="/"
                        element={<Main model={model} activeTodoCount={activeTodoCount}/>}
                    />

                </Routes>
                {(activeTodoCount !== 0 || completedCount !== 0) && (
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        onClearCompleted={() => clearCompleted()}
                    />
                )}
            </div>
        </Router>
    );
};

export default TodoApp


