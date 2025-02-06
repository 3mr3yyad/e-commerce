import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export let cartContext = createContext()
export default function CartContextProvider({ children }) {
    let [numsCartItems, setNumsCartItems] = useState(null)
    const baseURL = 'https://ecommerce.routemisr.com/api/v1/cart'
    const headerOptions = {
        headers: {
            token: localStorage.getItem('token')
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserCart().then((req) => {
                setNumsCartItems(req.data.numOfCartItems)
            })
        }
    }, [])
    function getUserCart() {
        return axios.get(baseURL, headerOptions)
    }

    function addUserCart(id) {
        let data = {
            productId: id
        }
        return axios.post(baseURL, data, headerOptions)
    }
    function deleteProduct(id) {
        return axios.delete(`${baseURL}/${id}`, headerOptions)
    }
    function clearCart() {
        return axios.delete(baseURL, headerOptions)
    }

    function updateCartItemCount(id, count) {
        let data = {
            count
        }
        return axios.put(`${baseURL}/${id}`, data, headerOptions)
    }
    return <cartContext.Provider
        value={{
            getUserCart,
            numsCartItems,
            setNumsCartItems,
            addUserCart,
            deleteProduct,
            clearCart,
            updateCartItemCount
        }}>{children}</cartContext.Provider>

}
