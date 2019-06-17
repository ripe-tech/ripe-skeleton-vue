import "./legacy";

import Vue from "vue";
import VueRouter from "vue-router";
import GlobalEvents from "vue-global-events";
import { install as RipeComponentsVue, ripeMixin } from "ripe-components-vue";
import { API as RipeIdAPI } from "ripe-id-api";
import { RipeAPI } from "ripe-sdk";
import { Home } from "../vue";

import "../css/layout.css";

import "../res/images/favicon.png";

const router = new VueRouter({
    mode: "history",
    routes: [{ path: "/", name: "home", component: Home, meta: { transition: "fade-full" } }],
    scrollBehavior: function() {
        return new Promise(resolve =>
            this.app.$root.$once("router-transition-leave", () => resolve({ x: 0, y: 0 }))
        );
    }
});

export const init = async function() {
    Vue.use(VueRouter);
    Vue.use(RipeComponentsVue);
    Vue.component("global-events", GlobalEvents);

    Vue.prototype.$bus = new Vue();

    console.info(RipeIdAPI);
    console.info(RipeAPI);

    const app = new Vue({
        mixins: [ripeMixin],
        router: router,
        methods: {
            routerTransitionLeave() {
                this.$root.$emit("router-transition-leave");
            }
        }
    });
    app.$mount("#app");
    return app;
};

export default init;
