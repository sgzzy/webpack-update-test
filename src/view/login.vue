<template>
  <div class="login">
    <div class="mask"></div>
    <div class="content-login">
      <el-row :gutter="8">
        <el-col :span="12">
          <div class="slogan"></div>
        </el-col>
        <el-col :span="12">
          <div class="fr">
            <div class="border-login">
              <div class="login-title">ERP登录系统</div>
              <!--box内容-->
              <div v-if="!isForget">
                <!--登录-->
                <div class="login-body">
                  <div class="input-data user-icon">
                    <input
                      class="input-box"
                      type="text"
                      v-model="account"
                      ref="username"
                      placeholder="请输入账号"
                    />
                  </div>
                  <div class="input-data password-icon">
                    <input class="input-box" type="password" v-model="password" placeholder="请输入密码" />
                  </div>
                  <div class="input-data verification-icon imgInputVerification">
                    <input
                      class="input-box auth tl"
                      v-model="authcode"
                      @keyup.enter="enter"
                      placeholder="请输入验证码"
                    />
                    <img class="auth-code" @click="refresh_authcode" :src="authCode" />
                  </div>
                  <div class="mt-sm">
                    <el-checkbox class="fl" v-model="checkEnglish">English</el-checkbox>
                  </div>
                </div>
                <div class="sign-in" @click="login">登录</div>
                <div class="fr operate-color font-13" @click="forget_password">>>忘记密码？</div>
              </div>
              <!--重置密码-->
              <div v-else>
                <div class="login-body">
                  <div class="input-data user-icon">
                    <input
                      class="input-box"
                      type="text"
                      v-model="account"
                      ref="username"
                      placeholder="请输入账号"
                    />
                  </div>
                  <div class="input-data v-code">
                    <input
                      class="input-box"
                      type="text"
                      v-model="verificationCode"
                      placeholder="请输入验证码"
                    />
                    <el-button
                      type="primary"
                      size="mini"
                      class="location-btn"
                      @click.native="get_ding_code"
                    >{{btnTittle}}</el-button>
                  </div>
                  <div class="fr pointer red undefine-hover" @click="regain">未收到?重新获取验证码</div>
                </div>
                <div class="sign-in" @click="confirm_reset">确认重置</div>
                <div class="operate-color font-13 t-left mb-sm" @click="cancel_reset"><< 返回登录</div>
                <div
                  style="color:#999;text-align: left;"
                >说明：系统将发送4位数字的验证码至用户对应的钉钉，输入相应的验证码即可重置ERP登录密码。</div>
              </div>
            </div>
            <div class="company-name-ip">
              <span class="c-name-company">Copyright ©2017 深圳市利朗达科技有限公司 |</span>
              <span class="c-name-company ip-link" @click="ip_link">粤ICP备11021897号-1</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="stylus">
.login {
  height: 100%;
  max-width: 100%;
  background: url('../../static/bj.jpg') no-repeat;
  background-size: cover;
  background-position: bottom center;
  font-family: '微软雅黑', Consolas, Monaco, monospace;

  .mask {
    position: absolute;
    top: 60px;
    left: 60px;
    width: 160px;
    height: 55px;
    background: url('../assets/logo-2019-1-4-2.png') no-repeat center;
    background-size: cover;
    z-index: 555;
  }

  .content-login {
    position: absolute;
    top: 18%;
    left: 48%;
    height: 600px;
    width: 1200px;
    margin-left: -600px;
    z-index: 9999;

    .slogan {
      margin-top: 15%;

      h1 {
        font: normal 400% '微软雅黑', Consolas, Monaco, monospace;
        color: #fff;
      }

      @keyframes type {
        from {
          width: 0;
        }

        to {
          width: 250px;
        }
      }

      @keyframes type {
        from {
          width: 0;
        }

        to {
          width: 250px;
        }
      }
    }
  }

  .company-name {
    margin-top: 20px;
    font-size: 18px;
    color: #E5E6E9;
    width: 437px;
    text-align: center;
  }

  .company-name-ip {
    box-sizing: border-box;
    margin-top: 20px;
    font-size: 18px !important;
    color: #E5E6E9;
    width: 415px;
    text-align: center;

    .c-name-company {
      font-size: 13px;
      display: inline-block;
    }

    .ip-link {
      &:hover {
        color: #91EB55;
        cursor: pointer;
      }
    }
  }

  .border-login {
    box-sizing: border-box;
    width: 415px;
    text-align: center;
    padding: 44px;
    background: #fff;
    border-radius: 5px;

    .login-title {
      font-size: 25px;
      font-family: '微软雅黑', Consolas, Monaco, monospace;
      color: #00acac;
      position: relative;

      &:before, &:after {
        content: ''; /* CSS伪类用法 */
        position: absolute; /* 定位背景横线的位置 */
        top: 52%;
        background: #00acac; /* 宽和高做出来的背景横线 */
        width: 15%;
        height: 2px;
      }

      &:before {
        left: 8%; /* 调整背景横线的左右距离 */
      }

      &:after {
        right: 8%;
      }
    }

    .sign-in {
      margin-top: 65px;
      height: 67px;
      line-height: 50px;
      width: 100%;
      background: url('../assets/sign-in-icon.png') no-repeat;
      background-size: cover;
      background-position: center;
      text-align: center;
      font-size: 25px;
      color: #fff;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: url('../assets/sign-in-icon-active.png') no-repeat;
        background-size: cover;
        background-position: center;
      }

      &:active {
        background: url('../assets/sign-in-icon-active.png') no-repeat;
        background-size: cover;
        background-position: center;
      }
    }

    .login-body {
      width: 100%;
      margin-top: 30px;

      .input-data {
        box-sizing: border-box;
        width: 100%;
        height: 48px;
        margin-top: 45px;
        border-bottom: 2px solid #d1d1d1;
        padding-left: 48px;
        position: relative;

        &.v-code {
          padding-left: 0;
          padding-right: 105px;
        }

        &.user-icon {
          background: url('../assets/user-new.png') no-repeat;
          background-size: 25px;
          background-position: 10px 8px;
        }

        &.password-icon {
          background: url('../assets/password-new.png') no-repeat;
          background-size: 25px;
          background-position: 10px 8px;
        }

        &.verification-icon {
          background: url('../assets/verification-new.png') no-repeat;
          background-size: 25px;
          background-position: 10px 8px;
        }

        .location-btn {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 105px;
        }

        .input-box {
          box-sizing: border-box;
          border: none;
          outline: none;
          width: 100%;
          line-height: 44px;
          color: #666;
          display: inline-block;
          font-size: 16px;
        }

        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #d1d1d1;
          font-size: 14px;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #d1d1d1;
          font-size: 14px;
        }

        input:-ms-input-placeholder {
          color: #d1d1d1;
          font-size: 14px;
        }

        input::-webkit-input-placeholder {
          color: #d1d1d1;
          font-size: 14px;
        }

        .auth {
          width: 115px;
          float: left;
        }

        .auth-code {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          float: right;
          height: 100%;
        }

        .btn {
          box-sizing: border-box;
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          padding: 0 22px;
          line-height: 1;
          background-color: #e4393c;
          color: #fff;
          opacity: 1;

          >span {
            font: bold 200% Consolas, Monaco, monospace;
          }

          &:active {
            color: #ddd;
          }
        }

        .inimg {
          width: 18px;
          height: 21px;
        }
      }

      .imgInputVerification {
        display: flex;
      }
    }

    .el-card__body {
      background: url('../assets/yem.jpg') no-repeat 0px 0px;
    }
  }
}
</style>
<script>
// import { login, api_user_captcha, api_reset_pwd } from "@/api/user";
import { mapActions } from "vuex";
let login = function() {
  return new Promise.resolve();
};
let api_user_captcha = function() {
  return new Promise.resolve();
};
let api_reset_pwd = function() {
  return new Promise.resolve();
};

export default {
  data() {
    return {
      refreshDialog: false,
      account: "",
      password: "",
      authcode: "",
      authCode: "",
      captcha: "",
      islogin: true,
      random: 0,
      isShow: true,
      checkEnglish: "",
      remember: "",
      isForget: false,
      verificationCode: "",
      btnTittle: "获取钉钉验证码",
      timer: null,
      canGetdingCode: true,
      passwordDialog: false,
      pwdUsername: ""
    };
  },
  mounted() {
    this.refresh_authcode();
    this.$refs.username.focus();
  },
  methods: {
    ...mapActions({
      auth: "user/auth",
      set_state: "confirm-reset/set_state"
    }),
    regain() {
      this.stop_timer();
      this.canGetdingCode = true;
      this.btnTittle = "获取钉钉验证码";
      this.get_ding_code();
    },
    get_ding_code() {
      if (!this.account) return;
      // return this.$message({ type: "warning", message: "请输入账号！" });
      if (this.canGetdingCode) {
        this.canGetdingCode = false;
        this.count_down();
        this.user_captcha();
      }
    },
    user_captcha() {
      this.$http(api_user_captcha, { username: this.account })
        .then(res => {
          //   this.$message({ type: "success", message: res.message || res });
        })
        .catch(code => {
          this.btnTittle = "重新获取验证码";
          this.canGetdingCode = true;
          this.stop_timer();
          //   this.$message({ type: "error", message: code.message || code });
        });
    },
    count_down() {
      let start = 90;
      this.btnTittle = `${start}S`;
      this.timer = setInterval(() => {
        console.log("2");
        if (start > 0) {
          this.btnTittle = `${start--}S`;
        } else {
          this.btnTittle = "重新获取验证码";
          this.canGetdingCode = true;
          this.stop_timer();
        }
      }, 1000);
    },
    stop_timer() {
      clearInterval(this.timer);
    },
    login() {
      // this.refreshDialog = true;
      let lang = this.checkEnglish ? "en" : "zh";
      sessionStorage.setItem("lang", lang);
      this.$http(login, {
        username: this.account,
        password: this.password,
        code: this.authcode,
        captcha: this.captcha
        // token_expire:2,
      })
        .then(succ => {
          set_authorization(succ.token);
          this.auth(succ.token);
          this.$router.replace("/");
          loadLanguageAsync(lang);
          //                    this.$refs.canvas.animate = false;   登录页动画销毁
        })
        .catch(code => {
          this.refresh_authcode();
          //   this.$message({ type: "error", message: code.message || code });
        });
    },
    help() {
      this.islogin = false;
    },
    refresh_authcode() {
      fetch(`http://172.18.8.242/login/code`, {
        mode: "cors"
      }).then(res => {
        this.captcha = res.headers.get("Captcha");
        res.blob().then(myBlob => {
          this.authCode = URL.createObjectURL(myBlob);
        });
      });
    },
    enter() {
      this.login();
    },
    forget_password() {
      this.isForget = true;
    },
    cancel_reset() {
      this.isForget = false;
      this.btnTittle = "获取钉钉验证码";
      this.canGetdingCode = true;
      this.stop_timer();
    },
    confirm_reset() {
      if (!this.account) return;
      // return this.$message({ type: "warning", message: "请输入账号！" });
      if (!this.verificationCode) return;
      // return this.$message({ type: "warning", message: "请输入验证码！" });
      this.stop_timer();
      let params = {
        username: this.account,
        code: this.verificationCode
      };
      this.$http(api_reset_pwd, params)
        .then(res => {
          this.set_state(res);
          set_authorization(res.token);
          this.auth(res.token);
          this.$router.replace("/");
          window.sessionStorage.setItem("resetData", JSON.stringify(res));
        })
        .catch(code => {
          //   this.$message({ type: "error", message: code.message || code });
        });
    },
    ip_link() {
      window.open("http://www.beian.miit.gov.cn/");
    }
  },
  components: {}
};
</script>
