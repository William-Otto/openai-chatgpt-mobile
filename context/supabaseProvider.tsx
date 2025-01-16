import { Session, User, Provider } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/config/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

type SupabaseContextProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signInWithOAuth: (
    provider: Provider
  ) => Promise<WebBrowser.WebBrowserAuthSessionResult | null>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type SupabaseProviderProps = {
  children: ReactNode;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  user: null,
  session: null,
  initialized: false,
  signInWithOAuth: async () => null,
  signInWithPassword: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useSupabase = () => useContext(SupabaseContext);

const redirectTo = makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const signInWithOAuth = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    return res;
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
    });
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        user,
        session,
        initialized,
        signInWithOAuth,
        signInWithPassword,
        signUp,
        signOut,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
