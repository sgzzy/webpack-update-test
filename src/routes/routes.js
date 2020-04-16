export default [{
    path: '/login',
    components: {
        default: function (resolve) {
            return resolve(require('./../view/login.vue').default);
        }
    }
}, ];
