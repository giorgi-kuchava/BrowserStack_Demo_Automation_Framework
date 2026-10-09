import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: /Search$/ });
  }

  async open() {
    await this.visit('/');
    await expect(this.page).toHaveTitle('StackDemo');
    await expect(this.page.locator('.shelf-item').first()).toBeVisible();
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async goToOrders() {
    await this.page.locator('#orders').click();
    await expect(this.page).toHaveURL(/.*\/orders/);
  }

  async goToFavourites() {
    await this.page.locator('#favourites').click();
    await expect(this.page).toHaveURL(/.*\/favourites/);
  }
}

