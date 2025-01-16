import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSupabase } from "@/context/supabaseProvider";

const BottomSheet = () => {
  const { bottom } = useSafeAreaInsets();
  const { signInWithOAuth } = useSupabase();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity
        style={[defaultStyles.btn, styles.btnLight]}
        onPress={() => signInWithOAuth("apple")}
      >
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[defaultStyles.btn, styles.btnDark]}
        onPress={() => signInWithOAuth("google")}
      >
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color={Colors.white}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>

      <Link
        href={{
          pathname: "/login",
          params: { type: "register" },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Sign up</Text>
        </TouchableOpacity>
      </Link>

      <Link
        href={{
          pathname: "/login",
          params: { type: "login" },
        }}
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.black,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 26,
    paddingVertical: 24,
    gap: 12,
  },
  btnLight: {
    backgroundColor: Colors.white,
  },
  btnLightText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 500,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 500,
  },
  btnOutline: {
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 8,
  },
});
export default BottomSheet;
