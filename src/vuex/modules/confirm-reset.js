/**
 * Created by wuchuguang on 16-10-29.
 */
export default {
    namespaced: true,
    state: {
        username:'',
        pwd:'',
    },
    mutations: {
        set_state(state, obj) {
            state = obj;
        },
    },
    actions: {
        set_state({commit}, obj) {
            commit('set_state', obj);
        },
    },
    getters: {
        username: state => state.username,
        pwd:state => state.pwd,
    }
};
