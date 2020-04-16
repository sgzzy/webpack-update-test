import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = require('./routes/routes').default;

window.routes = routes.map(route =>route.path);

let router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
