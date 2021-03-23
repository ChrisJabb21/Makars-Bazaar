import { getUserInfo } from "../localStorage";
import { deliverOrder, getOrder, getPaypalClientId, payOrder } from "../api/orderService";
import { formatter, hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils";

const addPaypalSdk = async (totalPrice) => {
  const clientId = await getPaypalClientId();
  showLoading();
  if(!window.paypal){
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypalobjects.com/api/checkout.js';
    script.async = true;
    script.onload = () => handlePayment(clientId, Number(totalPrice).toFixed(2));
    document.body.appendChild(script);
  } else {
    handlePayment(clientId, Number(totalPrice).toFixed(2));
  }
};

const handlePayment = (clientId, totalPrice) => {
  window.paypal.Button.render({
    env: 'sandbox',
    client:{
      sandbox: clientId,
      production: '',
    },
    locale: 'en_US',
    style: {
      size: 'responsive',
      color: 'gold',
      shape: 'pill',
    },

    commit: true,
    payment(data, actions){
      return actions.payment.create({
        transactions: [
          {
            amount: {
              total: Number(totalPrice).toFixed(2),
              currency: 'USD',
            },
          },
        ],
      });
    },
    onAuthorize(data,actions){
      return actions.payment.execute().then(async() =>{
        showLoading();
        await payOrder(parseRequestUrl().id, {
          orderID: data.orderID,
          payerID: data.payerID,
          paymentID: data.paymentID,
        })
        // call pay order function
        hideLoading();
        showMessage('Payment was successful.', () => {
          rerender(OrderScreen);          
        }); 
      });
    },
  }, 
  '#paypal-button'
  ).then(() => {
    hideLoading();
  });
};
const OrderScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    const el = document.getElementById('deliver-order-button');
if (el){
    document.getElementById('deliver-order-button')
    .addEventListener('click', async () => {
      showLoading();
      await deliverOrder(request.id);
      hideLoading();
      showMessage('Order Delivered.');
      rerender(OrderScreen);
    });
  }
  },
  render: async () => {
    const {isAdmin} = getUserInfo();
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      itemsPrice,
      orderItems,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
    if(!isPaid){
      addPaypalSdk(Number(totalPrice).toFixed(2));
    }
    return `
    <div>
    <h1>Order Confirmation</h1>
        <div class="order">
            <div class="order-info">
            <div><h2> Order number</h2>
            <div class="order-number">${_id}
            </div>
            </div>
                <div>
                    <h2>Shipping</h2>
                    <div>
                    ${shipping.address}, ${shipping.city},  ${shipping.state}, 
                    ${shipping.postalCode}, ${shipping.country}. 
                    </div>
                    ${
                      isDelivered
                        ? `<div class="success">Delivered on ${new Date(deliveredAt)}</div>`
                        : `<div class="error"> Not delivered</div>`
                    }


                </div>
        <div>
            <h2>Payment</h2>
            <div>
            Payment Method : ${payment.paymentMethod}
            </div>
            ${
              isPaid
                ? `<div class="success">Paid on ${new Date(paidAt)}</div>`
                : `<div class="error"> Not paid</div>`
            }
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
                        `).join("\n")}
            </ul>
        </div>
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
              <li><div class="total">Order Total ${formatter.format(
                totalPrice
              )}</div>
              </li>
              <li><div class="fw" id="paypal-button"></div></li>
              <li>
              ${
                isPaid && !isDelivered && isAdmin 
                  ? `<button id="deliver-order-button" class="btn btn-primary fw"> Confirm Order Delivered </button>`
                  : ''
              }
              </li>
        </div>
    </div>
</div>

        `;
  },
};

export default OrderScreen;
