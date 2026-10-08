import { test } from '@playwright/test';
import { CatalogPage } from '../../pages/CatalogPage';
import { HomePage } from '../../pages/HomePage';
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';

test.describe('shopping journeys', () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).open();
  });

  test('shows a customer the available product catalog', async ({ page }) => {
    const catalog = new CatalogPage(page);

    await catalog.expectProductCount(25);
    await catalog.expectProduct('iPhone 12 Pro Max');
    await catalog.expectProduct('Galaxy S20 Ultra');
  });

  test('adds a selected product to the bag with its price', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const cart = new ShoppingCartPage(page);

    await catalog.addProductToCart('iPhone 12');
    await cart.expectItem('iPhone 12');
    await cart.expectSubtotal('799.00');
  });
});
