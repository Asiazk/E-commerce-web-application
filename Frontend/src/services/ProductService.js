// product service for communicationg with backend using axios
import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1"


    export async function getProducts() {
        return await axios.get(PRODUCT_API_BASE_URL + '/storeItems');
    }

    export async function saveProductDb(product) {
        return await axios.post(PRODUCT_API_BASE_URL + '/storeItems', product)
    }

    export async function saveImage(formData) {
        return await axios.put(PRODUCT_API_BASE_URL + '/uploadImage', formData)
    }

    export async function getProductImage(imageName) {
        return await axios.get(PRODUCT_API_BASE_URL + '/storeItems/' + imageName)
    }

    export async function updateProductDb(id, product) {
        return await axios.put(PRODUCT_API_BASE_URL + '/storeItems/' + id, product)
    }

    export async function getProductById(id) {
        return axios.get(PRODUCT_API_BASE_URL + '/storeItems/' + id)
    }

    export async function deleteProductDb(id) {
        return axios.delete(PRODUCT_API_BASE_URL + '/storeItems/' + id)
    }

    export function getNumOfItemsInTable() {
        return axios.get(PRODUCT_API_BASE_URL + '/storeItems/size')
    }
