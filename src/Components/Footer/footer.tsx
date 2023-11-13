import {Utils} from "../../Utils/utils";
import {ITodoFooterProps} from '../../Types/interfaces'
import { Link } from 'react-router-dom';
import {Button} from "@mui/material"; // Add this import

const TodoFooter = (props: ITodoFooterProps) => {
    const activeTodoWord = Utils.pluralize(props.count, 'item');
    let clearButton = null;

    if (props.completedCount > 0) {
        clearButton = (
            <Button variant="outlined" onClick={props.onClearCompleted}>Clear completed items</Button>
        );
    }

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
            {clearButton}
        </footer>
    );
}

export {TodoFooter};
