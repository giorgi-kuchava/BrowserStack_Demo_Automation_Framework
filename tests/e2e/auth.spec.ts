import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('customer authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('allows a valid customer to log in and log out successfully', async () => {
    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoggedIn('demouser');

    await loginPage.logout();
  });

  test('shows an error message when attempting to log in with a locked account', async () => {
    await loginPage.login('locked_user', 'testingisfun99');
    await loginPage.expectErrorMessage('Your account has been locked.');
  });

  test('validates required fields when username or password is missing', async () => {
    // Empty submission
    await loginPage.login();
    await loginPage.expectErrorMessage('Invalid Username');

    // Missing password
    await loginPage.selectUsername('demouser');
    await loginPage.loginButton.click();
    await loginPage.expectErrorMessage('Invalid Password');
  });
});
