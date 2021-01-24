import { getCartItems, setCartItems } from "../localStorage";
import { getProduct } from "../ProductService";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate=false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        cartItems = cartItems.map((x) => 
        x.product === existItem.product ? item: x );
    }
    else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
};
const CartScreen = {
    after_render:() => {},
    render: async () => {
    const request = parseRequestUrl();
    if(request.id){
        const product = await getProduct(request.id);
        addToCart({
            product: product.id,
            name: product.name,
            image:product.image,
            inStock:product.inStock,
            qty: 1,
        })
    }
    return `<h2>Shopping Cart</h2>
    <div>${getCartItems().length}</div>
    `;
    },
};

export default CartScreen;
