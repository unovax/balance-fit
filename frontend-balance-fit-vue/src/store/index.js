import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
    state: {
        userState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        error: null
    },
    mutations: {
        loginMutation(state, user) {
            state.userState = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        errorMutation(state, error) {
            state.error = error;
        }
    },
    actions: {
        loginAction({commit}, user) {
            axios.post("http://127.0.0.1:8000/api/login", user)
            .then((response) => {
                console.log(response);
                commit('loginMutation', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        registerAction({commit}, user) {
            axios.post("http://127.0.0.1:8000/api/register", user)
            .then((response) => {
                console.log(response);
                commit('loginMutation', response.data);
                return response;
            })
            .catch((error) => {
                commit('errorMutation', error);
            });
        }
    },
    getters: {
        // Define your getters here
    },
});

export default store;
