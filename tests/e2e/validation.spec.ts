import { test } from '@playwright/test';
import { CatalogPage } from '../../pages/CatalogPage';
import { HomePage } from '../../pages/HomePage';

test.describe('catalog search', () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).open();
  });

  test('shows a matching product when a customer searches by name', async ({ page }) => {
    test.fixme(true, 'Known BrowserStack Demo defect: submitting search clears the query without filtering products.');
    const home = new HomePage(page);
    const catalog = new CatalogPage(page);

    await home.searchFor('iPhone 12 Pro Max');
    await catalog.expectProductCount(1);
    await catalog.expectProduct('iPhone 12 Pro Max');
  });

  test('shows an empty catalog for a product that does not exist', async ({ page }) => {
    test.fixme(true, 'Known BrowserStack Demo defect: submitting search clears the query without filtering products.');
    const home = new HomePage(page);
    const catalog = new CatalogPage(page);

    await home.searchFor('product-that-does-not-exist');
    await catalog.expectProductCount(0);
  });
});
