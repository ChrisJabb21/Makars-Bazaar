import data from '../data.js'
const HomeScreen = {
    render: async () => {
        const response = await fetch("http://localhost:5000/api/products",
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response || !response.ok ){
            return `<div>Error in getting data</div>`;
        }

        const products = await response.json();

        return `
        <h3>Products List</h3>
        <ul class="products">
            ${products.map((product) => `
            <!--<li onclick="location.href = 'http://stackoverflow.com/questions/3486110/make-a-list-item-clickable-html-css';"> -->
            <li onclick="location.href = 'http://localhost:8080/#/product/${product.id}';">
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