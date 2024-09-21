/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            padding: {
                'g': '162px'
            }
        },
        colors: {
            'white': '#ffffff',


            'bd_cl_0': '#DBDBDB',
            'bd_cl_1': '#808A93',
            'tx_cl_0': '#021526',
            'bg_btn_0': '#F3F3F3',
            'cl_main': '#F93B1D',
            'cl_main_h': '#DF3014'
        },
    },
    plugins: [],
}

