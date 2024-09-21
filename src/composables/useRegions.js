import axios from "/src/interceptors/axios";
import {ref, watch} from "vue";



export const useRegions = () => {
  const regions = ref()
  const cities = ref()
  const filteredCities = ref()
  const regionIds = ref([])
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
  watch(regionIds, () => {
    filteredCities.value = cities.value.filter(c => regionIds.value.includes(String(c['region_id'])))
  },{deep: true})

  return {
    regions,
    filteredCities,
    regionIds,
    getRegionsAndCities
  }

}

