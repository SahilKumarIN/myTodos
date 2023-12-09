import { Button, TextInput, StyleSheet, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoList from './TodoList';

export default function AddTodo() {

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = async () => {
    try {
      const myList = await AsyncStorage.getItem('todos');
      const existingTodos = myList !== null ? JSON.parse(myList) : [];

      const updatedTodos = [...existingTodos, todo]; // Adding the new todo to the existing todos array

      setTodoList(updatedTodos);

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      ToastAndroid.show('Task Added', 500);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const getTodo = async () => {
    try {
      const myList = await AsyncStorage.getItem('todos');
      if (myList !== null) {
        const parsedList = JSON.parse(myList);
        setTodoList(parsedList);
      }
    } catch (error) {
      console.error('Error getting todos:', error);
    }
  };


  useEffect(() => {
    getTodo()
  }, [])


  return (
    <>
      <View style={styles.todoInputContainer}>
        <TextInput
          onChangeText={(textChange) => {
            setTodo(textChange);
          }}
          value={todo}
          style={styles.todoInput}
          placeholder="Enter Your Todo : "
          keyboardType="default"
        />
        <Button color="#ce93d8" onPress={addTodo} title="ADD" />
      </View>
      <TodoList todo={todoList} />
    </>
  )
}


const styles = StyleSheet.create({
  todoInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10
  },
  todoInput: {
    backgroundColor: "#ce93d8",
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    width: '70%',
    padding: 8,
    borderRadius: 12,

  },
})