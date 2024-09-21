import {ref, watch} from 'vue';
import axios from "/src/interceptors/axios";

export default function useAgent() {
    const name = ref();
    const surname = ref();
    const email = ref();
    const phone = ref();
    const avatar = ref();

    const fields = ref({
        name: {valid: false, text: 'მინიმუმ ორი სიმბოლო', color: '#021526', border: '#808A93'},
        surname: {valid: false, text: 'მინიმუმ ორი სიმბოლო', color: '#021526', border: '#808A93'},
        email: {valid: false, text: 'გამოიყენეთ @redberry.ge ფოსტა', color: '#021526', border: '#808A93'},
        phone: {valid: false, text: 'მხოლოდ რიცხვები', color: '#021526', border: '#808A93'},
        avatar: {valid: true, text: '', color: '', border: '#808A93'}
    });

    watch(name, (newName) => {
        if (newName.length === 0) {
            fields.value.name = {...fields.value.name, valid: false, color: '#021526', border: '#808A93'};
        } else if (newName.length < 2) {
            fields.value.name = {
                ...fields.value.name,
                valid: false,
                text: 'ჩაწერეთ ვალიდური მონაცემები',
                color: '#F93B1D',
                border: '#F93B1D'
            };
        } else {
            fields.value.name = {...fields.value.name, valid: true, color: '#45A849'};
        }
    });

    watch(surname, (newSurname) => {
        if (newSurname.length === 0) {
            fields.value.surname = {...fields.value.surname, valid: false, color: '#021526', border: '#808A93'};
        } else if (newSurname.length < 2) {
            fields.value.surname = {
                ...fields.value.surname,
                valid: false,
                text: 'ჩაწერეთ ვალიდური მონაცემები',
                color: '#F93B1D',
                border: '#F93B1D'
            };
        } else {
            fields.value.surname = {...fields.value.surname, valid: true, color: '#45A849'};
        }
    });

    watch(email, (newEmail) => {
        const emailPattern = /^\S+@redberry\.ge$/;
        if (newEmail.length === 0) {
            fields.value.email = {...fields.value.email, valid: false, color: '#021526', border: '#808A93'};
        } else if (!emailPattern.test(newEmail)) {
            fields.value.email = {
                ...fields.value.email,
                valid: false,
                text: 'ჩაწერეთ ვალიდური მონაცემები',
                color: '#F93B1D',
                border: '#F93B1D'
            };
        } else {
            fields.value.email = {...fields.value.email, valid: true, color: '#45A849'};
        }
    });

    watch(phone, (newPhone) => {
        const phonePattern = /^5\d{8}$/;
        if (newPhone.length === 0) {
            fields.value.phone = {...fields.value.phone, valid: false, color: '#021526', border: '#808A93'};
        } else if (!phonePattern.test(newPhone)) {
            fields.value.phone = {
                ...fields.value.phone,
                valid: false,
                text: newPhone.length === 9 ? 'ფორმატი 5XXXXXXXX' : 'ჩაწერეთ ვალიდური მონაცემები',
                color: '#F93B1D',
                border: '#F93B1D'
            };
        } else {
            fields.value.phone = {...fields.value.phone, valid: true, color: '#45A849'};
        }
    });

    const file = ref(null);
    const preview = ref();
    const trigger = () => file.value.click();
    const upload = (event) => {
        avatar.value = event.target.files[0];
        preview.value = URL.createObjectURL(avatar.value);
        fields.value.avatar = {...fields.value.avatar, text: '', border: '#808A93'};
    };

    const remove = () => {
        file.value.value = null;
        preview.value = undefined;
        avatar.value = undefined;
    };

    const validate = () => Object.keys(fields.value).every((key) => fields.value[key].valid);

    const create = async () => {
        for (const key in fields.value) {
            if (!fields.value[key].valid) {
                fields.value[key].color = '#F93B1D';
                fields.value[key].border = '#F93B1D';
            }
        }

        if (avatar.value && validate()) {
            try {
                const data = new FormData();
                data.append('name', name.value);
                data.append('surname', surname.value);
                data.append('email', email.value);
                data.append('phone', phone.value);
                data.append('avatar', avatar.value);

                await axios.post('agents', data, {headers: {'Content-Type': 'multipart/form-data'}});
                fields.value.avatar = {...fields.value.avatar, text: 'აგენტი დაემატა წარმატებით!', color: '#45A849'};
            } catch (error) {
                fields.value.avatar = {...fields.value.avatar, text: 'სერვერზე წარმოიშვა შეცდომა!', color: '#F93B1D'};
            }
        } else {
            if (!avatar.value) {
                fields.value.avatar = {
                    ...fields.value.avatar,
                    text: 'ფოტო აუცილებელია!',
                    color: '#F93B1D',
                    border: '#F93B1D'
                };
            }
        }
    };

    return {name, surname, email, phone, avatar, fields, file, preview, trigger, upload, remove, create};
}

