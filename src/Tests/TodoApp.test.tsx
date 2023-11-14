import React from 'react';
import { render, screen} from '@testing-library/react';
import TodoApp from '../App';
import { TodoModel } from '../Utils/todoModel';

test('renders TodoApp component', () => {
    const model = new TodoModel('someKey');
    render(<TodoApp model={model} />);
    const headerElement = screen.getByText(/Todos/i);
    expect(headerElement).toBeInTheDocument();
});
