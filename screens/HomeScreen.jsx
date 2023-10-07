import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { UserType } from './userContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import User from '../components/User'

const HomeScreen = () => {
    const navigtion = useNavigation()
    const { userId, setUserId } = useContext(UserType)
    const [users, setUsers] = useState([])
    useLayoutEffect(() => {
        navigtion.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Swift Chat</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons
                        name="chatbox"
                        size={24}
                        color="black"
                    />
                    <Ionicons
                        onPress={() => navigtion.navigate("Friend Requests")}
                        name="people"
                        size={24}
                        color="black"
                    />
                </View>
            )
        })
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken")
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.userId
            setUserId(userId)

            axios.get(`http://192.168.29.254:8000/users/${userId}`).then(response => {
                setUsers(response.data)
            }).catch(err => {
                console.log("Error: ", err.message)
            })
        }

        fetchUsers()
    }, [])
    return (
        <View>
            <View style={{ padding: 10 }}>
                {
                    users.map((item, index) => (
                        <User key={index} item={item} />
                    ))
                }
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})