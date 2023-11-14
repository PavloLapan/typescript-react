import React from "react";
import {ENTER_KEY} from "../../Constants/constants";
import {ITodoModel} from "../../Types/interfaces";

interface HeaderProps {
    model: ITodoModel;
}

const Header: React.FC<HeaderProps> = ({ model }) => {

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

    return (
        <header className="header">
            <h1>todos</h1>
            <input className='new-todo'
                   placeholder="What needs to be done?"
                   ref={(input) => input && input.focus()}
                   autoFocus={true}
                   onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                       handleNewTodoKeyDown(e as React.KeyboardEvent<HTMLInputElement>)
                   }/>

        </header>
    )
}

export default Header