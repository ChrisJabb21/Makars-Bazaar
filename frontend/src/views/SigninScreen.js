import { getUserInfo, setUserInfo } from "../localStorage";
import { signin } from "../api/userService";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninScreen = {
  after_render: () => {
    document
    .getElementById("signin-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
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
        if(getUserInfo().email){
            redirectUser();
        }
    return `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
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
                        <button type="submit" class="btn-primary btn">Sign in</button>
                    </li>
                    <li>
                        <div>
                        New User? <a href="/#/register">Create an account. </a>
                        </div>                    
                    </li>
                </ul>
            </form>
        </div>`
    },
};
export default SigninScreen;
