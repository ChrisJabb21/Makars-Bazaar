import Header from './components/Header';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import CartScreen from './views/CartScreen';
import Error404Screen from './views/Error404Screen';
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import SigninScreen from './views/SigninScreen';
import RegisterScreen from './views/RegisterScreen';


const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen
};
/**
 * router method for URL routing and parsing
 * @exception return 404 error page if URL does dont exist in routes.
 */
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
