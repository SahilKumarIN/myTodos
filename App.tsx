import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddTodo from './components/Add-Todo'

export default function App() {
  return (
    <SafeAreaView>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>myTodos</Text>
      </View>
      
      {/* Here is the code for the Todo's Inputs in App */}
      <AddTodo />

      
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    shadowColor: 'orange',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 10

  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black'
  },
  scrollTodos: {
    
  }
})