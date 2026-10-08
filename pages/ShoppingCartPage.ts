import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectItem(name: string) {
    const cart = this.page.locator('.float-cart');
    await expect(cart.getByText(name, { exact: true })).toBeVisible();
    await expect(cart).toContainText('Quantity: 1');
  }

  async expectSubtotal(amount: string) {
    await expect(this.page.locator('.float-cart')).toContainText(`$ ${amount}`);
  }
}
