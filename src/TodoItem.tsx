import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Todo } from "./todo";

interface TodoItemProps {
  todo: Todo;
  editable: boolean;
  onDeletePress: (id: number) => void;
  onUpdatePress: (id: number, newTitle: string) => void;
}

export default function TodoItem({
  todo,
  editable,
  onDeletePress,
  onUpdatePress,
}: TodoItemProps) {
  const [title, setTitle] = useState<string>();

  const handleDeleteTodo = () => {
    onDeletePress(todo.id);
  };

  const handleUpdateTodo = () => {
    if (title) {
      onUpdatePress(todo.id, title);
    }
  };

  const handleChangeText = (text: string) => setTitle(text);

  useEffect(() => {
    setTitle(todo.title);
  }, [editable]);

  return (
    <View style={styles.container}>
      {editable ? (
        <TextInput
          style={styles.textInput}
          defaultValue={todo.title}
          placeholder="Todo Title"
          onChangeText={handleChangeText}
        />
      ) : (
        <Text>{`${todo.title}`}</Text>
      )}

      <View style={styles.rowContainer}>
        {editable ? (
          <Button title="Save" onPress={handleUpdateTodo} disabled={!title} />
        ) : (
          <Button title="Delete" onPress={handleDeleteTodo} color="red" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: "gray",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  rowContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
