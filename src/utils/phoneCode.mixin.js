export default {
  data() {
    return {
      buttonText: '获取验证码',
      timeLimit: 60,
      timeFn: null
    };
  },
  methods: {
    /**
     * 倒计时
     */
    time() {
      this.buttonText = `已发送(${this.timeLimit})`;
      this.timeFn = setTimeout(() => {
        this.timeLimit -= 1;
        if (this.timeLimit > 0) {
          this.buttonText = `已发送(${this.timeLimit})`;
          this.time();
        } else {
          this.buttonText = '获取验证码';
          this.timeLimit = 60;
        }
      }, 1000);
    },
    /**
     * 发送手机验证码
     * 1:注册短信,2:修改密码,3:忘记密码,4:修改手机号,5:修改身份证
     */
    sendVerifySMS() {
      this.formRef.validateField('phone', err => {
        console.log('sendVerifySMS', err);
        if (err) {
          return false;
        }
        // 倒计时
        if (this.buttonText !== '获取验证码') {
          return;
        }
        const params = {
          phone: this.form.phone,
          type: this.phoneType
        };
        this.time();
        this.$http
          .post({ map: 'sys', url: 'sendVerifySMS' }, params)
          .then(({ data }) => {
            if (data['success']) {
              this.$message({
                type: 'success',
                message: '短信验证码发送成功，请注意查收短信'
              });
            }
          })
          .catch();
        return false;
      });
    }
  },
  beforeDestroy() {
    this.timeFn && clearTimeout(this.timeFn);
  }
};
