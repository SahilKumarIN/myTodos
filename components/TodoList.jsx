import { Image, Pressable,ScrollView, StyleSheet, Text, View,ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList(props) {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        if (props.todo && props.todo.length > 0) {
            setTodoList(props.todo);
        }
    }, [props.todo]);

    const handleDelete = async(index)=> {
        try {
            const updatedList = todoList.filter((_, i) => i !== index);
            setTodoList(updatedList)
            
            AsyncStorage.setItem('todos' , JSON.stringify(updatedList))
            ToastAndroid.show("Task Deleted",500)
        } catch (error) {
            console.error(error)
        }
    }

    const myList = todoList.map((todo, index) => (
        <View style={styles.todoContainer}
            key={index}>

            <Text style={[styles.todoText]}>{todo}</Text>

            <Pressable
                onPress={()=>{handleDelete(index)}}
            >
                <Image
                    // This image is for task deletion
                    style={styles.icons}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3687/3687412.png'

                    }}
                /></Pressable>
        </View>
    ))

    return (
        <View >
            <View>
                <Text style={styles.headingText}>TodoList</Text>
            </View>
            <ScrollView style={{ height: '75%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {todoList && todoList.length > 0 ? (
                        myList
                    ) : (
                        <Text style={styles.notFoundText}>No Todo Found</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        color: 'black',
    },
    notFoundText: {
        color: 'red',
        fontSize: 40,
        fontWeight: 'bold',
    },
    todoContainer: {
        backgroundColor: "#4dd0e1",
        width: '80%',
        textAlign: 'center',
        padding: 8,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    todoText: {
        fontWeight: '800',
        fontSize: 24,
        color: 'black',
        width: '85%',
    },
    icons: {
        width: 40,
        height: 40

    },
    completedTodoText: {
        textDecorationLine: 'line-through',
        color: 'gray', // You can adjust the color as needed
    },
});
