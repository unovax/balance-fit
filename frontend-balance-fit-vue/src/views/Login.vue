<template>
    <div class="login__container">
        <div class="w-full flex flex-col items-center">
          <Logo/>
          <h1 class="text-3xl text-white">BalanceFit</h1>
        </div>
        <input v-model="user.email" class="login_input" placeholder='Correo electronico' type="text" />
        <input v-model="user.password" class="login_input" placeholder='Contraseña' type="password"  />
        <LoginButton v-on:click.prevent="login">Iniciar sesion</LoginButton>
        <FacebookButton/>
        <GoogleButton/>
        <span class='text-white'>No tienes cuenta? <a class="text-blue-400" href="/register">Registrate</a></span>
    </div>
</template>

<script>
import Logo from '/src/components/login/Logo.vue';
import LoginButton from '/src/components/login/LoginButton.vue';
import FacebookButton from '/src/components/login/FacebookButton.vue';
import GoogleButton from '/src/components/login/GoogleButton.vue';
import { mapState, mapActions } from 'vuex'; 
export default {
    components: {
        Logo,
        LoginButton,
        FacebookButton,
        GoogleButton
    },
    computed:{
        ...mapState(['userState']),
    },
    data() {
        return {    
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions(['loginAction']),
        login() {
            this.loginAction(this.user);
            
        } 
    }
};
</script>
