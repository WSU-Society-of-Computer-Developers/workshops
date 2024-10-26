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
      <Text style={{ fontSize: 50, fontWeight: "bold" }}>Welcome</Text>
      <Link style={{ color: "blue" }} push href="/counter">
        Visit Counter
      </Link>
      <Link style={{ color: "blue" }} push href="/calculator">
        Visit Calculator
      </Link>
      <Link style={{ color: "blue" }} push href="/todo">
        Visit TODOs
      </Link>
    </View>
  );
}
