import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput,StyleSheet, Keyboard } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { TouchableOpacity } from 'react-native-web';
import { AntDesign,EvilIcons ,Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import {auth,db} from '../firebase';
import { addDoc, collection,add } from "firebase/firestore";
import { useEffect } from 'react';
import { get, getDatabase } from 'firebase/database';



export default function ({navigation,route}) {

    const [input,setInput]=useState("");

    //the new firebase config
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        const loadData =async()=>{
            const database=getDatabase();
            const myChatroom=fetchMessages();
        }
    },[])

    const fetchMessages =() =>{
        const database=getDatabase();
        const snapshot= await get(ref(database,`chatrooms/${selectedUser}`))
    }

    const sendMessage =()=>{
        Keyboard.dismiss();
        db.collection("mychat").addDoc(route.params.id).collection("messages").addDoc({
          
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
    }

useLayoutEffect(()=>{
    navigation.setOptions({
        title:'Chat',
        headerTitleAlign:"left",
        headerBackTitleVisible:false,
        headerTitle:() =>(
            <View
            style={{flexDirection:"row",alignItems:"center"}}
            >
                <Avatar 
                rounded
                 source={{
                    uri:"https://picsum.photos/200"
                }}/>
                <Text style={{marginRight:"1rem"}}>{route.params.chatName}</Text>
            </View>
        ),
        headerLeft:()=>(
            <TouchableOpacity onPress={navigation.goBack}>
                <AntDesign name="arrowleft" size={24} color="white"/>
            </TouchableOpacity>
        )

    })
},[])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <StatusBar style="light"/>
      <KeyboardAvoidingView style={styles.container}>
       <ScrollView>

       </ScrollView>
       <View style={styles.footer}>
            <TextInput
            value={input}
            onChangeText={(text)=>setInput(text)}
            placeholder="Enter your message"
            style={styles.textInput}/>
            <TouchableOpacity onPress={sendMessage} opacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6"/>
            </TouchableOpacity>
            

       </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create(
    {
        footer:{
           flexDirection:'row',
           alignItems:'center',
           width:'100%',
           padding:20
        },
        container:{
            flex:1
        },
        textInput:{
            bottom:0,
            height:40,
            flex:1,
            marginRight:15,
            borderColor:"transparent",
            backgroundColor:"#ECECEC",
            borderWidth:1,
            padding:10,
            color:"grey",
            borderRadius:30
        }
    }
)