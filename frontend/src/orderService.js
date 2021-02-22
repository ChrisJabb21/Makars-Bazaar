import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage"

/* Order api mappings */

export const createOrder = async(order) => {
try{
    const {token} = getUserInfo();
    const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: order,
    });
    if(response.statusText !== 'Created'){
        throw new Error(response.data.message);
    }
    return response.data;
}catch(err){
    return { error: err.response ? err.response.data.message : err.message };
    };
}

export const getOrder = async(id) => {
    try{ 
        const { token } = getUserInfo();
    const response = await axios({
        url: `${apiUrl}/api/orders/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },    
    });
    if(response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
}
    catch(err){
        return { error: err.message };
    }
};