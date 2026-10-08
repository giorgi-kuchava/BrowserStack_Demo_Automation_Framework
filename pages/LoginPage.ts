import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameDropdown: Locator;
  readonly passwordDropdown: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameDropdown = page.locator('#username');
    this.passwordDropdown = page.locator('#password');
    this.loginButton = page.locator('#login-btn');
    this.errorMessage = page.locator('.api-error');
  }

  async open() {
    await this.visit('/signin');
    await expect(this.loginButton).toBeVisible();
  }

  async selectUsername(username: string) {
    await this.usernameDropdown.click();
    await this.page.locator('div[id*="option"]').filter({ hasText: new RegExp(`^${username}$`) }).first().click();
  }

  async selectPassword(password: string) {
    await this.passwordDropdown.click();
    await this.page.locator('div[id*="option"]').filter({ hasText: new RegExp(`^${password}$`) }).first().click();
  }

  async login(username?: string, password?: string) {
    if (username) {
      await this.selectUsername(username);
    }
    if (password) {
      await this.selectPassword(password);
    }
    await this.loginButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectLoggedIn(username: string) {
    await expect(this.page.locator('.username')).toHaveText(username);
    await expect(this.page.locator('#signin')).toHaveText('Logout');
  }

  async logout() {
    await this.page.locator('#signin').click();
    await expect(this.page.locator('.username')).toHaveCount(0);
    await expect(this.page.locator('#signin')).toHaveText('Sign In');
  }
}
