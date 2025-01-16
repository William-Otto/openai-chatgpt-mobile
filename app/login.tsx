import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSupabase } from "@/context/supabaseProvider";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;

  return data.session;
};

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithOAuth, signInWithPassword, signUp, session } =
    useSupabase();

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  const onSocialSignInPress = async (provider: Provider) => {
    setIsLoading(true);
    try {
      const res = await signInWithOAuth(provider);

      if (res?.type === "success") {
        const { url } = res;
        await createSessionFromUrl(url);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInPress = async () => {
    setIsLoading(true);
    try {
      await signInWithPassword(email, password);
    } catch (err: Error | any) {
      Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpPress = async () => {
    setIsLoading(true);
    try {
      await signUp(email, password);
    } catch (err: Error | any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
      style={styles.container}
    >
      {isLoading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      )}

      <Image
        source={require("../assets/images/logo-dark.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {type === "login" ? "Welcome Back" : "Create an Account"}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => (type === "login" ? onSignInPress() : onSignUpPress())}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.text}>
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account?"}
        </Text>

        <Link
          href={{
            pathname: "/login",
            params: { type: type === "login" ? "register" : "login" },
          }}
        >
          <Text style={styles.link}>
            {" "}
            {type === "login" ? "Sign up" : "Log in"}
          </Text>
        </Link>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => onSocialSignInPress("google")}
      >
        <Ionicons name="logo-google" size={20} color={Colors.black} />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => onSocialSignInPress("apple")}
      >
        <Ionicons name="logo-apple" size={20} color={Colors.black} />
        <Text style={styles.socialButtonText}>Continue with Apple</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginVertical: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: Colors.black,
  },
  inputContainer: {
    marginBottom: 17,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    fontSize: 16,
    marginBottom: 8,
  },
  primaryButton: {
    height: 54,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: Colors.black,
  },
  link: {
    fontSize: 14,
    color: Colors.primary,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#C2C8D0",
  },
  dividerText: {
    fontSize: 14,
    color: Colors.black,
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderWidth: 1,
    borderColor: "#C2C8D0",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  socialButtonText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
  },
});

export default Login;
