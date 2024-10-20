import { Button, Text, Vibration, View } from "react-native";
import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    // make phone vibrate every 5 clicks
    if (count % 5 === 0) Vibration.vibrate();
  }, [count]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20 }}>{count}</Text>
      <Button onPress={() => setCount((c) => c + 1)} title="+"></Button>
    </View>
  );
}
