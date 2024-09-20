const routes = [
    {
        path: "/",
        component: () => import("../Views/HomeView.vue"),
    },
    {
        path: "/create-listing",
        component: () => import("../Views/CreateListing.vue"),
    },
];

export default routes;