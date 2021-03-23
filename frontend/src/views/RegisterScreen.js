import { getUserInfo, setUserInfo } from "../localStorage";
import { register } from "../api/userService";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
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
            redirectUser(); 
        }
    });
  },
  render: () => {
        if(getUserInfo().email)
        {
            redirectUser();
        }
    return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Create Account</h1>
                    </li>
                     <li>
                        <label for="firstname">First Name</label>
                        <input type="firstname" name="firstname" id="firstname" />
                    </li>
                     <li>
                        <label for="lastname">Last Name</label>
                        <input type="lastname" name="lastname" id="lastname" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                      <li>
                        <label for="confirmpassword">Re-Enter Password</label>
                        <input type="password" name="confirmpassword" id="confirmpassword" />
                    </li>
                    <li>
                        <button type="submit" class="btn-primary btn">Register</button>
                    </li>
                    <li>
                        <div>
                        Already have an account? <a href="/#/signin">Sign-in. </a>
                        </div>                    
                    </li>
                </ul>
            </form>
        </div>`
    },
};
export default RegisterScreen;
