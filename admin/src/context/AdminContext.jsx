import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = 'http://localhost:4000' // import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change doctor availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const [ambulanceBookings, setAmbulanceBookings] = useState([])
    const [labBookings, setLabBookings] = useState([])

    // Getting all ambulance bookings from Database using API
    const getAllAmbulanceBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/ambulance', { headers: { aToken } })
            if (data.success) {
                setAmbulanceBookings(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Getting all lab bookings from Database using API
    const getAllLabBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/lab-bookings', { headers: { aToken } })
            if (data.success) {
                setLabBookings(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to cancel ambulance booking
    const cancelAmbulanceBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-ambulance', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAmbulanceBookings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to approve ambulance booking
    const approveAmbulanceBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/approve-ambulance', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAmbulanceBookings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to cancel lab booking
    const cancelLabBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-lab', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllLabBookings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to confirm lab booking
    const confirmLabBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/confirm-lab', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllLabBookings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const [products, setProducts] = useState([])

    // Function to list all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to remove product
    const removeProduct = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllProducts()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData,
        ambulanceBookings,
        getAllAmbulanceBookings,
        cancelAmbulanceBooking,
        approveAmbulanceBooking,
        labBookings,
        getAllLabBookings,
        cancelLabBooking,
        confirmLabBooking,
        products,
        getAllProducts,
        removeProduct,
        backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider