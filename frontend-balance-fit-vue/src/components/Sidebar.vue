<template>
    <div :class="show ? 'sidebar' : 'sidebar__hidden'">
        <div class="sidebar-header">
            <h1>Balance Fit</h1>
            <MenuIcon />
        </div>
        <div class="flex-1 flex flex-col">
            <ul class="flex-1">
                <li v-for="link in links" :key="link.path">
                    <router-link :to="link.path">{{ link.name }}</router-link>
                </li>
            </ul>
            <div>
                <button v-on:click="logout">Logout</button>
            </div>
        </div>
    </div>
</template>
<script>
import MenuIcon from './Icons/Menu.vue';
import { mapActions } from 'vuex'
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    components:{
        MenuIcon
    },
    data(){
        return {
            links: [
                { name: 'Home', path: '/' },
                { name: 'Food', path: '/food' },
            ]
        }
    },
    methods:{
        ...mapActions(['logoutAction']),
        logout(){
            this.logoutAction().then(response=>{
                if(!response.error){
                    this.$router.push('/login');
                }
                else{
                    console.log(response.message);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>