<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="bg-[#23242C] p-6 rounded-lg shadow-md  min-w-80">
      <h2 class="text-2xl font-semibold text-center mb-4 text-white">Faça seu login</h2>
      <form @submit.prevent="handleLogin">
        <label class="block mb-2 text-white">E-mail:</label>
        <input v-model="email" type="email" class="w-full p-2 text-white border border-[#3E3C41]  rounded mb-4" required />

        <label class="block mb-2 text-white">Senha:</label>
        <input v-model="password" type="password" class="w-full p-2 text-white border border-[#3E3C41] rounded mb-4" />

        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
      </form>
      <div class="flex flex-col w-full items-center mt-5">
      <span class="text-white">Não possui conta?</span>
      <router-link to="/register" class="text-blue-500 hover:underline">Cadastre-se</router-link>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth';

  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const authStore = useAuthStore();

  const handleLogin = async () => {
    try {
      await authStore.login(email.value, password.value);
      router.push('/dashboard');
    } catch (error) {
      throw "Erro ao autenticar " + error;
    }
  }
</script>