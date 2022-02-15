import "./legacy";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { GlobalEvents } from "vue-global-events";
import { install as RipeComponentsVue, ripeMixin } from "ripe-components-vue";
import { API as RipeIdAPI } from "ripe-id-api";
import { RipeAPI } from "ripe-sdk";
import { Home, Field } from "../vue";

import "../css/layout.css";

import "../res/images/favicon.png";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: Home, meta: { transition: "fade-full" } },
        { path: "/field", name: "field", component: Field, meta: { transition: "fade-full" } }
    ],
    scrollBehavior: function() {
        return { left: 0, top: 0 };
    }
});

export const init = async function() {
    console.info(RipeIdAPI);
    console.info(RipeAPI);

    const app = createApp({});
    app.use(router);
    app.use(ripeMixin);
    app.use(RipeComponentsVue);

    // eslint-disable-next-line vue/component-definition-name-casing
    app.component("GlobalEvents", GlobalEvents);

    router.isReady().then(() => app.mount("#app"));
    return app;
};

export default init;
