import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link style={{ color: "blue" }} push href="/counter">
        {" "}
        Visit Counter
      </Link>
      <Link style={{ color: "blue" }} push href="/calculator">
        {" "}
        Visit Calculator
      </Link>
    </View>
  );
}
