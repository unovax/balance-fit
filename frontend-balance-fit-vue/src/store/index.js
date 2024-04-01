import { createStore } from "vuex";
import axios from "axios";
import getFormData from "./getFormData";
const store = createStore({
    state: {
        userState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        errorState: false,
        errorMessages: [],
        FoodListState: [],
        LoadingListState: false,
    },
    mutations: {
        loginMutation(state, user) {
            state.userState = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        errorMutation(state, error) {
            state.errorMessages = error.response.data;
            state.errorState = true;

            // Borrar el temporizador anterior si existe
            if (state.errorTimeout) {
                clearTimeout(state.errorTimeout);
            }

            // Establecer un nuevo temporizador
            state.errorTimeout = setTimeout(() => {
                state.errorState = false;
                state.errorTimeout = null; // Limpiar la referencia al temporizador
            }, 2000);
        },
        getFoodsMutation(state, foods) {
            state.FoodListState = foods;
            state.FoodListState = state.FoodListState.map((food) => {
                food.features = {
                    cal: food.calories,
                    carb: food.carbohydrates,
                    prot: food.proteins,
                    gras: food.fats,
                };
                return food;
            });
        },
        addFoodMutation(state, food) {
            state.FoodListState.unshift(JSON.parse(JSON.stringify(food)));
            state.FoodListState = state.FoodListState.map((food) => {
                food.features = {
                    cal: food.calories,
                    carb: food.carbohydrates,
                    prot: food.proteins,
                    gras: food.fats,
                };
                return food;
            });
        },
        updateFoodMutation(state, food) {
            state.FoodListState = state.FoodListState.map((foodItem) => {
                if (foodItem.id == food.id) {
                    foodItem = JSON.parse(JSON.stringify(food));
                }
                foodItem.features = {
                    cal: foodItem.calories,
                    carb: foodItem.carbohydrates,
                    prot: foodItem.proteins,
                    gras: foodItem.fats,
                };
                console.log(foodItem);
                return foodItem;
            });
        },
        deleteFoodMutation(state, food) {
            state.FoodListState = state.FoodListState.filter((foodItem) => {
                return foodItem.id != food.id;
            });
        },
    },
    actions: {
        loginAction({ commit, state }, user) {
            return axios.post("http://127.0.0.1:8000/api/login", user)
                .then(({ data }) => {
                    commit('loginMutation', data);
                    return data;
                })
                .catch((error) => {
                    commit('errorMutation', error);
                });
        },
        registerAction({ commit }, user) {
            return axios.post("http://127.0.0.1:8000/api/register", user)
                .then(({ data }) => {
                    commit('loginMutation', data);
                    return data;
                })
                .catch((error) => {
                    commit('errorMutation', error);
                });
        },
        logoutAction({ commit, state }) {
            return axios.post("http://127.0.0.1:8000/api/logout", null, { headers: { Authorization: `Bearer ${state.userState.user.token}` } })
                .then(({ data }) => {
                    commit('loginMutation', null);
                    localStorage.removeItem('user');
                    return data;
                })
                .catch((error) => {
                    commit('errorMutation', error);
                });
        },
        /* Catalogos */
        getFoodsAction({ commit, state }) {
            return axios.get("http://127.0.0.1:8000/api/foods", { headers: { Authorization: `Bearer ${state.userState.user.token}` } })
                .then(({ data }) => {
                    if (!data.error) {
                        commit('getFoodsMutation', data.foods);
                    } else {
                        commit('errorMutation', data);
                    }
                    return data;
                })
                .catch((error) => {
                    commit('errorMutation', error);
                });
        },
        addFoodAction({ commit, state }, food) {
            return axios.post("http://127.0.0.1:8000/api/foods", food, { headers: { Authorization: `Bearer ${state.userState.user.token}`, 'Content-Type': 'multipart/form-data', } })
                .then(({ data }) => {
                    if (!data.error) {
                        commit('addFoodMutation', data.food);
                    } else {
                        commit('errorMutation', data);
                    }
                    return data;
                })
                .catch((error) => {
                    commit('errorMutation', error);
                });
        },
        updateFoodAction({ commit, state }, food) {
            return axios.post("http://127.0.0.1:8000/api/foods/" + food.id, getFormData(food), {
                headers: { Authorization: `Bearer ${state.userState.user.token}`, 'Content-Type': 'multipart/form-data', }
            })
                .then(({ data }) => {
                    if (!data.error) {
                        commit('updateFoodMutation', data.food);
                    } else {
                        commit('errorMutation', data);
                    }
                    return data;
                }).catch((error) => {
                    commit('errorMutation', error);
                });
        },
        deleteFoodAction({ commit, state }, food) {
            return axios.delete("http://127.0.0.1:8000/api/foods/" + food.id, { headers: { Authorization: `Bearer ${state.userState.user.token}` } })
                .then(({ data }) => {
                    if (!data.error) {
                        commit('deleteFoodMutation', food);
                    } else {
                        commit('errorMutation', data);
                    }
                    return data;
                }).catch((error) => {
                    commit('errorMutation', error);
                });
        }
    },
    getters: {
        userState: (state) => state.userState,
        errorState: (state) => state.errorState
    },
});

export default store;
