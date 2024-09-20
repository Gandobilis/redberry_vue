const routes = [
    {
        path: "/",
        component: () => import("/src/Views/HomeView.vue"),
    },
    {
        path: "/create-listing",
        component: () => import("/src/Views/CreateListing.vue"),
    },
];

export default routes;