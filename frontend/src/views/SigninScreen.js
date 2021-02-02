const SigninScreen = {
  after_render: () => {},
  render: () => `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
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
                        <button type="submit" class="btn-primary btn">Sign in</button>
                    </li>
                    <li>
                        <div>
                        New User? <a href="/#/register">Create an account. </a>
                        </div>                    
                    </li>
                </ul>
            </form>
        </div>
    `,
};
export default SigninScreen;
