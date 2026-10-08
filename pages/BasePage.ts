import { type Page } from '@playwright/test';

/** Shared behaviour for every page object. */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async visit(path = '/') {
    await this.page.goto(path);
  }
}
