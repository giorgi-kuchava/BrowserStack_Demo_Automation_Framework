import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FavouritesPage extends BasePage {
  readonly favouriteItems: Locator;

  constructor(page: Page) {
    super(page);
    this.favouriteItems = page.locator('.shelf-item');
  }

  async open() {
    await this.visit('/favourites');
  }

  async expectFavouriteCount(count: number) {
    await expect(this.favouriteItems).toHaveCount(count);
  }

  async expectFavouriteProduct(name: string) {
    await expect(this.favouriteItems.filter({ hasText: name }).first()).toBeVisible();
  }

  async addFavouriteToCart(name: string) {
    const card = this.favouriteItems.filter({ hasText: name }).first();
    await expect(card).toBeVisible();
    await card.locator('.shelf-item__buy-btn').click();
  }
}
