import { Page, Locator } from '@playwright/test';

export class TodoPage {
  private page: Page;
  private newTodoInput: Locator;
  private todoListItems: Locator;
  private activeListItems: Locator;
  private clearCompletedButton: Locator;
  private itemsLeft: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('.new-todo');
    this.todoListItems = page.locator('.todo-list li');
    this.activeListItems = page.locator('a[href="#/active"]');
    this.clearCompletedButton = page.locator('.clear-completed');
    this.itemsLeft = page.locator('[data-testid="todo-count"] strong');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodoItem(item: string) {
    await this.newTodoInput.fill(item);
    await this.page.keyboard.press('Enter');
  }

  async markTodoItem(index: number) {
    await this.todoListItems.nth(index).locator('.toggle').click();
  }
  async deleteTodoItem(index: number) {
    const todoItem = this.todoListItems.nth(index);
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
  }

  async showActiveItems() {
    await this.activeListItems.click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async countTodoItems(): Promise<number> {
    return await this.todoListItems.count();
  }

  async getItemsLeftCount(): Promise<number> {
    const textContent = await this.itemsLeft.textContent();
    return parseInt(textContent?.trim() || '0');
  }
}
