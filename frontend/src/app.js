import { parseRequestUrl } from './utils.js';
import HomeScreen from './views/HomeScreen.js';
import ProductScreen from './views/ProductScreen.js';
const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
}
/**
 * router method for URL routing and shourc
 */
const router = () => {
    const request = parseRequestUrl();
    const parseUrl = 
    (request.resource ? `/${request.resource}`: '/' ) 
    + (request.id ? '/:id': '' ) 
    + (request.action ? `/${request.action}`: '');
     const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const main = document.getElementById('main-container');
    main.innerHTML = screen.render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);