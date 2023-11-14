import React, { useState, useRef, useEffect } from 'react';
import { ENTER_KEY, ESCAPE_KEY } from '../../Constants/constants';
import { ITodoItemProps} from "../../Types/interfaces";

const TodoItem: React.FC<ITodoItemProps> = (props) => {
    const [editText, setEditText] = useState<string>(props.todo.title);
    const editFieldRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        const val = editText.trim();
        if (val) {
            props.onSave(val);
            setEditText(val);
        } else {
            props.onDestroy();
        }
    };

    const handleEdit = () => {
        props.onEdit();
        setEditText(props.todo.title);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === ESCAPE_KEY) {
            setEditText(props.todo.title);
            props.onCancel(event);
        } else if (event.key === ENTER_KEY.toString()) {
            handleSubmit(event);
        }
    };

    const handleChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement;
        setEditText(input.value);
    };

    useEffect(() => {
        if (!props.editing && props.editing !== undefined) {
            const node = editFieldRef.current;
            if (node) {
                node.focus();
                node.setSelectionRange(node.value.length, node.value.length);
            }
        }
    }, [props.editing]);

    return (
        <li style={{margin: '1rem'}}>
            <div className="view">
                <input
                    type='checkbox'
                    className="toggle"
                    checked={props.todo.completed}
                    onChange={props.onToggle}
                />
                <label onDoubleClick={(e) => handleEdit()}>
                    {props.todo.title}
                </label>
                <button className="destroy" onClick={props.onDestroy} />
            </div>
            <input
                ref={editFieldRef}
                className="edit"
                value={editText}
                onBlur={(e) => handleSubmit(e)}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
        </li>
    );
};

export { TodoItem };
