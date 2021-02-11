import { getUserInfo, setUserInfo } from "../localStorage";
import { register } from "../userService";
import { hideLoading, showLoading, showMessage } from "../utils";

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
            document.location.hash = '/'; 
        }
    });
  },
  render: () => {
        if(getUserInfo().email)
        {
            document.location.hash = '/';
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
                        <input type="firstname" name="firstname" id="firstname" required="true" />
                    </li>
                     <li>
                        <label for="lastname">Last Name</label>
                        <input type="lastname" name="lastname" id="lastname" required="true" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required="true" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" required="true"/>
                    </li>
                      <li>
                        <label for="confirmpassword">Re-Enter Password</label>
                        <input type="confirmpassword" name="confirmpassword" id="confirmpassword" required="true"/>
                    </li>
                    <li>
                        <button type="submit" class="btn-primary btn">Sign in</button>
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
