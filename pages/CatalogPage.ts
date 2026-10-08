import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private productCard(name: string): Locator {
    return this.page.locator('.shelf-item', {
      has: this.page.locator('p.shelf-item__title').filter({
        hasText: new RegExp(`^${name}$`),
      }),
    });
  }

  async expectProductCount(count: number) {
    await expect(this.page.locator('.shelf-item')).toHaveCount(count);
  }

  async expectProduct(name: string) {
    await expect(this.productCard(name)).toBeVisible();
  }

  async expectProductToBeHidden(name: string) {
    await expect(this.productCard(name)).toHaveCount(0);
  }

  async filterByVendor(vendor: string) {
    await this.page.getByText(vendor, { exact: true }).click();
    await expect(this.page.getByLabel(vendor, { exact: true })).toBeChecked();
  }

  async sortBy(option: 'lowestprice' | 'highestprice') {
    await this.page.locator('select').selectOption(option);
  }

  async expectFirstProduct(name: string) {
    await expect(this.page.locator('.shelf-item__title').first()).toHaveText(name);
  }

  async addProductToCart(name: string) {
    const card = this.productCard(name);
    await expect(card).toBeVisible();
    await card.locator('.shelf-item__buy-btn').click();
  }
}
