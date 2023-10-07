import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { UserType } from '../screens/userContext'

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const [accept, setAccepted] = useState(false)
    const { userId, setUserId } = useContext(UserType)
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(`http://192.168.29.254:8000/accept-friend-request`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    senderId: friendRequestId,
                    recepientId: userId
                })
            })

            if (response.ok) {
                setFriendRequests(friendRequests.filter(request => request._id !== friendRequestId))
                setAccepted(true)
            }
        } catch (err) {
            console.log('Error accepting the friend request', err)
        }
    }
    return (
        <Pressable style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10
        }}>
            <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: item.image }}
            />

            <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                flex: 1,
            }}>{item?.name.charAt(0).toUpperCase()} Sent you a Friend Request</Text>

            {/* <Pressable style={{ backgroundColor: '#0066b2', padding: 10, borderRadius: 6 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Accept</Text>
            </Pressable> */}

            {
                accept ? (
                    <Pressable
                        onPress={() => acceptRequest(item._id)}
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
                        <Text style={{
                            textAlign: 'center',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 20
                        }}>Accept</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        disabled
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
                        <Text style={{
                            textAlign: 'center',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 20
                        }}>Accepted</Text>
                    </Pressable>
                )
            }
        </Pressable>
    )
}

export default FriendRequest

const styles = StyleSheet.create({})