import {
  Button,
  FlatList,
  ListRenderItem,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import db from "../sqlite/sqlite";
import { useTodos } from "./useTodos";
import { Todo } from "./todo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, getTodos, addTodo, updateTodo, deleteTodo } = useTodos();

  const textInputRef = useRef<TextInput>(null);

  const [title, setTitle] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleAddTodo = () => {
    addTodo(db, title);

    setTitle("");
    textInputRef?.current?.clear();
    textInputRef?.current?.focus();
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(db, id);
  };

  const handleUpdateTodo = (id: number, newTitle: string) => {
    updateTodo(db, id, newTitle);
    setEditMode(false);
  };

  useEffect(() => {
    getTodos(db);
  }, []);

  const renderItem: ListRenderItem<Todo> = ({ item: todo }) => {
    return (
      <TodoItem
        todo={todo}
        editable={editMode}
        onDeletePress={handleDeleteTodo}
        onUpdatePress={handleUpdateTodo}
      />
    );
  };

  const handleChangeText = (text: string) => setTitle(text);

  const handleEditPress = () => setEditMode(!editMode);

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { marginBottom: 16 }]}>
        <Text style={styles.header}>Todos</Text>

        <Button
          title={editMode ? "Cancel" : "Edit"}
          onPress={handleEditPress}
          disabled={!todos.length}
        />
      </View>

      <View style={styles.headerContainer}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder="Add a new todo..."
          onChangeText={handleChangeText}
        />

        <Button title="+ Add" onPress={handleAddTodo} disabled={!title} />
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<Text>No todos...</Text>}
      />
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
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 16,
  },

  header: {
    fontWeight: "bold",
    fontSize: 36,
    verticalAlign: "bottom",
  },

  contentContainer: {
    padding: 16,
    gap: 16,
    backgroundColor: "#fff",
  },
});
