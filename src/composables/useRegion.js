import axios from "/src/interceptors/axios/index.js";
import {ref, watch} from "vue";

export const useRegion = () => {
    const regions = ref([])
    const region = ref('აირჩიეთ რეგიონი')
    const cities = ref([])
    const city = ref('აირჩიეთ ქალაქი')
    const filteredCities = ref([])
    const getRegionsAndCities = async () => {
        try {
            let response = await axios.get('regions')
            regions.value = response.data
            response = await axios.get('cities')
            cities.value = response.data
        } catch (error) {
            console.log(error)
        }
    }
    watch(region, (newRegion) => {
        filteredCities.value = cities.value.filter(c => c.region_id === newRegion.id)
    })

    return {
        regions,
        region,
        city,
        filteredCities,
        getRegionsAndCities
    }

}
