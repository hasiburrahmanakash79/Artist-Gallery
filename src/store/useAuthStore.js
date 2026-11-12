import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Frontend-only mock auth. Swap `login` for a POST /api/admin/login call
// that returns a real JWT once the backend is connected; store the token
// here instead of the boolean flag.
export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminEmail: null,

      login: (email, password) => {
        // DEV CREDENTIALS — replace with real backend auth.
        if (email === 'admin@shoron.art' && password === 'gallery2026') {
          set({ isAuthenticated: true, adminEmail: email });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false, adminEmail: null }),
    }),
    { name: 'farah-noor-admin-auth' }
  )
);
