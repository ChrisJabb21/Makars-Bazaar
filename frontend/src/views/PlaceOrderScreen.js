import CheckoutSteps from "../components/CheckoutSteps";
import { getCartItems, getPayment, getShipping, clearCart } from "../localStorage";
import { createOrder } from "../api/orderService";
import { formatter, hideLoading, showLoading, showMessage } from "../utils";

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }

  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }

  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }

  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);

  const shippingPrice = itemsPrice > 100 ? 0.0 : 10.0;

  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

const PlaceOrderScreen = {
  after_render:  async() => {
    document.getElementById("placeorder-button")
    .addEventListener('click', async() => {const order = convertCartToOrder();
        showLoading();
        const data = await createOrder(order);
        hideLoading();
        if(data.error) {
            showMessage(data.error);
        } else{
            clearCart();
            document.location.hash = `/order/${data.order._id}`;
        }})
    


  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
    <div>
        ${CheckoutSteps.render({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        })}
        <div class="order">
            <div class="order-info">
                <div>
                    <h2>Shipping</h2>
                    <div>
                    ${shipping.address}, ${shipping.city},  ${shipping.state}, 
                    ${shipping.postalCode}, ${shipping.country}. 
                    </div>
                </div>
        <div>
            <h2>Payment</h2>
            <div>
            Payment Method : ${payment.paymentMethod}
            </div>
            </div>
        <div>
          <ul class="cart-list-container">
            <li>
                <h2>Shopping Cart</h2>
                <div>Price</div>
            </li>
            ${orderItems.map(
              (item) => `
                    <li>
                    <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                        <div>
                            <a href="/#/product/${item.product}">${item.name} </a>
                        </div>
                        <div> Qty: ${item.qty} </div>
                        </div>
                        <div class ="cart-price"> $${item.price}</div>
                    </li>
                        `).join('\n')}
            </ul>
        </div>
    </div>
    <div class="order-action">
        <ul>
            <li>
            <h2>Order Summary</h2>
            </li>
            <li><div>Items</div><div>${formatter.format(itemsPrice)}</div>
            </li>
            <li><div>Shipping</div><div>${formatter.format(shippingPrice)}</div>
            </li>
            <li><div>Tax</div><div>${formatter.format(taxPrice)}</div>
            </li>
            <li><div class="total">Order Total ${formatter.format(totalPrice)}</div>
            </li>
            <li>
            <button id="placeorder-button" class="btn btn-success fw">
            Place Order
            </button>
            </li>

        </div>
    </div>
</div>

        `;
  },
};

export default PlaceOrderScreen;
