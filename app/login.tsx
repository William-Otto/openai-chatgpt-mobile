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
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      </View>

      <TouchableOpacity style={styles.primaryButton}>
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

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color={Colors.black} />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
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
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    fontSize: 16,
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
