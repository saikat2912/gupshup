import { View, Text , Image , StyleSheet , Button, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React ,{ useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar'
import { Input } from 'react-native-elements/dist/input/Input'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import CustomListItem from './molecules/CustomListItem';
import { collection,getDocs } from "firebase/firestore";
import { AntDesign,EvilIcons  } from '@expo/vector-icons'; 
import {auth,db} from '../firebase';
import {getDatabase,get,ref, set, onValue, update} from 'firebase/database'
import { findFocusedRoute } from '@react-navigation/native';

const HomePage = ({navigation}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [chat,setChats] = useState([]);
  const [currentPage,setCurrentPage]= useState('');
  const [username,setUsername]=useState(null);
  const [users,setUsers]= useState([]);
  const [usersToAdd,setUserToAdd] = useState(null);
  const [selectedUser,setSelectedUser]=useState(null);
  const [myData,setMyData]= useState(null);

  const list =[{chatName:"Santanu",message:"Abe 2 min re jauchi"},{chatName:"Aklesh",message:"Abe 2 min re jauchi"}];

  const signOutUser =()=>{

    auth.signOut().then(() =>{
      navigation.replace("Login");
    })

  }

  useEffect(() =>{
  
    introMethod();
  //const cityList = citySnapshot.docs.map(doc => doc.data());
  })

  const onLogin = async() =>{
    try{
      const database=getDatabase();
      const user=await findUser(username);
      if(user){
        setMyData(user);

      }
      else{
        const newUserObj={
          username:username,
          avatar:'https://i.pravatar.cc/150?img=3'+Date.now(),
        };
        set(ref(database,`users/${username}`),newUserObj)
        setMyData(newUserObj)
      }

      //set freinds list change listener

      const myUserRef= ref(database,`users/${username}`);
      onValue(myUserRef,snapshot =>{
        const data=snapshot.val();
        setUsers(data.friends);
        setMyData(prevData =>({
          ...prevData,
          friends:data.friends
        }))
      });
      setCurrentPage('users');
    } catch(error){
      console.log(error);
    }
    
  }

  const onAddFriend=async name =>{
    try{
      const database=getDatabase();
      const user = await findUser(name);
      if(user){
        if(user.username== myData.username){
          return;
        }
        if(myData.friends && myData.friends.findIndex(f=>f.username==user.username)>0){
          return;
        }
        const newChatroomRef=push(ref(database,'chatrooms'),{
          firstUser:myData.username,
          secondUser:user.username,
          messages:[]
        });
        const newChatroomId=newChatroomRef.key;

        const userFriends=user.friends || [];
        update(ref(database,`user/${user.username}`),{
          friends:[
            ...userFriends,{
              username:myData.username,
              avatar:myData.avatar,
              chatroomId:newChatroomId,
            }
          ]
        })
        const myFriends=myData.friends||[];
        update(ref(database,`users/${myData.username}`),{
          friends:[
            ...myFriends,{
              username:user.username,
              avatar:user.avatar,
              chatroomId:newChatroomId,
            }
          ]
        })
      }
    }
    catch(error){
      console.log("The error is ",error)
    }
  }

  const findUser = async(name)=>{
    const database=getDatabase();
    const mySnapshot= await get(ref(database,`users/${username}`));
    return mySnapshot.val();
  }

  const myChats =  collection(db,"mychat");
    const introMethod = async() =>{


    //  const citiesCol = collection(db, 'cities');
    const data =await getDocs(myChats);
   // const cityList = citySnapshot.docs.map(doc => doc.data());
   (data.docs.map((doc) => {
    console.log("the datas are , ",doc)
  }));
   setChats(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //setChats(list);
      //const myChatSnapshot = await getDocs(myChats);
  
     
  }

  const enterChat=(id,chatName)=>{
    navigation.navigate("ChatScreen",{
      id,
      chatName
    })
  }

  

  useLayoutEffect(() =>{
    navigation.setOptions({
      tile:"Gupshup",
      headerStyle :{backgroundColor:"blue"},
      headerTitleStyle :{ color:"black"},
      headerTintColor:"black",
      headerLeft : () =>(
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar rounded source={require("../assets/imglogo.jpg")}></Avatar>
          </TouchableOpacity>
        </View>
      ),

      headerRight: () =>(
        <View 
        style={{
          flexDirection:"row",
          justifyContent:"space-between",
          width: 80,
          marginRight: 20
        }}>
          <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camera" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
          <EvilIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  })

  return (
    
    <SafeAreaView>
      <ScrollView style={styles.container}>
      
     {chat.map((data) => {return(
      
      <View>
        {console.log("the data is ",data)}
        <CustomListItem
        id={data.id}
        chatName={data.chatName}
        message={data.message}
        enterChat={enterChat}
        />
      </View>
     )})}
      
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage;

const styles = StyleSheet.create({
  inputContainer : {},
  button:{
    width:200,
    marginTop:100
  },
  container:{
    height:"100%"
  }
})