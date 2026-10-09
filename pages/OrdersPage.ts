import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrdersPage extends BasePage {
  readonly ordersContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.ordersContainer = page.locator('.order');
  }

  async open() {
    await this.visit('/orders');
  }

  async expectOrderCount(count: number) {
    await expect(this.ordersContainer).toHaveCount(count);
  }

  async expectOrderContaining(productTitle: string) {
    await expect(this.ordersContainer.filter({ hasText: productTitle }).first()).toBeVisible();
  }

  async expectShipTo(username: string) {
    await expect(this.page.locator('.value').filter({ hasText: username }).first()).toBeVisible();
  }
}
