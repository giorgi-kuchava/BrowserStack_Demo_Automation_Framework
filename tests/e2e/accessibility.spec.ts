import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('keyboard and accessible controls', () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).open();
  });

  test('exposes a named search field and an adjacent keyboard-reachable search button', async ({ page }) => {
    test.fixme(
      test.info().project.name === 'webkit',
      'Known BrowserStack Demo accessibility defect: WebKit skips the Search button in the tab order.',
    );
    const search = page.getByRole('textbox', { name: 'Search' });
    const button = page.getByRole('button', { name: /Search$/ });

    await expect(search).toBeVisible();
    await search.focus();
    await search.press('Tab');
    await expect(button).toBeFocused();
  });

  test('exposes the Apple vendor filter through its accessible label', async ({ page }) => {
    const appleFilter = page.getByLabel('Apple', { exact: true });

    await expect(appleFilter).not.toBeChecked();
    await page.getByText('Apple', { exact: true }).click();
    await expect(appleFilter).toBeChecked();
  });
});
