import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoItem } from '@todo-app/shared/models/todo-item';
import { TodoListActions } from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import {
	completedTodosSelector,
	isAddingTodoSelector,
	isLoadingSelector,
	selectedTodoItemSelector,
	todoListSelector,
} from './state/todo-list.selector';

@Injectable({
	providedIn: 'root',
})
export class TodoListSandboxService {
	public isLoading$ = this.store.select(isLoadingSelector);
	public selectedTodo$ = this.store.select(selectedTodoItemSelector);
	public completedTodos$ = this.store.select(completedTodosSelector);
	public isSavingTodo$ = this.store.select(isAddingTodoSelector);
	public todoList$ = this.store.select(todoListSelector);

	constructor(private store: Store<TodoListState>) {}
	public todoCompletedToggled(todoId: string) {
		this.store.dispatch(
			TodoListActions.toggleCompleteTodoItem({ todoItemId: todoId }),
		);
	}
	public selectTodoForEdit(todoItem: TodoItem) {
		this.store.dispatch(TodoListActions.selectTodoForEdit({ todoItem }));
	}

	public saveTodoItem(todoItem: TodoItem) {
		this.store.dispatch(
			TodoListActions.saveTodoItemRequest({
				todoItem: {
					...todoItem,
				},
			}),
		);
	}

	/**
	 * loadTodoList
	 */
	public loadTodoList() {
		this.store.dispatch(TodoListActions.getTodoListRequest());
	}

	/**
	 * deleteTodo
	 */
	public deleteTodo(id: string) {
		this.store.dispatch(TodoListActions.deleteTodoItem({ todoItemId: id }));
	}
}
