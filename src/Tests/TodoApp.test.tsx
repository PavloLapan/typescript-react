import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../App';
import { TodoModel } from '../Utils/todoModel';

test('renders TodoApp component', () => {
    const model = new TodoModel('someKey');
    render(<TodoApp model={model} />);
    const headerElement = screen.getByText(/Todo list/i);
    expect(headerElement).toBeInTheDocument();
});

test('adds a new todo', () => {
    const model = new TodoModel('someKey');

    jest.spyOn(model, 'addTodo');

    render(<TodoApp model={model} />);
    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(model.addTodo).toHaveBeenCalledWith('New Todo');
});