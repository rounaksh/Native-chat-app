import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserType } from './userContext'
import FriendRequest from '../components/FriendRequest'

const FriendsScreen = () => {
    const { userId, setUserId } = useContext(UserType)
    const [friendRequests, setFriendRequests] = useState([])
    useEffect(() => {
        fetchFriendRequests()
    }, [])

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(`http://192.168.29.254:8000/friend-request/${userId}`)
            if (response.status === 200) {
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                    image: friendRequest.image
                }))

                setFriendRequests(friendRequestsData)
            }
        } catch (err) {
            console.log('Error Message: ', err.message)
        }
    }
    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {
                friendRequests.length > 0 ? (
                    friendRequests.map((item, index) => (
                        <FriendRequest
                            key={index}
                            item={item}
                            friendRequests={friendRequests}
                            setFriendRequest={setFriendRequests}
                        />
                    ))
                ) : (
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>No Friend Requests Found!!</Text>
                )
            }
        </View>
    )
}

export default FriendsScreen

const styles = StyleSheet.create({})