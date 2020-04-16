<template>
    <div v-if="isLogin">
        <web-header v-show="viewMode === 'nav'" ref="header" class="header"></web-header>
        <panel-shrink :span="3" :menu-style="menuStyle" :show-shrink="leftOpen">
            <left-menu v-show="viewMode === 'nav'"
                       ref="left" slot="left"
                       @menu-search="menuSearch=true" class="left-menu"></left-menu>
            <!-- nav-tabs 侧边菜单项 -->
            <nav-tabs @trigger="trigger"
                      @dbtrigger="dbtrigger"
                      @click-open-close="click_open_close"
                      slot="right"
                      class="nav-tabs"></nav-tabs>
            <menu-search slot="other" v-model="menuSearch"></menu-search>
            <chat-message v-model="chatMessage"></chat-message>
        </panel-shrink>
        <!--<web-footer v-show="viewMode === 'nav'" class="footer"></web-footer>-->
        <pop-up-windows></pop-up-windows>
    </div>
    <div v-else>
        <change-password v-model="passwordDialog"
                         :username="username"
                         :is-first="isFirst"></change-password>
    </div>
</template>
<style lang="stylus">
    .ddd {
        transition
    }
</style>
<script>
    import leftMenu from './view/left-menu.vue';
    import colleague from './components/colleague.vue';
    import webHeader from './view/header.vue';
    import webMainer from './view/mainer.vue';
    import navTabs from './view/nav-tabs.vue';
    import panelShrink from './components/panel-shrink.vue';
    import {api_login_info,api_menus, api_permission, api_menu_permission} from './api/user';

    import {mapGetters, mapActions} from 'vuex';
    import mouseKey from './lib/mouse-key';

    export default {
        data() {
            return {
                isLogin:false,
                menuSearch: false,
                chatMessage: false,
                menuStyle: {
                    transition: 'all .3s',
                    width: '178px',
                },
                showShrink: true,
                passwordDialog: false,
                username: '',
                isFirst: ''
            };
        },
        created() {
            console.log(this.pwd,'pwd');
            let data = window.sessionStorage.getItem('resetData');
            let needChange = false;
            if(JSON.parse(data)){
                data =  JSON.parse(data);
                needChange = Object.keys(data).length>0;
            }
            this.$addHook('loginSuccess', this.loginSuccess);
            if(!this.auth){
                return this.$router.replace('/login');
            }
            api_login_info().then(res =>{
                if(res.is_first === 0||needChange){
                    this.mustModifyPassword(res);
                }else{
                    this.isLogin = true;
                    this.$triggerHook('loginSuccess');
//                        res.lang = res.lang || 'zh';
//                        loadLanguageAsync(res.lang);
                    this.set_info(res);
                    this.initState({userId: res.user_id});
                }
            }).catch(fail =>{
                return this.$router.replace('/login');
            })
        },
        mounted() {
            mouseKey('ctrl+s', (e) => {
                this.menuSearch = true;
                e.stopPropagation();
                return false;
            });
            // window.onpopstate = window.onhashchange = (event) =>{
            //     console.log(event);
            // }
        },
        computed: {
            ...mapGetters({
                viewMode: 'ui/viewMode',
                isLoginState: 'user/loginState',
                auth: 'user/auth',
                'headerMaps': 'menu-nav/headerMaps',
                'leftOpen': 'menu-nav/leftOpen',
                pwd:'confirm-reset/pwd'
            })
        },
        components: {
            leftMenu,
            webHeader,
            webMainer,
            colleague,
            panelShrink,
            navTabs,
            menuSearch: require('./view/menu-search.vue').default,
            chatMessage: require('./view/chat-message/dialog.vue').default,
            fullView: require('./full-view.vue').default,
            popUpWindows: require('./view/virtual-rules/pop-up-windows').default,
            changePassword: require('@/components/change-password').default
        },
        methods: {
            ...mapActions({
                set_info: 'user/set_info',
                menuload: 'menu-nav/load',
                permissionload: 'permission/load',
                permissionLoadNewMenu: 'permission/loadNewMenu',
                nav_cast: 'menu-nav/nav_cast',
                initState: 'menu-nav/initState',
                openCloseLeftMenu: 'menu-nav/openCloseLeftMenu',
            }),
            mustModifyPassword(res){
                this.$confirm('为了您的账号安全, 请修改您的原始密码!', '提示', {
                    confirmButtonText: '前往修改',
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    this.passwordDialog = true;
                    this.username = res.username;
                    this.isFirst = 0
                }).catch(() => {
                    this.passwordDialog = true;
                    this.username = res.username;
                    this.isFirst = 0
                });
            },
            loginSuccess(){
                let lang = sessionStorage.getItem('lang');
                this.$http(api_menus,{lang:lang}).then(list => {
                    this.menuload(list);
                }).catch(code => {
                });
                this.$http(api_permission).then(permission => {
                    this.permissionload(permission);
                });

                /** 新加入新的权限设置menu的id */
                this.$http(api_menu_permission).then(permissionNew => {
                     this.permissionLoadNewMenu(permissionNew);
                });

                let path = url('path');
                let query = url('query') || '';
                query = query === '' ? '' : `?${query}`;
                let router = path + query;
                if (!router) {
                    router = '/dashboard';
                }
                this.$open(router);
            },
            trigger(id) {
                this.$refs.header.goswitcher(this.headerMaps[id]);
                this.$nextTick(() => {
                    if (this.$refs.left) {
                        this.$refs.left.goswitcher(id);
                    }
                });
            },
            dbtrigger() {
                this.menuStyle.width = "0";
                this.openCloseLeftMenu(false);
            },
            click_open_close() {
                this.menuStyle.width = this.leftOpen ? "178px" : "0";
            },
        }
    }
</script>
