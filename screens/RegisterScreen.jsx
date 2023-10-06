import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const navigation = useNavigation()

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image
        }
        const headers = {
            "Content-Type": "application/json",
        }

        axios.post(`http://192.168.29.254:8000/register`, user, headers).then(response => {
            console.log(response)
            Alert.alert("Registration Successful!!")
            setName('')
            setEmail('')
            setPassword('')
            setImage('')
            navigation.navigate('Login')
        }).catch(err => {
            Alert.alert('Error Registering user', err.message, [{ text: 'ok' }])
            console.log('Error Registering user', err)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4a55a2', fontSize: 17, fontWeight: '600' }}>Register</Text>
                    <Text style={{ marginTop: 15, fontSize: 17, fontWeight: '600' }}>Register Your Account here!!</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(text => setName(text))}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300 }}
                            placeholderTextColor='black'
                            placeholder='Enter Your Name'
                            type='text'
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text => setEmail(text))}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300 }}
                            placeholderTextColor='black'
                            placeholder='Enter Your Email'
                            type='text'
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
                            type='text'
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Image</Text>
                        <TextInput
                            value={image}
                            onChangeText={(text => setImage(text))}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300 }}
                            placeholderTextColor='black'
                            placeholder='Upload Profile'
                            text='text'
                        />
                    </View>

                    <Pressable
                        onPress={handleRegister}
                        style={{
                            width: 200,
                            backgroundColor: '#4a55a2',
                            padding: 15,
                            marginTop: 50,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: 6
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{
                        marginTop: 15
                    }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Already have an account Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})