import { getCartItems, setCartItems } from "../localStorage";
import { getProduct } from "../ProductService";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if (existItem) {
        if(forceUpdate){
        cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
        );
      }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach((qtySelect) => {
            qtySelects.addEventListener('change', (e) => {
                const item = getCartItems().find((x) => x.product === qtySelect.id);
                addToCart({ ...item, qty: Number(e.target.value) }, false)
            });
        })
    },

    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);
            addToCart({
                product: product.id,
                name: product.name,
                image: product.image,
                price: Number(product.price).toFixed(2),
                inStock: product.inStock,
                qty: 1,
            })
        }
        const cartItems = getCartItems();
        return `
    <h2>Shopping Cart</h2>
    <div>${getCartItems().length}</div>
    <div class="content cart">
        <div class="cart-list">
            <ul class="cart-list-container"> 
            <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
            </li>
            ${cartItems.length === 0 ?
                '<div>Cart is empty.<a href="/#/">Go shopping</a>' :
                cartItems.map(item => `
                <li>
                   <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" />
                   </div>
                   <div class="cart-name">
                   <div>
                        <a href="/#/product/${item.product}">
                            ${item.name}
                        </a>
                   </div>
                   <div> 
                   Qty: <select class= "qty-select" id="${item.product}">
                   <option value ="1">1</option>
                   </select>
                   <button type="button" class=" btn-danger delete-button" id="${item.product}">
                   Delete
                   </button>
                   </div>
                </div>
                <div class="cart-price">
                $${item.price}
                </div>
                </li>
            `       ).join('\n')
            }
                </ul>
            </div>
            <div class="cart-action">
                <h3>
                Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                $${cartItems.reduce((a, c) => a + Number(c.price).toFixed(2) * c.qty, 0)}
                </h3>
                <button class="btn btn-primary">
                    Proceed to Checkout
                </button>
      
            </div>
        </div>
        `;
    }
};

export default CartScreen;