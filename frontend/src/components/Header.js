import { getUserInfo } from "../localStorage";

/* eslint-disable arrow-body-style */
const Header = {
    render: () => {
        const { firstname } = getUserInfo();
        return `
        <div class="logo">
        <a href="/#/">Makar's Bazaar</a>
    </div>
    <div>
    ${ 
    firstname 
    ? `<a href="/#/profile"> Hey ${firstname} <i class="fas fa-user" style="font-size:12px"></i> </a>` : 
    `<a href="/#/signin">Sign-In <i class="fas fa-user" style="font-size:12px"></i></a>`
}
        <a href="/#/cart">Cart <i class="fa fa-shopping-cart" style="font-size:12px"></i>
        </a>
    </div>
    <!-- <Button class="toggle-collapse">
        <i class="fas fa-bars"></i>
    </Button> -->`;
    },
    after_render: () => {},
};
export default Header;