import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "/api/v1";
axios.defaults.withCredentials = true;

type User = {
  name: string;
  email: string;
  branch: string;
  year: string
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
  resetPassword: (token:string, newPassword:string) => Promise<void>; 
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          console.log("set loading to true")
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log("resposne ",response)

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
            console.log('Loading set to false, user set');
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }finally{
          set({ loading: false });
        }
      },

      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          console.log('Loading set to true');
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Login response:', response);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
            console.log('Loading set to false, user set');
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }finally{
          set({ loading: false });
        }
      },

      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
            headers: {
              'Content-Type': 'application/json',
              withCredentials: true

            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }finally {
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
          }
        } catch (error: any) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }finally {
          set({ isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }finally {
          set({ loading: false });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }finally{
          set({ loading: false });

        }
      },

      updateProfile: async (input: any) => {
        try {
          const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      resetPassword: async (newpassword: string, token: string) => {
        try {
          const response = await axios.put(`${API_END_POINT}/reset-password`, { newpassword, token }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }finally{
          set({ loading: false });
        }
      }
    }),
    {
      name: 'agora-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);