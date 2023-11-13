import React from 'react';
import TodoApp from '../App'
import { TodoModel } from '../Utils/todoModel';
import {render, fireEvent, screen} from '@testing-library/react';

jest.mock('../Utils/todoModel');

describe('TodoApp', () => {
    let todoModel: any;

    beforeEach(() => {
        todoModel = new TodoModel('testKey');
    });

    it('adds a new todo on pressing Enter key', () => {
        const todoModel = new TodoModel('testKey');
        render(<TodoApp model={todoModel} />);

        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(todoModel.addTodo).toHaveBeenCalledWith('New Todo');
    });

    it('toggles all todos when "Mark all as complete" is clicked', () => {
        render(<TodoApp model={todoModel} />);

        const toggleAllCheckbox = screen.getByLabelText('Mark all as complete');
        fireEvent.click(toggleAllCheckbox);

        expect(todoModel.toggleAll).toHaveBeenCalledWith(true);
    });

});





