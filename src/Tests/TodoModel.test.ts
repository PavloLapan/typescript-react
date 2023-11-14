import { TodoModel } from '../Utils/todoModel';

describe('TodoModel', () => {
    let todoModel: TodoModel;

    beforeEach(() => {
        // Create a new instance of TodoModel before each test
        todoModel = new TodoModel('testKey');
    });

    //init test
    it('should initialize with empty todos', () => {
        expect(todoModel.todos).toEqual([]);
    });

    //test based on array length
    it('should add a todo', () => {
        const initialTodos = todoModel.todos.length;
        todoModel.addTodo('Test Todo');
        expect(todoModel.todos.length).toBe(initialTodos + 1);
    });

    //check if completed by click
    it('should toggle all todos', () => {
        todoModel.addTodo('Todo 1');
        todoModel.addTodo('Todo 2');
        todoModel.toggleAll(true);

        expect(todoModel.todos.every((todo) => todo.completed)).toBe(true);
    });

    it('should toggle a todo', () => {
        const todo = { id: '1', title: 'Test Todo', completed: false };
        todoModel.addTodo('Test Todo');
        todoModel.toggle(todo);

        expect(todoModel.todos[0].completed).toBe(true);
    });

    //clear completed
    it('should clear completed todos', () => {
        todoModel.addTodo('Todo 1');
        todoModel.addTodo('Todo 2');
        todoModel.toggleAll(true);
        todoModel.clearCompleted();

        expect(todoModel.todos.every((todo) => !todo.completed)).toBe(true);
    });

    //destroy
    test('should destroy a todo', async () => {
        const todoModel = new TodoModel('someKey');
        const todo1 = { id: '1', title: 'Todo 1', completed: false };
        const todo2 = { id: '2', title: 'Todo 2', completed: true };

        todoModel.addTodo('Todo 1');
        todoModel.addTodo('Todo 2');
        const initialTodosLength = todoModel.todos.length;

        await new Promise<void>((resolve) => {
            todoModel.subscribe(async () => {
                await new Promise(r => setTimeout(r, 10));
                resolve();
            });

            todoModel.destroy(todo1);
        });

        expect(todoModel.todos.length).toBe(initialTodosLength - 1);
        expect(todoModel.todos).not.toContainEqual(todo1);
        expect(todoModel.todos).toEqual([todo2]);
    });
});
