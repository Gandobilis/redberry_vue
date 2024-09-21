const routes = [
    {
        path: "/",
        component: () => import("/src/views/HomeView.vue"),
    },
    {
        path: "/create-listing",
        component: () => import("/src/views/CreateListing.vue"),
    },
    {
        path: "/listings/:id",
        component: () => import("/src/components/Listing.vue"),
    },
];

export default routes;