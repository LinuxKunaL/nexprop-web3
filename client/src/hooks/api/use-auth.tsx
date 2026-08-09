import authService from "@services/api/auth.service";

const useAuth = () => {
  const selfVerify = async () => {
    const result = await authService.selfVerify();
    return result;
  };
  return { selfVerify };
};

export default useAuth;
