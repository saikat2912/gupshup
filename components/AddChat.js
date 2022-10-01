import { View, Text , Image , StyleSheet , Button, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React ,{ useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar'
import { Input } from 'react-native-elements/dist/input/Input'
import { addDoc, collection } from "firebase/firestore";

import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import CustomListItem from './molecules/CustomListItem';
import { authentication ,database } from '../firebase';
import { AntDesign,EvilIcons  } from '@expo/vector-icons'; 
import { Icon } from 'react-native-elements';
import {auth,db} from '../firebase';


import ReactDOM from "react-dom";

const AddChat = ({navigation}) => {


  const [chatName,setChatName] =useState("");
  const [message,setMessage] = useState("");
  const postCollectionsRef = collection(db, "mychat");

  const list =[{chatName:"Santanu",message:"Abe 2 min re jauchi"},{chatName:"Aklesh",message:"Abe 2 min re jauchi"}];

  useLayoutEffect(() =>{
    navigation.setOptions({
        title: "Add a new Chat",
        headerBackTitle: "Chats"
    })
  })

  const createChat = async () =>{
    await addDoc(postCollectionsRef, {
      chatName,
      message
    });

  }

  return (
    
    <SafeAreaView>
        <Input
        placeholder="Enter a chat names"
        type="text"
        value={chatName}
        onChangeText={(text) => setChatName(text)}
        leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="black"/>
        }/>

        <Button onPress={createChat} title="Create new Chat" />
    </SafeAreaView>
  )
}

export default AddChat;

const styles = StyleSheet.create({
  inputContainer : {},
  button:{
    width:200,
    marginTop:100
  }
})