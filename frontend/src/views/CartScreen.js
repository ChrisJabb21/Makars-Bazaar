import { getCartItems, setCartItems,  } from "../localStorage";
import { getProduct } from "../productService";
import { parseRequestUrl, rerender, formatter } from "../utils";

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

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.product !== id));
    if(id === parseRequestUrl().id) {
        document.location.hash = '/cart';   
    } else {
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach((qtySelect) => {
            qtySelect.addEventListener('change', (e) => {
                const item = getCartItems().find((x) => x.product === qtySelect.id);
                addToCart({ ...item, qty: Number(e.target.value) }, true)
            });
        });
        const deleteFromCart = document.getElementsByClassName("delete-button");
        Array.from(deleteFromCart).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById("checkout-button").addEventListener("click", () =>{
            document.location.hash = '/signin';
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
                countInStock: product.countInStock,
                qty: 1,
            })
        }
        const cartItems = getCartItems();
        return `
    <button onclick="location.href ='/#/'" type="button" class="cart-browse-btn back-button btn-primary btn"><span> <i class="fas fa-arrow-circle-left"></i> <span>Back to browse </button>
    <h1>Shopping Cart</h1>
    <div class="content cart">
        <div class="cart-list">
            <ul class="cart-list-container"> 
            <li>
                <div>Product</div>
                <div>Price</div>
            </li>
            ${cartItems.length === 0 ?
                '<div>Cart is empty.<a href="/#/"> Click here to shop</a>' :
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
                   Qty: <select class="qty-select" id="${item.product}">
                   ${
                        [...Array(item.countInStock).keys()].map(x => 
                        item.qty === x + 1 
                        ? `<option selected value ="${x+1}">${x+1}</option>`
                        : `<option value ="${x+1}">${x+1}</option>`
                        )
                    }

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
                <button class="btn btn-success" id="checkout-button">
                    Proceed to Checkout
                </button>
      
            </div>
        </div>
        `;

    }
};

export default CartScreen;