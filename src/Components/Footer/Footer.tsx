import {Utils} from "../../Utils/utils";
import {ITodoFooterProps} from '../../Types/interfaces'
import { Link } from 'react-router-dom';

const TodoFooter = (props: ITodoFooterProps) => {
    const activeTodoWord = Utils.pluralize(props.count, 'item');

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{props.count}</strong> {activeTodoWord} left
            </span>
            <ul className="filters">
                <li>
                    <Link to="/">All</Link>
                </li>
                <li>
                    <Link to="/active">Active</Link>
                </li>
                <li>
                    <Link to="/completed">Completed ({props.completedCount})</Link>
                </li>
            </ul>
            {props.completedCount > 0 && (
                <button className="clear-completed" onClick={props.onClearCompleted}>Clear completed items</button>
            )}
        </footer>
    );
}

export {TodoFooter};
