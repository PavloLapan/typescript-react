import React, {useState} from "react";
import {TodoItem} from "../Components/TodoItem/TodoItem";
import {IAppState, ITodo, ITodoModel} from "../Types/interfaces";
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS} from "../Constants/constants";

interface MainProps{
    model: ITodoModel
    activeTodoCount: number
}
const Main: React.FC<MainProps> = ({model,  activeTodoCount}) => {
    const [state, setState] = useState<IAppState>({
        nowShowing: ALL_TODOS,
        editing: null,
    });
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

    const shownTodos = model?.todos.filter((todo: any) => {
        switch (state.nowShowing) {
            case ACTIVE_TODOS:
                return !todo.completed;
            case COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
        }
    });

    return (
        <section className="main">
            <input
                type='checkbox'
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
    )
}

export default Main