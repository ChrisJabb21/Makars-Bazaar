import Header from './components/Header';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import CartScreen from './views/CartScreen';
import DashboardScreen from './views/DashboardScreen';
import Error404Screen from './views/Error404Screen';
import HomeScreen from './views/HomeScreen';
import OrderScreen from './views/OrderScreen';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import ProductEditScreen from './views/ProductEditScreen';
import ProductListScreen from './views/ProductListScreen';
import ProductScreen from './views/ProductScreen';
import ProfileScreen from './views/ProfileScreen';
import RegisterScreen from './views/RegisterScreen';
import ShippingScreen from './views/ShippingScreen';
import SigninScreen from './views/SigninScreen';


const routes = {
  '/': HomeScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen
};
/**
 * router method for URL routing and parsing
 * @exception return 404 error page screen if URL does dont exist in routes.
 */
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);