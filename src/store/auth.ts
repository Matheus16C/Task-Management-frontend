import { defineStore } from "pinia";
import authService from "../services/authService";
import type { User } from "../types/user.interface";
import router from "../router";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email: string, password: string) {
      const toast = useToast();
      try {
        const data = await authService.login(email, password);
        
        this.token = data.token;
        this.user = { id: data.id, name: data.name, email: data.email };
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.");
      }
    },

    async register(user: User) {
      const toast = useToast();
      try {
        await authService.register(user);
        toast.success("Cadastro realizado! Agora faça login.");
        router.push("/");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao registrar usuário.");
      }
    },


    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      router.push("/");
    },
  },
});
