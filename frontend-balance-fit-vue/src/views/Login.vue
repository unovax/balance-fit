<template>
    <div class='login__container'>
        <div class="w-full flex flex-col items-center">
          <Logo/>
          <h1 class="text-3xl text-white">BalanceFit</h1>
        </div>
        <input placeholder='Correo electronico' type="text" />
        <input placeholder='Contraseña' type="password"  />
        <LoginButton>Iniciar sesion</LoginButton>
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
export default {
    components: {
        Logo,
        LoginButton,
        FacebookButton,
        GoogleButton
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            // Perform login logic here
            console.log('Username:', this.username);
            console.log('Password:', this.password);
            // Reset form fields
            this.username = '';
            this.password = '';
        }
    }
};
</script>
