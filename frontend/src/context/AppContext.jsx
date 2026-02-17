import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    console.log('Frontend Backend URL:', backendUrl);

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctosData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const [products, setProducts] = useState([])

    // Getting Products using API
    const getProductsData = async () => {
        try {
            console.log('Fetching products from:', backendUrl + '/api/product/list');
            const { data } = await axios.get(backendUrl + '/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // My Bookings Data
    const [userLabBookings, setUserLabBookings] = useState([])
    const [userAmbulanceBookings, setUserAmbulanceBookings] = useState([])
    const [userOrders, setUserOrders] = useState([])
    const [userMedicines, setUserMedicines] = useState([])
    const [userMedicalRecords, setUserMedicalRecords] = useState([])

    const getUserLabBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/lab-bookings/user-bookings', { headers: { token } })
            if (data.success) {
                setUserLabBookings(data.bookings)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserAmbulanceBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/ambulance/user-bookings', { headers: { token } })
            if (data.success) {
                setUserAmbulanceBookings(data.bookings)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserOrders = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
            if (data.success) {
                setUserOrders(data.orders)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserMedicines = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medicine/list', { headers: { token } })
            if (data.success) {
                setUserMedicines(data.medicines)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserMedicalRecords = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medical-record/list', { headers: { token } })
            if (data.success) {
                setUserMedicalRecords(data.records)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const placeOrder = async (orderData) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserOrders()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const addMedicine = async (medicineData) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/medicine/add', medicineData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserMedicines()
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return false
        }
    }

    const deleteMedicine = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/medicine/remove', { id }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserMedicines()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const addMedicalRecord = async (formData) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/medical-record/add', formData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserMedicalRecords()
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return false
        }
    }

    useEffect(() => {
        getDoctosData()
        getProductsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
            getUserLabBookings()
            getUserAmbulanceBookings()
            getUserOrders()
            getUserMedicines()
            getUserMedicalRecords()
        }
    }, [token])

    const value = {
        doctors, getDoctosData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        products, getProductsData,
        userLabBookings, getUserLabBookings,
        userAmbulanceBookings, getUserAmbulanceBookings,
        userOrders, getUserOrders, placeOrder,
        userMedicines, getUserMedicines, addMedicine, deleteMedicine,
        userMedicalRecords, getUserMedicalRecords, addMedicalRecord
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider