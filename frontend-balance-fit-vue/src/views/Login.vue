<template>
    <div class="login__container">
        <div class="w-full flex flex-col items-center">
          <Logo/>
          <h1 class="text-3xl text-white">BalanceFit</h1>
        </div>
        <form class="w-full flex flex-col items-center space-y-2" v-on:submit.prevent="login">
            <input v-model="user.email" class="login_input" placeholder='Correo electronico' type="text" />
            <input v-model="user.password" class="login_input" placeholder='Contraseña' type="password"  />
            <LoginButton type="sumbit">Iniciar sesion</LoginButton>
            <FacebookButton/>
            <GoogleButton/>
        </form>
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
            this.loginAction(this.user).then((response) => {
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
