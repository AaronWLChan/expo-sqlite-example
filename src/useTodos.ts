import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Todo } from "./todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * Whenever the todos table has mutated, we need to fetch the data set again order to sync DB -> UI State
   */
  const fetchTodos = (tx: SQLite.SQLTransaction) => {
    tx.executeSql("SELECT * FROM todos;", [], (_, { rows: { _array } }) =>
      setTodos(_array)
    );
  };

  const getTodos = (db: SQLite.Database) => {
    db.readTransaction(fetchTodos);
  };

  const addTodo = (db: SQLite.Database, title: string) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO todos (title) VALUES (?);", [title]);

      fetchTodos(tx);
    });
  };

  const updateTodo = (db: SQLite.Database, id: number, title: string) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE todos SET title = ? WHERE id = ?;", [title, id]);

      fetchTodos(tx);
    });
  };

  const deleteTodo = (db: SQLite.Database, id: number) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM todos WHERE id = ?;", [id]);

      fetchTodos(tx);
    });
  };

  return {
    todos,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
