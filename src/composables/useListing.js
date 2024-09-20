import {ref, watch} from 'vue';
import axios from "/src/interceptors/axios";

export default function useListing() {
    const isRental = ref();
    const address = ref();
    const postalIndex = ref();
    const price = ref();
    const area = ref();
    const bedrooms = ref();
    const description = ref();
    const agents = ref([])
    const agent = ref('აირჩიეთ აგენტი')

    const fields = ref({
        address: {
            valid: false,
            text: 'მინიმუმ ორი სიმბოლო',
            color: '#021526'
        },
        postalIndex: {
            valid: false,
            text: 'მინიმუმ ორი სიმბოლო',
            color: '#021526'
        },
        price: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526'
        },
        area: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526'
        },
        bedrooms: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526'
        },
        description: {
            valid: false,
            text: 'მინიმუმ ხუთი სიტყვა',
            color: '#021526'
        },
        image: {
            text: '',
            color: ''
        }
    });

    watch(address, (newAddress) => {
        if (newAddress.length === 0) {
            fields.value.address.valid = false;
            fields.value.address.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.address.color = '#021526';
        } else if (newAddress.length < 2) {
            fields.value.address.valid = false;
            fields.value.address.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.address.color = '#F93B1D';
        } else {
            fields.value.address.valid = true;
            fields.value.address.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.address.color = '#45A849';
        }
    });

    watch(postalIndex, (newPostalIndex) => {
        const postalIndexPattern = /^\d+$/;
        if (newPostalIndex.length === 0) {
            fields.value.postalIndex.valid = false;
            fields.value.postalIndex.text = 'მხოლოდ რიცხვები';
            fields.value.postalIndex.color = '#021526';
        } else if (!postalIndexPattern.test(newPostalIndex)) {
            fields.value.postalIndex.valid = false;
            fields.value.postalIndex.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.postalIndex.color = '#F93B1D';
        } else {
            fields.value.postalIndex.valid = true;
            fields.value.postalIndex.text = 'მხოლოდ რიცხვები';
            fields.value.postalIndex.color = '#45A849';
        }
    });

    watch(price, (newPrice) => {
        const pricePattern = /^\d+$/;
        if (newPrice.length === 0) {
            fields.value.price.valid = false;
            fields.value.price.text = 'მხოლოდ რიცხვები';
            fields.value.price.color = '#021526';
        } else if (!pricePattern.test(newPrice)) {
            fields.value.price.valid = false;
            fields.value.price.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.price.color = '#F93B1D';
        } else {
            fields.value.price.valid = true;
            fields.value.price.text = 'მხოლოდ რიცხვები';
            fields.value.price.color = '#45A849';
        }
    });

    watch(area, (newArea) => {
        const areaPattern = /^\d+$/;
        if (newArea.length === 0) {
            fields.value.area.valid = false;
            fields.value.area.text = 'მხოლოდ რიცხვები';
            fields.value.area.color = '#021526';
        } else if (!areaPattern.test(newArea)) {
            fields.value.area.valid = false;
            fields.value.area.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.area.color = '#F93B1D';
        } else {
            fields.value.area.valid = true;
            fields.value.area.text = 'მხოლოდ რიცხვები';
            fields.value.area.color = '#45A849';
        }
    });

    watch(bedrooms, (newBedrooms) => {
        const bedroomsPattern = /^\d+$/;
        if (newBedrooms.length === 0) {
            fields.value.bedrooms.valid = false;
            fields.value.bedrooms.text = 'მხოლოდ რიცხვები';
            fields.value.bedrooms.color = '#021526';
        } else if (!bedroomsPattern.test(newBedrooms)) {
            fields.value.bedrooms.valid = false;
            fields.value.bedrooms.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.bedrooms.color = '#F93B1D';
        } else {
            fields.value.bedrooms.valid = true;
            fields.value.bedrooms.text = 'მხოლოდ რიცხვები';
            fields.value.bedrooms.color = '#45A849';
        }
    });

    watch(description, (newDesc) => {
        const descriptionPattern = /^([\u10A0-\u10FF]+\s+){4,}[\u10A0-\u10FF]+$/;
        if (newDesc.length === 0) {
            fields.value.description.valid = false;
            fields.value.description.text = 'მხოლოდ რიცხვები';
            fields.value.description.color = '#021526';
        } else if (!descriptionPattern.test(newDesc)) {
            fields.value.description.valid = false;
            fields.value.description.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.description.color = '#F93B1D';
        } else {
            fields.value.description.valid = true;
            fields.value.description.text = 'მხოლოდ რიცხვები';
            fields.value.description.color = '#45A849';
        }
    });


    const image = ref();
    const file = ref(null);
    const preview = ref();

    const trigger = () => file.value.click();

    const upload = (event) => {
        image.value = event.target.files[0];
        preview.value = URL.createObjectURL(image.value);
    };

    const remove = () => {
        file.value.value = null;
        preview.value = undefined;
        image.value = undefined;
    };

    const validate = () => Object.keys(fields.value).some((key) => !fields.value[key].valid)

    const create = async () => {
        for (const key in fields.value) {
            if (!fields.value[key].valid && (key === 'description' || key === 'address' || key === 'postalIndex')) {
                fields.value[key].color = '#F93B1D';
            }
        }

        if (image.value && validate()) {
            try {
                const data = new FormData();
                data.append('is_rental', isRental.value);
                data.append('address', address.value);
                data.append('postalIndex', postalIndex.value);
                data.append('price', price.value);
                data.append('area', area.value);
                data.append('bedrooms', bedrooms.value);
                data.append('description', description.value);
                data.append('image', image.value);

                await axios.post('listings', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                fields.value.image.text = 'განცხადება დაემატა წარმატებით!';
                fields.value.image.color = '#45A849';
            } catch (error) {
                fields.value.image.color = '#F93B1D';
                fields.value.image.text = 'სერვერზე წარმოიშვა შეცდომა!';
            }
        } else {
            fields.value.image.color = '#F93B1D';
            fields.value.image.text = 'ფოტო აუცილებელია!';
        }
    };

    const getAgents = async () => {
        agents.value = await axios.get('agents').then(res => res.data);
    }

    return {
        isRental,
        address,
        postalIndex,
        price,
        area,
        bedrooms,
        description,
        fields,
        image,
        file,
        preview,
        getAgents,
        agents,
        agent,
        trigger,
        upload,
        remove,
        create
    };
}
