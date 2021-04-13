<template>
  <div class="login-page">
    <div class="brand"></div>
    <div class="ignore-login-content">
      <!-- <div class="title">欢迎登录</div> -->
      <div class="title">
        <div class="logo-text">
          <img src="../../assets/images/logo.png" height="32" alt />
          杰牌智能传动
        </div>
        <!-- <div class="info">杰牌</div> -->
        <div class="language-list">
          <a-dropdown overlayClassName="lang-menu">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-icon type="global" />
              Language
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" v-bind:class="{ active: locale === 'zh-cn' }" @click="setLang('zh-cn')">中文</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" v-bind:class="{ active: locale === 'en' }" @click="setLang('en')">English</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div class="login-form-box">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" class="login-form">
          <a-form-model-item prop="username" style="margin-bottom:10px;">
            <a-input size="large" v-model="form.username" placeholder="请输入邮箱">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password size="large" v-model="form.password" placeholder="请输入密码" @pressEnter="login">
              <a-icon slot="prefix" type="lock" />
            </a-input-password>
          </a-form-model-item>
          <div class="rember-pass">
            <a-checkbox v-model="form.remember">记住密码</a-checkbox>
          </div>
          <a-form-model-item>
            <a-button type="danger" block class="login-form-button" :loading="loading" @click="login">
              {{'login.form.login' }}
            </a-button>
          </a-form-model-item>
          <a-divider />
          <!-- <div class="clearfix">
            <a href="/reg">Register now!</a>
            <a class="login-form-forgot right" href>Forgot password</a>
          </div>-->
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'LoginPage',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        remember: false
      },
      errors: '',
      rules: Object.freeze({
        username: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      })
    };
  },
  computed: {
    ...mapGetters({
      loginData: 'user/loginData'
    })
  },
  mounted() {
    window.localStorage.removeItem('token');
    // 重现上次用户登录登信息
    if (this.loginData['remember']) {
      this.form = this.loginData;
    }
  },
  methods: {
    ...mapActions({
      clearAll: 'clearAll',
      storeLoginData: 'user/storeLoginData',
      storeUser: 'user/storeUser',
      storeToken: 'user/storeToken',
      storeAdminPath: 'user/storeAdminPath'
    }),
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    /**
     * login
     */
    login() {
      this.errors = null;
      // clearAll
      this.clearAll();
      // window.localStorage.removeItem('aiit_jie');
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.loading = true;
          const params = { email_or_username: this.form.username, password: this.form.password };
          this.$http
            .post('/auth/login', params)
            .then(res => {
              // console.log(res);
              const { data } = res;
              if (res['status'] === 200) {
                // 保存token
                const token = data['access_token'] || '';
                this.storeToken(token);
                // 缓存login表单
                this.storeLoginData(this.form);
                // 缓存user
                this.storeUser();
                // console.log('login success');
                // 拉取路由
                this.storeAdminPath();
                // // 路由跳转由app.vue接手，不在login页面处理，设置一定的延时，防止页面跳转废时太长
                // setTimeout(() => {
                //   // mock 跳转
                //   this.$router.push({ name: 'Home' });
                //   this.loading = false;
                // }, 500);
              } else {
                // if (data['code'] === 500) {
                //   this.errors.password = data['msg'];
                // } else {
                //   this.$message.error(data['msg']);
                // }

                this.loading = false;
              }
            })
            .catch(err => {
              // console.log('err', err.response.data);
              this.errors = err.response.data.message;

              this.loading = false;
            });
        }
        return false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.1) url(../../assets/images/login_bg.png) no-repeat center center;
  .brand {
    position: absolute;
    left: 150px;
    top: 30px;
    z-index: 9;
  }

  .ignore-login-content {
    width: 360px;
    // height: 335px;
    position: absolute;
    right: 18%;
    top: 28%;
    z-index: 9;
    border-radius: 3px;
    overflow: hidden;

    .title {
      line-height: 40px;
      font-size: 20px;
      padding-bottom: 20px;
      width: 100%;
      height: 150px;
      background: rgba(0, 0, 0, 0.1);
      font-weight: 100;
      color: #fff;
      position: relative;
      .logo-text {
        text-align: center;
        padding-top: 50px;
        line-height: 45px;
        font-size: 30px;
        font-weight: 500;
        -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), color-stop(70%, rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0.3)));
        background-image: -webkit-linear-gradient(60deg, #ffffff, #d70c19);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        img {
          vertical-align: top;
          margin-right: 10px;
          margin-top: 6px;
        }
      }
      .language-list {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 9;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border-radius: 2px;
        .ant-dropdown-link {
          padding: 0 10px;
          height: 20px;
          line-height: 20px;
          font-size: 13px;
          color: #fff;
          display: block;
          font-weight: 600;
          .anticon {
            vertical-align: middle;
          }
          .anticon.anticon-global {
            margin-right: 4px;
            margin-top: -2px;
          }
        }
      }
    }
    .login-form-box {
      padding-top: 20px;
      padding-bottom: 20px;
      background: #fff;
      background: rgba(255, 255, 255, 0.8);
      .login-form {
        width: 80%;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
