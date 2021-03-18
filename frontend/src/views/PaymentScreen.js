import CheckoutSteps from "../components/CheckoutSteps";
import {
    getUserInfo,
    setPayment
} from "../localStorage";

const PaymentScreen = {
  after_render: () => {
    document.getElementById("stripe").disabled = true;

    document
      .getElementById("payment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector(
              'input[name="payment-method"]:checked'  
            ).value;
        setPayment({ paymentMethod });
        document.location.hash = '/placeorder';
      });
  },
  render: () => {
    const { firstname } = getUserInfo();
    if (!firstname) {
      document.location.hash = '/';
    }
    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
    <div class="form-container">
        <form id="payment-form">
            <ul class="form-items">
                <li>
                    <h1>Payment Method</h1>
                </li>
                <li>
                    <div>
                    <input type="radio"
                    name="payment-method" 
                    id="paypal" 
                    value="PayPal" 
                    checked />
                    <label for="paypal">PayPal</label>
                    </div>
                </li>
                <li>
                <div>
                <input type="radio"
                name="payment-method" 
                id="stripe" 
                value="Stripe" class="btn-danger disabled" 
                 />
                <label for="stripe">Stripe (Coming soon)</label>
                </div>
            </li>
                <li>
                    <button type="submit" class="btn-primary btn">Continue</button>
                </li>
            </ul>
        </form>
    </div>`;
  },
};
export default PaymentScreen;
