import Rating from '../components/Rating';
import { clientUrl } from '../config';
import { getProducts } from '../api/productService';
import { showLoading } from '../utils';

/** view for displaying all products to browse */
const HomeScreen = {
  render: async () => {
    showLoading();
    const products = await getProducts();
    if(products.error){
      return `<div class="error">${products.error}</div>`;
    }

    return `
        <h1>Products</h1>
        <ul class="products">
            ${products.map((product) => `
            <li onclick="location.href = '${clientUrl}#/product/${product._id}';">
                <div class="product">
                    <a href="/#/product/${product._id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                    <div class="product-name">
                        <a href="/#/product/${product._id}">${product.name} </a>
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
