<template>
  <div class='login__container'>
      <div class="w-full flex flex-col items-center">
        <Logo/>
        <h1 class="text-3xl text-white">BalanceFit</h1>
      </div>
      <input class="login_input" placeholder='Nombre completo' type="text" />
      <input class="login_input" placeholder='Correo electronico' type="text" />
      <input class="login_input" placeholder='Contraseña' type="text" />
      <input class="login_input" placeholder='Confirmar contraseña' type="password"  />
      <LoginButton>Registratme</LoginButton>
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
export default {
    components: {
        Logo,
        LoginButton,
        FacebookButton,
        GoogleButton
    },
}
</script>