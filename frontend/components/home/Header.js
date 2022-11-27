import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Toast from 'react-native-toast-message';

const Header = ({ navigation }) => {

    const [searchQuery, setQuery] = React.useState("");

    const onPress = () => {
        global._id = 0;
        global.signedUser = '';
        navigation.navigate('LoginScreen')
    }

    async function search(event) {
        event.preventDefault()
        // IP address is unique, expo/express can't resolve 'localhost' so you need to ipconfig in cmd and replace with the ipv4
        // This should be no issue once deployed on heroku
        const response = await fetch('http://' + global.ipv4 + ':3000/api/universalSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                Query: searchQuery
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json()
        navigation.navigate('SearchResults', { data : data})
    }

    return (
        <View style={styles.contianer}>
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.logo} source={require('../../Images/OCMlogo2.png')} />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                {/* <TextInput
                    style={styles.searchBar}
                    onChangeText={setQuery}
                    onSubmitEditing={search}
                    value={searchQuery}
                    placeholder="Search"
                /> */}
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                }}>Hello, {global.signedUser}!</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    logo: {
        // padding: 30,
        width: 50,
        height: 50,

        resizeMode: 'contain'
    },
    searchContainer: {
        flexDirection: 'row'
    },
    searchBar: {
        borderWidth: 1,
        borderRadius: 20,
        // backgroundColor: 'black',
        height: 40,
        width: 200,
        padding: 10,
    }
})

export default Header