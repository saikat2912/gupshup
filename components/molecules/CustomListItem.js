import { View, Text } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const CustomListItem = ({id,chatName , message,enterChat}) => {
  return (
    <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
        <Avatar
        rounded
        source={{
            uri:"https://picsum.photos/200"
        }}>
        </Avatar>
        <ListItem.Content>
            <ListItem.Title>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{message}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem