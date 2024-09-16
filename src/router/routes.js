const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../Views/HomeView.vue"),
    },
];

export default routes;