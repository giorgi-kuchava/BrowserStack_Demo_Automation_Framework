import { test } from '@playwright/test';
import { CatalogPage } from '../../pages/CatalogPage';
import { FavouritesPage } from '../../pages/FavouritesPage';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { OrdersPage } from '../../pages/OrdersPage';
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';

test.describe('user persona accounts and behaviors', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    catalogPage = new CatalogPage(page);
    await loginPage.open();
  });

  test('image_not_loading_user: renders products with broken/empty image sources', async () => {
    await loginPage.login('image_not_loading_user', 'testingisfun99');
    await loginPage.expectLoggedIn('image_not_loading_user');

    await catalogPage.expectProductCount(25);
    await catalogPage.expectBrokenProductImages();
  });

  test('existing_orders_user: displays pre-existing order history', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await loginPage.login('existing_orders_user', 'testingisfun99');
    await loginPage.expectLoggedIn('existing_orders_user');

    await homePage.goToOrders();
    await ordersPage.expectOrderCount(5);
    await ordersPage.expectOrderContaining('iPhone 12');
    await ordersPage.expectShipTo('existing_orders_user');
  });

  test('fav_user: displays pre-saved wishlist products and allows adding them to cart', async ({ page }) => {
    const favouritesPage = new FavouritesPage(page);
    const cart = new ShoppingCartPage(page);

    await loginPage.login('fav_user', 'testingisfun99');
    await loginPage.expectLoggedIn('fav_user');

    await homePage.goToFavourites();
    await favouritesPage.expectFavouriteCount(5);
    await favouritesPage.expectFavouriteProduct('iPhone 12');

    await favouritesPage.addFavouriteToCart('iPhone 12');
    await cart.expectItem('iPhone 12');
  });

  test('demouser: standard account with loaded product images and clean history', async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    const favouritesPage = new FavouritesPage(page);

    await loginPage.login('demouser', 'testingisfun99');
    await loginPage.expectLoggedIn('demouser');

    // Product images load properly
    await catalogPage.expectProductImagesLoaded();

    // Clean order and favourites history
    await homePage.goToOrders();
    await ordersPage.expectOrderCount(0);

    await homePage.goToFavourites();
    await favouritesPage.expectFavouriteCount(0);
  });
});
