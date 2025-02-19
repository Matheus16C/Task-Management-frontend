<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="bg-[#23242C] p-6 rounded-lg shadow-md  min-w-80">
      <div class="flex items-center justify-center relative mb-4">
        <button @click="back" type="button" class=" text-white absolute left-0 cursor-pointer">
          <CircleArrowLeft />
        </button>
        <h2 class="text-2xl font-semibold text-white  ">Cadastro</h2>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-white font-medium">Nome</label>
          <input v-model="form.name" placeholder="Joe Due" type="text" class=" text-white  w-full p-2 border border-[#3E3C41] rounded" required />
        </div>

        <div class="mb-4">
          <label class="block  text-white font-medium">E-mail</label>
          <input v-model="form.email" placeholder="joe@email.com" type="email" class=" text-white w-full p-2 border border-[#3E3C41] rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-white font-medium">Senha</label>
          <input v-model="form.password" placeholder="**********" type="password" class=" text-white w-full p-2 border border-[#3E3C41] rounded" required minlength="6" />
        </div>

        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { CircleArrowLeft } from 'lucide-vue-next';
import type { User } from '../types/user.interface';

const form = ref({
  name: '',
  email: '',
  password: ''
});

const router = useRouter();
const authStore = useAuthStore();

const back = () => {
  router.go(-1);
}


const handleRegister = async () => {
    try {
      const user: User = form.value;
      await authStore.register(user);
      router.push('/');
    } catch (error) {
      throw "Erro ao autenticar " + error;
    }
  }
</script>
