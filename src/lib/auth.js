
/**
 * 没有登录信息执行fail，有至执行succ
 */
export const auth = function(){
    return new Promise((succ,fail) =>{
        if(!!window.sessionStorage.getItem('Authorization')){
            succ();
        }else{
            fail();
        }
    });
};

/**
 * 登出账号，移除登录信息
 */
export const quit = function(){
    window.sessionStorage.removeItem('Authorization');
};

/**
 * 获取登录信息
 */
export const authorization = function(){
    return window.sessionStorage.getItem('Authorization') || "";
};

/**
 * 存储登录信息
 * @param {*} auth 
 */
export const set_authorization = function(auth){
    window.sessionStorage.setItem('Authorization', auth);
};

/**
 * 一个长时间轮询等待登录信息过程，直到获取到登录信息才执行下一步
 */
export const make_auth = function(){
    let timer = null;
    return new Promise((succ,fail)=>{
        function is_auth(){
            return !!window.sessionStorage.getItem('Authorization')
        }
        if(is_auth()){
            succ();
        }else{
            let doo = ()=>{
                if(is_auth()){
                    clearInterval(timer);
                    succ();
                }
            };
            timer = setInterval(doo,100);
        }
    });
};
