import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem("authToken")
    //             if (token) navigation.replace('Home')
    //         } catch (err) {
    //             console.log("Error: ", err.message)
    //         }
    //     }

    //     checkLoginStatus()
    // }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }

        const headers = {
            "Content-Type": "application/json",
        }
        // 10.0.2.2
        axios.post(`http://192.168.29.254:8000/login`, user, headers).then(response => {
            Alert.alert("Login Successful!!")
            const token = response.data.token
            AsyncStorage.setItem("authToken", token)
            navigation.navigate('Home')
            setEmail('')
            setPassword('')
        }).catch(err => {
            Alert.alert('Error', err.message, [{ text: 'ok' }])
            console.log('Error: ', err.message)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4a55a2', fontSize: 17, fontWeight: '600' }}>Sign In</Text>
                    <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '600' }}>Sign In to Your Account</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text => setEmail(text))}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300 }}
                            placeholderTextColor='black'
                            placeholder='Enter Your Email'
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={(text => setPassword(text))}
                            secureTextEntry={true}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300 }}
                            placeholderTextColor='black'
                            placeholder='Password'
                        />
                    </View>

                    <Pressable
                        onPress={handleLogin}
                        style={{
                            width: 200,
                            backgroundColor: '#4a55a2',
                            padding: 15,
                            marginTop: 50,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: 6
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Register')} style={{
                        marginTop: 15
                    }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Don't have an account Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})