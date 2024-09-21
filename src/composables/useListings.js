import axios from "/src/interceptors/axios";
import {ref} from "vue";

export const useListings = () => {
    const listings = ref()
    const listing = ref()

    const getListings = async () => {
        try {
            const response = await axios.get('real-estates')
            listings.value = response.data
        } catch (error) {
            console.log(error)
        }
    }

    const getListing = async (id) => {
        try {
            const response = await axios.get(`real-estates/${id}`)
            listing.value = response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteListing = async (id) => {
        try {
            await axios.delete(`real-estates/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        listings,
        listing,
        getListings,
        getListing,
        deleteListing
    }
}