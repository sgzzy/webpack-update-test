import {getItem, setItem} from '@/lib/localStorage';

export default {
    namespaced: true,
    state: {
        info: getItem('user-info', {}),
        auth: getItem('Authorization', ''),
        loginState:false,
    },
    mutations: {
        set_info(state, info) {
            state.info = info;
            setItem('user-info', info);
        },
        auth(state, auth){
            state.auth = auth;
            setItem('Authorization', auth);
        },
        loginState({commit}, loginState){
            state.loginState = loginState;
        }
    },
    actions: {
        set_info({commit}, info) {
            commit('set_info', info);
        },
        auth({commit}, auth){
            commit('auth', auth);
        },
        loginState({commit}, loginState){
            commit('loginState', loginState);
        }
    },
    getters: {
        info: state => state.info,
        username: state => state.info.username,
        loginState: state => state.loginState,
        auth: state => state.auth,
    }
};
