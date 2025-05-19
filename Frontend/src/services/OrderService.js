import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/order"
const USER_ORDERS_BASE_URL = "http://localhost:8080/api/v1/orders"

export function processOrder(id, cart) {
    return axios.post(ORDER_API_BASE_URL + "/" + id, cart);
}

export async function getAllUserOrders(id) {
    return axios.get(USER_ORDERS_BASE_URL + "/" + id);
}

export async function getAllItemsFromOrder(userId, orderId) {
    return axios.get(USER_ORDERS_BASE_URL + "/" + userId + "/" + orderId);
}

export async function getAllOrders() {
    return axios.get(USER_ORDERS_BASE_URL + "/all");
}

export async function changeOrderStatus(orderId, newStatus) {
    return axios.put(USER_ORDERS_BASE_URL + "/edit" + "/" +  orderId, newStatus);
}