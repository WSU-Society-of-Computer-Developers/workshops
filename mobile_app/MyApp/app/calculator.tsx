import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 12,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  previewText: {
    fontSize: 40,
    textAlign: "left",
  },
});

const CalculatorButton = (props: { title: string; onPress: () => void }) => (
  <Pressable onPress={props.onPress} style={styles.button}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </Pressable>
);

const Row = ({ children }: { children: ReactElement[] | ReactElement }) => (
  <View
    style={{
      justifyContent: "center",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    }}
  >
    {children}
  </View>
);

const Column = ({ children }: { children: ReactElement[] }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      flexBasis: "100%",
      flex: 1,
    }}
  >
    {children}
  </View>
);

export default function Counter() {
  const [expression, setExpression] = React.useState("");
  const operations = ["+", "-", "/", "*"];
  const calculate = React.useCallback(() => {
    let thisNumber = "";
    let numbers = [];
    let expressions = [];
    for (const char of expression) {
      if (operations.includes(char)) {
        numbers.push(parseFloat(thisNumber));
        expressions.push(char);
        thisNumber = "";
      }
      if (!operations.includes(char)) {
        thisNumber += char;
      }
    }
    numbers.push(parseFloat(thisNumber));
    let result = numbers[0];
    for (let i = 0; i < expressions.length; i++) {
      if (expressions[i] === "+") {
        result += numbers[i + 1];
      }
      if (expressions[i] === "-") {
        result -= numbers[i + 1];
      }
      if (expressions[i] === "*") {
        result *= numbers[i + 1];
      }
      if (expressions[i] === "/") {
        result /= numbers[i + 1];
      }
    }
    setExpression(result.toString());
  }, [expression]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text style={styles.previewText}>{expression}</Text>
      <Row>
        {operations.map((op) => (
          <CalculatorButton
            key={op}
            title={op}
            onPress={() => setExpression((e) => e + op)}
          />
        ))}
      </Row>
      <Row>
        <CalculatorButton
          title="1"
          onPress={() => setExpression((e) => e + "1")}
        />
        <CalculatorButton
          title="2"
          onPress={() => setExpression((e) => e + "2")}
        />
        <CalculatorButton
          title="3"
          onPress={() => setExpression((e) => e + "3")}
        />
        <CalculatorButton
          title="C"
          onPress={() => {
            setExpression("");
          }}
        />
      </Row>
      <Row>
        <CalculatorButton
          title="4"
          onPress={() => setExpression((e) => e + "4")}
        />
        <CalculatorButton
          title="5"
          onPress={() => setExpression((e) => e + "5")}
        />
        <CalculatorButton
          title="6"
          onPress={() => setExpression((e) => e + "6")}
        />
        <CalculatorButton
          title="<"
          onPress={() =>
            setExpression((e) =>
              e.length >= 1 ? e.substring(0, e.length - 1) : ""
            )
          }
        />
      </Row>
      <Row>
        <CalculatorButton
          title="7"
          onPress={() => setExpression((e) => e + "7")}
        />
        <CalculatorButton
          title="8"
          onPress={() => setExpression((e) => e + "8")}
        />
        <CalculatorButton
          title="9"
          onPress={() => setExpression((e) => e + "9")}
        />
        <CalculatorButton title="=" onPress={() => calculate()} />
      </Row>
      <Row>
        <CalculatorButton
          title="0"
          onPress={() => setExpression((e) => e + "0")}
        />
        <CalculatorButton
          title="."
          onPress={() => setExpression((e) => e + ".")}
        />
      </Row>
    </View>
  );
}
