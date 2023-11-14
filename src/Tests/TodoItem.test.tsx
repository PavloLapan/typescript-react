import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {TodoItem} from '../Components/TodoItem/TodoItem';

const mockTodo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
};

test('renders TodoItem component', () => {
    render(
        <TodoItem
            key="1"
            todo={mockTodo}
            onToggle={() => {}}
            onDestroy={() => {}}
            onEdit={() => {}}
            editing={false}
            onSave={() => {}}
            onCancel={() => {}}
        />
    );
    const todoElement = screen.getByText(/Test Todo/i);
    expect(todoElement).toBeInTheDocument();
});

test('calls onDestroy when Remove button is clicked', () => {
    const onDestroyMock = jest.fn();
    render(
        <TodoItem
            key="1"
            todo={mockTodo}
            onToggle={() => {}}
            onDestroy={onDestroyMock}
            onEdit={() => {}}
            editing={false}
            onSave={() => {}}
            onCancel={() => {}}
        />
    );
    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);
    expect(onDestroyMock).toHaveBeenCalled();
});

test('calls onEdit when label is double-clicked', () => {
    const onEditMock = jest.fn();
    render(
        <TodoItem
            key="1"
            todo={mockTodo}
            onToggle={() => {}}
            onDestroy={() => {}}
            onEdit={onEditMock}
            editing={false}
            onSave={() => {}}
            onCancel={() => {}}
        />
    );
    const label = screen.getByText(/Test Todo/i);
    fireEvent.doubleClick(label);
    expect(onEditMock).toHaveBeenCalled();
});
