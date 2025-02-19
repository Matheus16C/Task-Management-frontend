import type { User } from '../types/user.interface';
import api from "./api";


export default {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', {
      email, password
    });
    return response.data;
  },

  async register(user: User) {

    const response = await api.post('/auth/register', 
      user
    );
    return response.data;
  }

}