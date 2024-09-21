import {ref, watch} from 'vue';
import axios from "/src/interceptors/axios";
import {useRouter} from "vue-router";

export default function useListing() {
    const router = useRouter();
    const isRental = ref(0);
    const address = ref();
    const zipCode = ref();
    const regionId = ref();
    const cityId = ref();
    const price = ref();
    const area = ref();
    const bedrooms = ref();
    const description = ref();
    const picture = ref();
    const agentId = ref('აირჩიეთ აგენტი')
    const agents = ref([])

    const fields = ref({
        address: {
            valid: false,
            text: 'მინიმუმ ორი სიმბოლო',
            color: '#021526',
            border: '#808A93'
        },
        zipCode: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526',
            border: '#808A93'
        },
        regionId: {
            valid: false,
            text: 'აირჩიეთ რეგიონი',
            border: '#808A93'
        },
        cityId: {
            valid: false,
            text: 'აირჩიეთ ქალაქი',
            border: '#808A93'
        },
        price: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526',
            border: '#808A93'
        },
        area: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526',
            border: '#808A93'
        },
        bedrooms: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526',
            border: '#808A93'
        },
        description: {
            valid: false,
            text: 'მინიმუმ ხუთი სიტყვა',
            color: '#021526',
            border: '#808A93'
        },
        picture: {
            valid: true,
            text: '',
            color: '#021526',
            border: '#808A93'
        },
        agentId: {
            valid: false,
            text: 'აირჩიეთ აგენტი',
            border: '#808A93'
        }
    });

    watch(address, (newAddress) => {
        if (newAddress.trim().length === 0) {
            fields.value.address.valid = false;
            fields.value.address.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.address.color = '#021526';
            fields.value.address.border = '#808A93'
        } else if (newAddress.trim().length < 2) {
            fields.value.address.valid = false;
            fields.value.address.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.address.color = '#F93B1D';
            fields.value.address.border = '#F93B1D'
        } else {
            fields.value.address.valid = true;
            fields.value.address.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.address.color = '#45A849';
            fields.value.address.border = '#808A93'
        }
    });

    watch(zipCode, (newZipCode) => {
        const zipCodePattern = /^\d+$/;
        if (newZipCode.trim().length === 0) {
            fields.value.zipCode.valid = false;
            fields.value.zipCode.text = 'მხოლოდ რიცხვები';
            fields.value.zipCode.color = '#021526';
            fields.value.zipCode.border = '#808A93'
        } else if (!zipCodePattern.test(newZipCode.trim())) {
            fields.value.zipCode.valid = false;
            fields.value.zipCode.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.zipCode.color = '#F93B1D';
            fields.value.zipCode.border = '#F93B1D'
        } else {
            fields.value.zipCode.valid = true;
            fields.value.zipCode.text = 'მხოლოდ რიცხვები';
            fields.value.zipCode.color = '#45A849'
            fields.value.zipCode.border = '#808A93'
        }
    });

    watch(price, (newPrice) => {
        const pricePattern = /^\d+$/;
        if (newPrice.trim().length === 0) {
            fields.value.price.valid = false;
            fields.value.price.text = 'მხოლოდ რიცხვები';
            fields.value.price.color = '#021526';
            fields.value.price.border = '#808A93'
        } else if (!pricePattern.test(newPrice.trim())) {
            fields.value.price.valid = false;
            fields.value.price.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.price.color = '#F93B1D';
            fields.value.price.border = '#F93B1D'
        } else {
            fields.value.price.valid = true;
            fields.value.price.text = 'მხოლოდ რიცხვები';
            fields.value.price.color = '#45A849';
            fields.value.price.border = '#808A93'
        }
    });

    watch(area, (newArea) => {
        const areaPattern = /^\d+$/;
        if (newArea.trim().length === 0) {
            fields.value.area.valid = false;
            fields.value.area.text = 'მხოლოდ რიცხვები';
            fields.value.area.color = '#021526';
            fields.value.area.border = '#808A93'
        } else if (!areaPattern.test(newArea.trim())) {
            fields.value.area.valid = false;
            fields.value.area.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.area.color = '#F93B1D';
            fields.value.area.border = '#F93B1D'
        } else {
            fields.value.area.valid = true;
            fields.value.area.text = 'მხოლოდ რიცხვები';
            fields.value.area.color = '#45A849';
            fields.value.area.border = '#808A93'
        }
    });

    watch(bedrooms, (newBedrooms) => {
        const bedroomsPattern = /^\d+$/;
        if (newBedrooms.trim().length === 0) {
            fields.value.bedrooms.valid = false;
            fields.value.bedrooms.text = 'მხოლოდ რიცხვები';
            fields.value.bedrooms.color = '#021526';
            fields.value.bedrooms.border = '#808A93'
        } else if (!bedroomsPattern.test(newBedrooms.trim())) {
            fields.value.bedrooms.valid = false;
            fields.value.bedrooms.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.bedrooms.color = '#F93B1D';
            fields.value.bedrooms.border = '#F93B1D'
        } else {
            fields.value.bedrooms.valid = true;
            fields.value.bedrooms.text = 'მხოლოდ რიცხვები';
            fields.value.bedrooms.color = '#45A849';
            fields.value.bedrooms.border = '#808A93'
        }
    });

    watch(description, (newDescription) => {
        const descriptionPattern = /^([\u10A0-\u10FF]+\s+){4,}[\u10A0-\u10FF]+$/;
        if (newDescription.trim().length === 0) {
            fields.value.description.valid = false;
            fields.value.description.text = 'მინიმუმ ხუთი სიტყვა';
            fields.value.description.color = '#021526';
            fields.value.description.border = '#808A93'
        } else if (!descriptionPattern.test(newDescription.trim())) {
            fields.value.description.valid = false;
            fields.value.description.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.description.color = '#F93B1D';
            fields.value.description.border = '#F93B1D'
        } else {
            fields.value.description.valid = true;
            fields.value.description.text = 'მინიმუმ ხუთი სიტყვა';
            fields.value.description.color = '#45A849';
            fields.value.description.border = '#808A93'
        }
    });

    watch(regionId, (newRegionId) => {
        if (!newRegionId) {
            fields.value.regionId.valid = false;
            fields.value.regionId.text = 'აირჩიეთ რეგიონი';
            fields.value.regionId.border = '#F93B1D'
        } else {
            fields.value.regionId.valid = true;
            fields.value.regionId.text = '';
            fields.value.regionId.border = '#808A93'
        }
    });

    watch(cityId, (newCityId) => {
        if (!newCityId) {
            fields.value.cityId.valid = false;
            fields.value.cityId.text = 'აირჩიეთ ქალაქი';
            fields.value.cityId.border = '#F93B1D';
        } else {
            fields.value.cityId.valid = true;
            fields.value.cityId.text = '';
            fields.value.cityId.border = '#808A93'
        }
    });

    watch(agentId, (newAgentId) => {
        if (!newAgentId) {
            fields.value.agentId.valid = false;
            fields.value.agentId.text = 'აირჩიეთ აგენტი';
            fields.value.regionId.border = '#F93B1D'
        } else {
            fields.value.agentId.valid = true;
            fields.value.agentId.text = '';
            fields.value.agentId.border = '#808A93'
        }
    });

    const file = ref(null);
    const preview = ref();

    const trigger = () => file.value.click();

    const upload = (event) => {
        picture.value = event.target.files[0];
        preview.value = URL.createObjectURL(picture.value);
        fields.value.picture.text = '';
        fields.value.picture.border = '#808A93';
    };

    const remove = () => {
        file.value.value = null;
        preview.value = undefined;
        picture.value = undefined;
    };

    const validate = () => Object.keys(fields.value).every((key) => fields.value[key].valid)

    const create = async () => {
        for (const key in fields.value) {
            if (!fields.value[key].valid) {
                fields.value[key].color = '#F93B1D';
                fields.value[key].border = '#F93B1D';
            }
        }

        if (picture.value && validate()) {
            try {
                const data = new FormData();
                data.append('is_rental', isRental.value);
                data.append('address', address.value.trim());
                data.append('zip_code', zipCode.value.trim());
                data.append('region_id', regionId.value);
                data.append('city_id', cityId.value);
                data.append('price', price.value.trim());
                data.append('area', area.value.trim());
                data.append('bedrooms', bedrooms.value.trim());
                data.append('description', description.value.trim());
                data.append('image', picture.value);
                data.append('agent_id', agentId.value);

                await axios.post('real-estates', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                await router.push('/');

                fields.value.picture.text = 'განცხადება დაემატა წარმატებით!';
                fields.value.picture.color = '#45A849';
            } catch (error) {
                fields.value.picture.color = '#F93B1D';
                fields.value.picture.text = 'სერვერზე წარმოიშვა შეცდომა!';
            }
        } else {
            if (!picture.value) {
                fields.value.picture.color = '#F93B1D';
                fields.value.picture.border = '#F93B1D';
                fields.value.picture.text = 'ფოტო აუცილებელია!';
            }
        }
    };

    const getAgents = async () => {
        agents.value = await axios.get('agents').then(res => res.data);
    }

    return {
        isRental,
        address,
        zipCode,
        regionId,
        cityId,
        price,
        area,
        bedrooms,
        description,
        picture,
        agentId,
        fields,
        agents,
        file,
        preview,
        trigger,
        upload,
        remove,
        create,
        getAgents,
    };
}
