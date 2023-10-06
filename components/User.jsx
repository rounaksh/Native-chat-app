import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { UserType } from '../screens/userContext';

const User = ({ item }) => {
    const { userId, setUserId } = useContext(UserType)
    const [requestSent, setRequestSent] = useState(false)

    const sendFriendRequest = async (currentUserId, selectedUserId) => {
        try {
            const response = await fetch("http://192.168.29.254:8000/friend-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentUserId, selectedUserId })
            })

            if (response.ok) {
                setRequestSent(true)
            }
        } catch (err) {
            Alert.alert('Error: ', err.message, [{ text: 'ok' }])
            console.log(err)
        }
    }
    return (
        <Pressable style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
        }}>
            <View>
                <Image style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    resizeMode: 'cover',
                }}
                    source={{ uri: item.image }} />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item?.name}</Text>
                <Text style={{ marginTop: 4, color: 'grey' }}>{item?.email}</Text>
            </View>

            <Pressable
                onPress={() => sendFriendRequest(userId, item._id)}
                style={{
                    backgroundColor: '#fff', padding: 10, borderRadius: 50, width: 101, flexDirection: 'row', alignItems: 'center', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                }}>
                <Text style={{ marginRight: 5 }}>
                    <Ionicons name="person-add" size={20} color="black" />
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 13 }}>
                    Add Friend
                </Text>
            </Pressable>
        </Pressable>
    )
}

export default User

const styles = StyleSheet.create({})