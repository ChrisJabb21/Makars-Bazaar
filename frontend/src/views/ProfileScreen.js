import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { update } from "../userService";
import { hideLoading, showLoading, showMessage } from "../utils";

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
  render: () => {
      const {firstname, lastname, email} = getUserInfo();
        if(!firstname)
        {
            document.location.hash = '/';
        }
    return `
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
        </div>`
    },
};
export default ProfileScreen;
