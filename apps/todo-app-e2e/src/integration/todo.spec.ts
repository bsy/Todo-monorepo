import { TodoPage } from '../support/todo.po';

describe('Todo', () => {
	beforeEach(() => {
		TodoPage.goToPage();
	});

	it('should create todo item', () => {
		TodoPage.createTodoItem();
	});
});
