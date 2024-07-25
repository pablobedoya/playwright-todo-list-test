import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();
});

test('THA-1: User can successfully clear completed todo items', async () => {
  for (let i = 1; i <= 3; i++) {
    await todoPage.addTodoItem(`Item ${i}`);
  }

  await todoPage.markTodoItem(0);
  await todoPage.markTodoItem(1);

  await todoPage.clearCompleted();

  const totalItems = await todoPage.countTodoItems();
  expect(totalItems).toBe(1);
});

test('THA-2: User can successfully make duplicate todo items', async () => {
  await todoPage.addTodoItem('Item 1');
  await todoPage.addTodoItem('Item 1');

  const totalItems = await todoPage.countTodoItems();

  expect(totalItems).toBe(2);
});

test('THA-3: Number of "items left" is the same as count of active todo items in the list with "all" filter', async ({ page }) => {
  for (let i = 1; i <= 5; i++) {
    await todoPage.addTodoItem(`Item ${i}`);
  }

  await todoPage.markTodoItem(0);
  await todoPage.markTodoItem(1);

  await todoPage.clearCompleted();

  const activeTodoCount = await todoPage.countTodoItems();
  const itemsLeftCount = await todoPage.getItemsLeftCount();

  expect(activeTodoCount).toBe(itemsLeftCount);
});

test('THA-4: User can successfully delete a todo item', async ({ page }) => {
  await todoPage.addTodoItem('Item 1');
  await todoPage.addTodoItem('Item 2');

  await todoPage.deleteTodoItem(0);
  await todoPage.deleteTodoItem(0);

  const totalItems = await todoPage.countTodoItems();
  expect(totalItems).toBe(0);
});
