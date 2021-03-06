import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FEATURE_STORE_ANONYMIZER } from '@todo/shared/data-access-logging';
import { TodoListAnonymizer } from './todo-list.anonymizer';
import { TodoListEffects } from './todo-list.effects';
import { todoListReducers } from './todo-list.reducers';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature('todoList', todoListReducers),
		EffectsModule.forFeature([TodoListEffects]),
	],
	exports: [],
	providers: [
		{
			provide: FEATURE_STORE_ANONYMIZER,
			useClass: TodoListAnonymizer,
			multi: true,
		},
	],
})
export class TodoListStoreModuleModule {}
