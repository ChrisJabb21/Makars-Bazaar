export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) 
    : [];
    return cartItems;
};

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

};

export const setUserInfo = ({
    id = '',
    firstname = '',
    lastname = '',
    email = '',
    password = '',
    token = '',
    isAdmin = false,
}) => {
    localStorage.setItem(
    'userInfo',
    JSON.stringify({
        id,
        firstname,
        lastname,
        email,
        password,
        token,
        isAdmin,
    })
    
    );
};
export const getUserInfo = () => 
    localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {email: '', password: '', username:'', firstname:''};
