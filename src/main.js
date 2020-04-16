import Vue from 'vue';
import App from './App.vue';

import vrouter from './router';
import store from './vuex';
// import store from './vuex';

// import i18n from './i18n';

import '@/lib/auth.js'


new Vue({
    el: '#app',
    router: vrouter, store,
    render: h => h(App)
});
