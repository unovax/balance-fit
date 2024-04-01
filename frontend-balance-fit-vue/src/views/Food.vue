<template>
  <div class="view">
    <PrimaryButton @click="openModal('add')">Agregar alimento</PrimaryButton>
    <transition-group
      class="grid grid-cols-1 gap-2 overflow-auto"
      name="staggered-fade"
      tag="div"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <Card
        v-for="(food, index) in FoodListState"
        :item="food"
        v-on:click="setFood(food)"
        v-bind:key="food.id"
        v-bind:data-index="index"
      />
    </transition-group>
    <div v-if="loadingList" class="w-full flex justify-center">
      <LoadingIcon />
    </div>
    <Modal :showing="foodModal.showing" @close="closeModal">
      <template v-slot:header>
        <h1 v-if="foodModal.mode === 'edit'">Editar alimento</h1>
        <h1 v-else-if="foodModal.mode === 'add'">Nuevo alimento</h1>
      </template>
      <form v-on:submit.prevent="formAction" class="space-y-4">
        <FileInput
          input_id="input_food_img"
          :img="food.img"
          @setFile="
            (e) => {
              food.img = e.target.files[0];
            }
          "
        />
        <Input
          input_id="input_barcode"
          placeholder="Código"
          type="text"
          v-model="food.barcode"
        />
        <Input
          input_id="input_name"
          placeholder="Nombre"
          type="text"
          v-model="food.name"
        />
        <Input
          input_id="input_description"
          placeholder="Descripción"
          type="text"
          v-model="food.description"
        />
        <Input
          input_id="input_calories"
          placeholder="Calorías"
          type="number"
          v-model="food.calories"
        />
        <Input
          input_id="input_carbohydrates"
          placeholder="Carbohidratos"
          type="number"
          v-model="food.carbohydrates"
        />
        <Input
          input_id="input_proteins"
          placeholder="Proteínas"
          type="number"
          v-model="food.proteins"
        />
        <Input
          input_id="input_fats"
          placeholder="Grasas"
          type="number"
          v-model="food.fats"
        />
        <div class="flex space-x-2 items-center">
          <PrimaryButton :disabled="foodModal.loading" class="flex-1">
            <span v-if="!foodModal.loading">Guardar</span>
            <span v-else class="w-full flex justify-center"><LoadingIcon /></span>
          </PrimaryButton>
          <DangerButton
            v-if="foodModal.mode === 'edit'"
            :disabled="foodModal.loading"
            class="flex-1"
            v-on:click="deleteFood"
          >Eliminar</DangerButton>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script>
import Modal from "../components/Modal.vue";
import PrimaryButton from "../components/Buttons/PrimaryButton.vue";
import DangerButton from "../components/Buttons/DangerButton.vue";
import Input from "../components/Input.vue";
import FileInput from "../components/FileInput.vue";
import Card from "../components/Card.vue";
import LoadingIcon from "../components/Icons/Loading.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Modal,
    PrimaryButton,
    DangerButton,
    Input,
    FileInput,
    Card,
    LoadingIcon,
  },
  data() {
    return {
      foodModal: {
        showing: false,
        loading: false,
        mode: "add",
      },
      food: {
        img: null,
        barcode: "",
        name: "",
        description: "",
        calories: null,
        carbohydrates: null,
        proteins: null,
        fats: null,
      },
      default_food: {
        img: null,
        barcode: "",
        name: "",
        description: "",
        calories: null,
        carbohydrates: null,
        proteins: null,
        fats: null,
      },
      loadingList: true,
    };
  },
  created() {
    this.loadingList = true;
    this.getFoodsAction().then((response) => {
      this.loadingList = false;
    });
  },
  computed: {
    ...mapState(["FoodListState"]),
  },
  methods: {
    ...mapActions(["addFoodAction", "getFoodsAction", "updateFoodAction", "deleteFoodAction"]),
    openModal(mode) {
      this.foodModal.showing = true;
      this.foodModal.mode = mode;
    },
    closeModal() {
      this.foodModal.showing = false;
      setTimeout(() => {
        this.food = JSON.parse(JSON.stringify(this.default_food));
      }, 200);
    },
    formAction() {
      if (this.foodModal.mode === "add") {
        this.addFood();
      } else if (this.foodModal.mode === "edit") {
        this.updateFood();
      }
    },
    addFood() {
      if (this.foodModal.loading) return;
      this.foodModal.loading = true;
      this.addFoodAction(this.food)
        .then((response) => {
          this.foodModal.loading = false;
          if (!response) return;
          if (response.error) return;
          this.food = this.default_food;
          this.foodModal.showing = false;
          this.foodModal.false = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setFood(food) {
      this.food = JSON.parse(JSON.stringify(food));
      this.openModal("edit");
    },
    updateFood(){
        if (this.foodModal.loading) return;
        this.foodModal.loading = true;
        this.updateFoodAction(this.food)
            .then((response) => {
                this.foodModal.loading = false;
                if (!response) return;
                if (response.error) return;
                this.food = this.default_food;
                this.foodModal.showing = false;
                this.foodModal.false = true;
            })
            .catch((error) => {
            console.log(error);
            });
    },
    deleteFood(){
        if (this.foodModal.loading) return;
        this.foodModal.loading = true;
        this.deleteFoodAction(this.food)
            .then((response) => {
                this.foodModal.loading = false;
                if (!response) return;
                if (response.error) return;
                this.food = this.default_food;
                this.foodModal.showing = false;
                this.foodModal.false = true;
            })
            .catch((error) => {
            console.log(error);
            });
    },
    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function () {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function () {
        Velocity(el, { opacity: 0 }, { complete: done });
      }, delay);
    },
  },
};
</script>
