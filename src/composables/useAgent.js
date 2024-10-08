import {ref, watch} from 'vue';
import axios from "/src/interceptors/axios";

export default function useAgent() {
    const name = ref();
    const surname = ref();
    const email = ref();
    const phone = ref();
    const avatar = ref();

    const fields = ref({
        name: {
            valid: false,
            text: 'მინიმუმ ორი სიმბოლო',
            color: '#021526',
            border: '#808A93'
        },
        surname: {
            valid: false,
            text: 'მინიმუმ ორი სიმბოლო',
            color: '#021526',
            border: '#808A93'
        },
        email: {
            valid: false,
            text: 'გამოიყენეთ @redberry.ge ფოსტა',
            color: '#021526',
            border: '#808A93'
        },
        phone: {
            valid: false,
            text: 'მხოლოდ რიცხვები',
            color: '#021526',
            border: '#808A93'
        },
        avatar: {
            valid: true,
            text: '',
            color: '',
            border: '#808A93'
        }
    });

    watch(name, (newName) => {
        if (newName.trim().length === 0) {
            fields.value.name.valid = false;
            fields.value.name.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.name.color = '#021526';
            fields.value.name.border = '#808A93'
        } else if (newName.trim().length < 2) {
            fields.value.name.valid = false;
            fields.value.name.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.name.color = '#F93B1D';
            fields.value.name.border = '#F93B1D'
        } else {
            fields.value.name.valid = true;
            fields.value.name.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.name.color = '#45A849';
            fields.value.name.border = '#808A93'
        }
    });

    watch(surname, (newSurname) => {
        if (newSurname.trim().length === 0) {
            fields.value.surname.valid = false;
            fields.value.surname.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.surname.color = '#021526';
            fields.value.surname.border = '#808A93'
        } else if (newSurname.trim().length < 2) {
            fields.value.surname.valid = false;
            fields.value.surname.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.surname.color = '#F93B1D';
            fields.value.surname.border = '#F93B1D';
        } else {
            fields.value.surname.valid = true;
            fields.value.surname.text = 'მინიმუმ ორი სიმბოლო';
            fields.value.surname.color = '#45A849';
            fields.value.surname.border = '#808A93'
        }
    });

    watch(email, (newEmail) => {
        const emailPattern = /^\S+@redberry\.ge$/;
        if (newEmail.trim().length === 0) {
            fields.value.email.valid = false;
            fields.value.email.text = 'გამოიყენეთ @redberry.ge ფოსტა';
            fields.value.email.color = '#021526';
            fields.value.email.border = '#808A93'
        } else if (!emailPattern.test(newEmail.trim())) {
            fields.value.email.valid = false;
            fields.value.email.text = 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.email.color = '#F93B1D';
            fields.value.email.border = '#F93B1D'
        } else {
            fields.value.email.valid = true;
            fields.value.email.text = 'გამოიყენეთ @redberry.ge ფოსტა';
            fields.value.email.color = '#45A849';
            fields.value.email.border = '#808A93'
        }
    });

    watch(phone, (newPhone) => {
        const phonePattern = /^5\d{8}$/;
        if (newPhone.trim().length === 0) {
            fields.value.phone.valid = false;
            fields.value.phone.text = 'მხოლოდ რიცხვები';
            fields.value.phone.color = '#021526';
            fields.value.phone.border = '#808A93'
        } else if (!phonePattern.test(newPhone.trim())) {
            fields.value.phone.valid = false;
            fields.value.phone.text = newPhone.length === 9 ? 'ფორმატი 5XXXXXXXX' : 'ჩაწერეთ ვალიდური მონაცემები';
            fields.value.phone.color = '#F93B1D';
            fields.value.phone.border = '#F93B1D'
        } else {
            fields.value.phone.valid = true;
            fields.value.phone.text = 'მხოლოდ რიცხვები';
            fields.value.phone.color = '#45A849';
            fields.value.phone.border = '#808A93'
        }
    });

    const file = ref(null);
    const preview = ref();

    const trigger = () => file.value.click();

    const upload = (event) => {
        avatar.value = event.target.files[0];
        preview.value = URL.createObjectURL(avatar.value);
        fields.value.avatar.text = '';
        fields.value.avatar.border = '#808A93';
    };

    const remove = () => {
        file.value.value = null;
        preview.value = undefined;
        avatar.value = undefined;
    };

    const validate = () => Object.keys(fields.value).every((key) => fields.value[key].valid)

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
                data.append('name', name.value.trim());
                data.append('surname', surname.value.trim());
                data.append('email', email.value.trim());
                data.append('phone', phone.value.trim());
                data.append('avatar', avatar.value);

                await axios.post('agents', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                fields.value.avatar.text = 'აგენტი დაემატა წარმატებით!';
                fields.value.avatar.color = '#45A849';

                return true;
            } catch (error) {
                fields.value.avatar.color = '#F93B1D';
                fields.value.avatar.text = 'სერვერზე წარმოიშვა შეცდომა!';
                return false;
            }
        } else {
            if (!avatar.value) {
                fields.value.avatar.color = '#F93B1D';
                fields.value.avatar.border = '#F93B1D';
                fields.value.avatar.text = 'ფოტო აუცილებელია!';
            }
            return false;
        }
    };

    return {
        name,
        surname,
        email,
        phone,
        avatar,
        fields,
        file,
        preview,
        trigger,
        upload,
        remove,
        create
    };
}
