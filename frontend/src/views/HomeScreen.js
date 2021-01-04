import data from '../data.js'
const HomeScreen = {
    render: () => {
        const { products } = data;
        return `
        <h3>Products List</h3>
        <ul class="products">
            ${products.map((product) => `
            <li>
                <div class="product">
                    <a href="/#/product/${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                    <div class="product-name">
                        <a href="/#/product/${product.id}">${product.name} </a>
                    </div>
                    <div class="product.brand">
                    ${product.brand}
                </div>
                    <div class="product-price">
                    $${product.price}
                </div>
                </div>
            </li>
            `
            ).join('\n')}
        `;
    },
};

export default HomeScreen;