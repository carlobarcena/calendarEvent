import Vue from "vue";
import VueRouter from "vue-router";

import Calendar from "../components/Calendar";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [
        { path: "/calendar/:year/:month", component: Calendar },
    ],
});