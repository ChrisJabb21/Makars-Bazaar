import axios from 'axios';
import { clientUrl } from '../config';
import Rating from '../components/Rating';
import { hideLoading, showLoading } from '../utils';

/** view for displaying all products to browse */
const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    hideLoading();
    if (!response || response.statusText !== 'OK') {
      return '<div>Error in getting data</div>';
    }
    const products = response.data;

    return `
        <h1>Products</h1>
        <ul class="products">
            ${products.map((product) => `
            <li onclick="location.href = '${clientUrl}#/product/${product.id}';">
                <div class="product">
                    <a href="/#/product/${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                    <div class="product-name">
                        <a href="/#/product/${product.id}">${product.name} </a>
                    </div>
                    <div class="product-rating">
                    ${Rating.render({
                         value: product.rating,
                         text: `${product.numOfReviews} reviews`,
                    })}
                    </div>
                    <div class="product.brand">
                    ${product.brand}
                </div>
                    <div class="product-price">
                    $${product.price}
                </div>
                <div>
                <div>
                <button onclick="location.href='${clientUrl}/#/product/${product.id}';" type="button" id="add-button" class="btn btn-primary"> View Product </button></div>
                </div>
                </div>
                </div>
                </div>
            </li>
            `).join('\n')}
        `;
  },
};

export default HomeScreen;
