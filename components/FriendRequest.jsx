import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    return (
        <Pressable>
            <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: item.image }}
            />

            <Text>{item?.name} Sent you a friend request</Text>

            <Pressable style={{ backgroundColor: '#0066b2', padding: 10, borderRadius: 6 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Accept</Text>
            </Pressable>
        </Pressable>
    )
}

export default FriendRequest

const styles = StyleSheet.create({})