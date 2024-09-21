import axios from "../interceptors/axios/index.js";
import {ref, provide} from "vue";
import {useRouter} from "vue-router";

export const useListings = () => {
    const listings = ref()
    const listing = ref()
    provide('listings', listings)

    const getListings = async () => {
        try {
            const response = await axios.get('real-estates')
            listings.value = response.data
        } catch (error) {
            console.log(error)
        }
    }

    provide('getListings', getListings);

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
            const router = useRouter()
            await router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return {
        listing,
        getListings,
        getListing,
        deleteListing
    }
}