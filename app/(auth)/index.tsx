import { Button, SafeAreaView } from "react-native";
import React from "react";
import { useSupabase } from "@/context/supabaseProvider";

const Page = () => {
  const { signOut } = useSupabase();

  return (
    <SafeAreaView>
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  );
};

export default Page;
