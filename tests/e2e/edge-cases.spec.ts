import { test } from '@playwright/test';
import { CatalogPage } from '../../pages/CatalogPage';
import { HomePage } from '../../pages/HomePage';

test.describe('catalog filters and ordering', () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).open();
  });

  test('limits results to the chosen vendor', async ({ page }) => {
    const catalog = new CatalogPage(page);

    await catalog.filterByVendor('Apple');
    await catalog.expectProduct('iPhone 12');
    await catalog.expectProductToBeHidden('Galaxy S20');
  });

  test('orders products from the lowest price upward', async ({ page }) => {
    const catalog = new CatalogPage(page);

    await catalog.sortBy('lowestprice');
    await catalog.expectFirstProduct('Pixel 2');
  });
});
