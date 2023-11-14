import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '../Components/Header/Header';
import { TodoModel } from "../Utils/todoModel";

const model = new TodoModel('someKey');

test('calls addTodo on pressing Enter', () => {
    const addTodoMock = jest.spyOn(model, 'addTodo');

    render(<Header model={model} />);

    const inputField = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: 'New Todo Item' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    expect(addTodoMock).toHaveBeenCalledWith('New Todo Item');
    expect(inputField.value).toBe('');
});
