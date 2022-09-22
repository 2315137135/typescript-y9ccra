import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {name: "main", path: "/", component: () => import("../pages/MainPage.vue")}
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
