import BottomSheet from "@/components/BottomSheet";
import Intro from "@/components/Intro";
import { StyleSheet, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <Intro />
      <BottomSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
