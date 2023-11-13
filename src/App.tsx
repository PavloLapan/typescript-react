import React, {KeyboardEventHandler, useState} from 'react';
import {TodoModel} from './Utils/todoModel';
import {TodoFooter} from './Components/Footer/footer';
import {TodoItem} from './Components/todoItem/todoItem';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY} from './Constants/constants';
import {ITodo} from "./Types/interfaces";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {Box, Checkbox} from '@mui/material';

interface IAppProps {
    model: TodoModel;
}

interface IAppState {
    nowShowing: string;
    editing: string | null;
}

const TodoApp: React.FC<IAppProps> = ({model}) => {
    const [state, setState] = useState<IAppState>({
        nowShowing: ALL_TODOS,
        editing: null,
    });
    const todos = model?.todos;

    const handleNewTodoKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== ENTER_KEY) {
            return;
        }
        event.preventDefault();

        const inputElement = event.target as HTMLInputElement;
        const val = inputElement.value.trim();
        if (val) {
            model.addTodo(val);
            event.currentTarget.value = '';
        }
    };

    const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        model.toggleAll(checked);
    };

    const toggle = (todoToToggle: ITodo) => {
        model.toggle(todoToToggle);
    };

    const destroy = (todo: ITodo) => {
        model.destroy(todo);
    };

    const edit = (todo: ITodo) => {
        setState({...state, editing: todo.id});
    };

    const save = (todoToSave: ITodo, text: string) => {
        model.save(todoToSave, text);
        setState({...state, editing: null});
    };

    const cancel = () => {
        setState({...state, editing: null});
    };

    const clearCompleted = () => {
        model.clearCompleted();
    };

    const shownTodos = todos?.filter((todo: any) => {
        switch (state.nowShowing) {
            case ACTIVE_TODOS:
                return !todo.completed;
            case COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
        }
    });

    const activeTodoCount = todos?.reduce(
        (accum: number, todo: ITodo) => (todo.completed ? accum : accum + 1),
        0
    );
    const completedCount = todos?.length - activeTodoCount;

    return (
        <Router>
            <Box sx={{
                textAlign: 'center',
                margin: '5%'
            }}>

                <header className="header">
                    <h1>Todo list</h1>
                    <TextField id="filled-basic" variant="filled"
                               placeholder="What needs to be done?"
                               ref={(input) => input && input.focus()}
                               autoFocus={true}
                               onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                                   handleNewTodoKeyDown(e as React.KeyboardEvent<HTMLInputElement>)
                               }/>

                </header>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <section className="main">
                                <Checkbox
                                    id="toggle-all"
                                    className="toggle-all"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)  => toggleAll(e)}
                                    checked={activeTodoCount === 0}
                                />
                                <label htmlFor="toggle-all">Mark all as complete</label>
                                <ul className="todo-list">
                                    {shownTodos?.map((todo: any) => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onToggle={() => toggle(todo)}
                                            onDestroy={() => destroy(todo)}
                                            onEdit={() => edit(todo)}
                                            editing={state.editing === todo.id}
                                            onSave={(text: any) => save(todo, text)}
                                            onCancel={() => cancel()}
                                        />
                                    ))}
                                </ul>
                            </section>
                        }
                    />

                </Routes>
                {(activeTodoCount || completedCount) && (
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        nowShowing={state.nowShowing}
                        onClearCompleted={() => clearCompleted()}
                    />
                )}
            </Box>
        </Router>
    );
};

export default TodoApp


