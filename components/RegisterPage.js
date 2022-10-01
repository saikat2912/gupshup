import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input } from "react-native-elements";

import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase';


const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back To Login",
    });
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth,email,password)
        .then((authUser)=>{
          navigation.replace("Login");
            /*authUser.user.({
                displayName : name,
                photoURL: imageUrl || 
                "https://picsum.photos/200"
            })*/
        })
        .catch((error) =>console.log("the error is ",error));
    /*const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        userCredential.user.update({
          displayName : name,
          photoURL: imageUrl || 
          "https://picsum.photos/200"
      })
        // ...
      })
      .catch((error) =>alert(error.message));*/
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h1 style={{ marginBottom: 60 }}>
        Create a Gupshup Account
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputFields}
        />
        <TextInput
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputFields}
        />
        <TextInput
          placeholder="Password"
          autoFocus
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputFields}
        />
        <TextInput
          placeholder="Profile Picture URL (Optional)"
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          
          style={styles.inputFields}
          
        />
        <Button
          containerStyle={styles.button}
          onPress={() =>{register()}}
          title="Register"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  inputContainer: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
  },
  inputFields: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
