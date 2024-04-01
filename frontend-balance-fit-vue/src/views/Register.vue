<template>
  <div class='login__container'>
      <div class="w-full flex flex-col items-center">
        <Logo/>
        <h1 class="text-3xl text-white">BalanceFit</h1>
      </div>
      <input v-model="user.name" class="login_input" placeholder='Nombre completo' type="text" />
      <input v-model="user.email" class="login_input" placeholder='Correo electronico' type="text" />
      <input v-model="user.password" class="login_input" placeholder='Contraseña' type="password" />
      <input v-model="user.password_confirmation" class="login_input" placeholder='Confirmar contraseña' type="password"  />
      <LoginButton v-on:click.prevent="register">Registrarme</LoginButton>
      <FacebookButton/>
      <GoogleButton/>
      <span class='text-white'>Ya tienes cuenta? <a class="text-blue-400" href="/login">Inicia Sesión</a></span>
  </div>
</template>

<script>
import Logo from '/src/components/login/Logo.vue';
import LoginButton from '/src/components/login/LoginButton.vue';
import FacebookButton from '/src/components/login/FacebookButton.vue';
import GoogleButton from '/src/components/login/GoogleButton.vue';
import { mapActions } from 'vuex';
export default {
  components: { 
      Logo,
      LoginButton,
      FacebookButton,
      GoogleButton
  },
  data() {
      return {
          user: {
              name: '',
              email: '',
              password: '',
              password_confirmation: ''
          },
      };
  },
  methods: {
    ...mapActions(['registerAction']),
      register() {
          this.registerAction(this.user).then((response) => {
              if(!response)return;
              if(response.error)return;
              this.$router.push('/home');
            }).catch(error => {
                console.log(error);
            })
      }
  }
};
</script>
