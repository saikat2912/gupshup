import { View, Text , Image , StyleSheet , Button, KeyboardAvoidingView } from 'react-native'
import React ,{ useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar'
import { Input } from 'react-native-elements/dist/input/Input'
import {getAuth, onAuthStateChanged} from "firebase/auth";

import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from '../firebase';

const loginPage = ({navigation}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  useEffect(() =>{
    const unsubscribe=auth.onAuthStateChanged((user)=>{
      if(user){
        navigation.replace("Home");
      }
    });

    return unsubscribe;
   
  },[]);

  const signIn =() =>{
    signInWithEmailAndPassword(auth,email,password)
    .catch((error) => console.log("there was a error logging in",error));

  }

  return (
    <KeyboardAvoidingView style={styles.inputContainer}>
      <StatusBar style="light"/>
      <Image
      source={require("../assets/gupshuplogo.png")}
      style={{width:300,height:200}}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)}/>
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text)=>setPassword(text)}/>
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="login"/>
      <Button containerStyle={styles.button} onPress={()=> navigation.navigate('Register')} type="outline" title="Register"/>
      <View style={{height:200}}></View>
    </KeyboardAvoidingView>
  )
}

export default loginPage;

const styles = StyleSheet.create({
  inputContainer : {},
  button:{
    width:200,
    marginTop:100
  }
})