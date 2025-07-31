import { ApiService } from "@/api";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const register = useMutation({
    mutationFn: (name: string) => ApiService.register(name),
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });

  return { register, logout };
};
