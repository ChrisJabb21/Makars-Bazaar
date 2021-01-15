import { parseRequestUrl } from './utils';
import Error404Screen from './views/Error404Screen';
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};
/**
 * router method for URL routing and shourc
 */
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.action ? `/${request.action}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
