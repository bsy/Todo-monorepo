import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TodoItem } from '@todo-app/shared/models/todo-item';
import { createMagicalMock } from '@todo/shared/util';
import { TodoListResourcesService } from '../resources/todo-list-resources.service';
import { TodoListActions } from './todo-list.actions';
import { TodoListEffects } from './todo-list.effects';

describe('TodoListEffects', () => {
	let actions: Observable<any>;

	let effects: TodoListEffects;
	const todoListResourcesStub = createMagicalMock(TodoListResourcesService);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TodoListEffects,
				provideMockActions(() => actions),
				{
					provide: TodoListResourcesService,
					useValue: todoListResourcesStub,
				},
			],
		});

		effects = TestBed.get(TodoListEffects);
	});

	describe('saveTodoItemRequest', () => {
		it('should trigger add todo item request', () => {
			const todoList: TodoItem[] = [{ title: '', id: '1', description: '' }];
			const action = TodoListActions.getTodoListRequest();
			const outcome = TodoListActions.getTodoListResponse({ todoList });

			actions = hot('-a', { a: action });
			const response = cold('-a|', { a: todoList });
			todoListResourcesStub.getTodos.and.returnValue(response);

			const expected = cold('--b', { b: outcome });
			expect(effects.getTodoListRequest$).toBeObservable(expected);
		});

		it('should fail and return an action with the error', () => {
			const action = TodoListActions.getTodoListRequest();
			const error = new Error('some error') as any;
			const outcome = TodoListActions.getTodoListFailed({ error });

			actions = hot('-a', { a: action });
			const response = cold('-#|', {}, error);
			todoListResourcesStub.getTodos.and.returnValue(response);

			const expected = cold('--b', { b: outcome });
			expect(effects.getTodoListRequest$).toBeObservable(expected);
		});
	});

	describe('saveTodoItemRequest$', () => {
		it('should trigger an update todo item request', () => {
			const todoItem: TodoItem = { title: '', id: '1', description: '' };

			const action = TodoListActions.saveTodoItemRequest({ todoItem });
			actions = hot('-a', { a: action });

			const outcome = TodoListActions.updateTodoItemRequest({ todoItem });
			const expected = cold('-b', { b: outcome });
			expect(effects.saveTodoItemRequest$).toBeObservable(expected);
		});

		it('should trigger an add todo item request', () => {
			const todoItem: TodoItem = { title: '', id: '', description: '' };

			const action = TodoListActions.saveTodoItemRequest({ todoItem });
			actions = hot('-a', { a: action });

			const outcome = TodoListActions.addTodoItemRequest({ todoItem });
			const expected = cold('-b', { b: outcome });
			expect(effects.saveTodoItemRequest$).toBeObservable(expected);
		});
	});

	describe('updateTodoItemRequest$', () => {
		it('should return update todo list item response', () => {
			const todoItem: TodoItem = { title: '', id: '', description: '' };

			const action = TodoListActions.updateTodoItemRequest({ todoItem });
			actions = hot('-a', { a: action });
			const response = cold('-a|', { a: todoItem });
			todoListResourcesStub.updateTodoItem.and.returnValue(response);

			const outcome = TodoListActions.updateTodoItemResponse({ todoItem });
			const expected = cold('--b', { b: outcome });
			expect(effects.updateTodoItemRequest$).toBeObservable(expected);
		});

		it('should return update todo list item failed', () => {
			const todoItem: TodoItem = { title: '', id: '', description: '' };

			const action = TodoListActions.updateTodoItemRequest({ todoItem });
			const error = new Error('some error') as any;
			const outcome = TodoListActions.updateTodoItemFailed({ error });

			actions = hot('-a', { a: action });
			const response = cold('-#|', {}, error);
			todoListResourcesStub.updateTodoItem.and.returnValue(response);

			const expected = cold('--b', { b: outcome });
			expect(effects.updateTodoItemRequest$).toBeObservable(expected);
		});
	});
	describe('addTodoItemRequest$', () => {
		it('should return add todo list item response', () => {
			const todoItem: TodoItem = { title: '', id: '', description: '' };

			const action = TodoListActions.addTodoItemRequest({ todoItem });
			actions = hot('-a', { a: action });
			const response = cold('-a', { a: todoItem });
			todoListResourcesStub.addTodoItem.and.returnValue(response);

			const outcome = TodoListActions.addTodoItemReponse({ todoItem });
			const expected = cold('--b', { b: outcome });
			expect(effects.addTodoItemRequest$).toBeObservable(expected);
		});

		it('should return add todo list item failed', () => {
			const todoItem: TodoItem = { title: '', id: '', description: '' };

			const action = TodoListActions.addTodoItemRequest({ todoItem });
			const error = new Error('some error') as any;
			const outcome = TodoListActions.addTodoItemFailed({ error });

			actions = hot('-a', { a: action });
			const response = cold('-#|', {}, error);
			todoListResourcesStub.addTodoItem.and.returnValue(response);

			const expected = cold('--b', { b: outcome });
			expect(effects.addTodoItemRequest$).toBeObservable(expected);
		});
	});
});
