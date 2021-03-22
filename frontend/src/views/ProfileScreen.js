import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { getMyOrders } from "../orderService";
import { update } from "../userService";
import { hideLoading, showLoading, showMessage, formatter } from "../utils";

const ProfileScreen = {
  after_render: () => {
    document.getElementById('logout-button').addEventListener("click", () => {
        clearUser();
        document.location.hash ='/';
    });
    document
    .getElementById("profile-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
            showMessage(data.error);
        } else {
            setUserInfo(data);
            document.location.hash = '/'; 
        }
    });
  },
  render: async () => {
    const {firstname, lastname, email} = getUserInfo();
    if(!firstname)
    {
        document.location.hash = '/';
    }
    const orders = await getMyOrders();
    return `
        <div class="profile">
          <div class="profile-info">
           <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                        <h1>Profile Details</h1>
                    </li>
                     <li>
                        <label for="firstname">First Name</label>
                        <input type="firstname" name="firstname" id="firstname" value="${firstname}" />
                    </li>
                     <li>
                        <label for="lastname">Last Name</label>
                        <input type="lastname" name="lastname" id="lastname" value="${lastname}" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"/>
                    </li>
                    <li>
                        <button type="submit" class="btn-primary btn">Update</button>
                    </li>
                    <li>
                        <button type="button" class="btn-danger" id="logout-button">Log out</button>
                    </li>
                </ul>
            </form>
        </div>
          </div>
          <div class="content profile-orders">
          <h2>Order History</h2>
            <table>
              <thead>
                 <tr>
                   <th>ORDER ID</th>
                   <th>ORDER DATE</th>
                   <th>ORDER TOTAL</th>
                   <th>ORDER PAID</th>
                   <th>ORDER DELIVERED</th>
                   <th>ACTIONS</th>
                 </tr>
              </thead>
              <tbody>
                ${
            orders.length === 0 
                ? `<tr><td colspan="6">No Orders found.</tr>`
                : orders.map( (order) => `
                <tr>
                   <td>${order._id}</td>
                   <td>${String(new Date(order.createdAt)).substring(0,25)}</td>
                   <td>${formatter.format(order.totalPrice)}</td>
                   <td>${order.paidAt || 'No'} </td>
                   <td>${order.deliveredAt || 'No'}</td>
                   <td><a href="/#/order/${order._id}">Details</a></td>
                </tr>
                `    ).join('\n')
            }
              </tbody>
              </table>
          </div>
        </div>

       `;
    },
};
export default ProfileScreen;