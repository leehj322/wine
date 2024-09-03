import { signIn } from "@/libs/axios/auth/auth";
import getUser from "@/libs/axios/user/getUser";
import updateUser from "@/libs/axios/user/updateUser";
import { SignInForm } from "@/types/auth";
import User, { UpdateUserForm } from "@/types/user";
import { removeTokens } from "@/utils/authTokenStorage";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type UserValue = User | null;

interface AuthValues {
  user: UserValue;
  isPending: boolean;
  login: (formData: SignInForm) => void;
  logout: () => void;
  updateMe: (formData: UpdateUserForm) => void;
}

const INITIAL_CONTEXT_VALUES: AuthValues = {
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
};

const AuthContext = createContext<AuthValues>(INITIAL_CONTEXT_VALUES);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: UserValue;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });

  const handleAuthChange = (key: string, value: UserValue | boolean) => {
    setAuthState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getMe = async () => {
    handleAuthChange("isPending", true);
    let nextUser: UserValue;
    try {
      nextUser = await getUser();
    } catch {
      return;
    }

    setAuthState({
      user: nextUser,
      isPending: false,
    });
  };

  const login = async (formData: SignInForm) => {
    await signIn(formData);
    await getMe();
  };

  const logout = () => {
    handleAuthChange("user", null);
    removeTokens();
  };

  const updateMe = async (formData: UpdateUserForm) => {
    let updatedUser: UserValue = authState.user;
    try {
      updatedUser = await updateUser(formData);
    } catch {
      return;
    }

    handleAuthChange("user", updatedUser);
  };

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      getMe();
      return;
    }

    setAuthState({
      user: null,
      isPending: true,
    });
  }, []);

  const providerValueProp = useMemo(
    () => ({
      user: authState.user,
      isPending: authState.isPending,
      login,
      logout,
      updateMe,
    }),
    [authState.user, authState.isPending],
  );

  return (
    <AuthContext.Provider value={providerValueProp}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다.",
    );

  const router = useRouter();
  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/signin");
    }
  }, [required, context.user, context.isPending]);

  return context;
}
