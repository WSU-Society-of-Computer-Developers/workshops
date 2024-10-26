import {
  Button,
  Pressable,
  Text,
  TextInput,
  Vibration,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import React from "react";

interface IListItem {
  children: string;
}

const styles = StyleSheet.create({
  list: {},
  input: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#000",
    fontSize: 14,
  },
});

const ListItem = ({ children }: IListItem) => (
  <View>
    <Text>- {children}</Text>
  </View>
);

export default function Todo() {
  const [todos, setTodos] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");

  const addTodo = (toAdd: string) => {
    if (!toAdd)
      return Alert.alert("Invalid input", "Please input a valid todo item");
    setTodos((prev) => [...prev, toAdd]);
    Alert.alert("Added todo", toAdd);
    setInput("");
  };

  const removeTodo = (index: number) => {
    Alert.alert("removed todo", todos[index]);
    setTodos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>TODOs</Text>
      {todos.map((todo, index) => (
        <Pressable key={index} onPress={() => removeTodo(index)}>
          <ListItem>{todo}</ListItem>
        </Pressable>
      ))}
      <TextInput
        placeholder="Type here"
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />
      <Button title="Add" onPress={() => addTodo(input)} />
    </View>
  );
}
