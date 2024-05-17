import { afterEach, describe, expect, it } from "vitest";
import { addTodo, deleteTodo, toggleTodo } from "../functions";
import { Todo } from "../types/Todo";

let TODO: Todo;

afterEach(() => {
	TODO = {
		id: 1,
		title: "My first todo",
		completed: true,
	};
});

describe("add todo", () => {
	it("should add todo", () => {
		const todos: Todo[] = [];
		const title = "abc";
		const result = addTodo(title, todos);

		expect(todos.length).toBe(1);
		expect(todos[0].title).toBe("abc");
		expect(result.success).toBe(true);
	});

	it("should not add a todo with empty title", () => {
		const title = "";
		const todos: Todo[] = [];
		const result = addTodo(title, todos);

		expect(result.success).toBe(false);
		expect(title).toBe("");
		expect(todos.length).toBe(0);
	});

	it("should not add a todo with title shorter than 3 characters", () => {
		const title = "ab";
		const todos: Todo[] = [];
		const result = addTodo(title, todos);

		expect(result.success).toBe(false);
		expect(todos.length).toBe(0);
		expect(title.length).toBe(2);
	});
});

describe("toggle todo", () => {
	it("should toggle a todo", () => {
		const todoId = TODO.id;
		const todo = [TODO];
		const result = toggleTodo(todoId, todo);

		expect(todo[0].completed).toBe(false);
		expect(result.success).toBe(true);
	});

	it("should not toggle a todo that dont exist", () => {
		const todoId = 2;
		const todo = [TODO];
		const result = toggleTodo(todoId, todo);

		expect(todo.length).toBe(1);
		expect(result.success).toBe(false);
		expect(todo[0].completed).toBe(true);
	});
});

describe("delete todo", () => {
	it("should delete a todo", () => {
		const todoId = TODO.id;
		const todo = [TODO];
		const result = deleteTodo(todoId, todo);

		expect(todo.length).toBe(0);
		expect(result.success).toBe(true);
	});

	it("should not delete a todo that dont exist", () => {
		const todoId = 2;
		const todo = [TODO];
		const result = deleteTodo(todoId, todo);

		expect(todo.length).toBe(1);
		expect(result.success).toBe(false);
	});
});
