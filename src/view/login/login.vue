<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-icon">
        <img src="../../assets/images/asteroid.png" alt="">
      </div>
      <Card :bordered="false" style="background: rgba(0,0,0,.2);">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, userPwd }) {
      this.handleLogin({ userName, userPwd }).then(res => {
        this.getUserInfo(userName).then(() => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
