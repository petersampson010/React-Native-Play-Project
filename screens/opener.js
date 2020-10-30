import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class OpenerScreen extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'coral'}}>
            <View style={{alignItems: 'center', flex: 1, backgroundColor: 'white', width: '60%', opacity: 0.7, marginTop: 6, borderRadius: 16}}>
                <Text style={{fontSize: 20}}>Sunday League Fantasy</Text>
            </View>
            <View style={{flex: 24, flexDirection: 'row', justifyContent: "space-evenly", flexWrap: 'wrap', width: '100%', position: 'relative', top: 6}}>
                <View style={styles.optionContainer}>
                    <Button title="Sign In" onPress={()=>this.props.navigation.navigate('Login')}/>
                    <Text style={styles.text}></Text>
                </View>
                <View style={styles.optionContainer}>
                    <Button title="Admin Account Setup" onPress={()=>this.props.navigation.navigate('AdminAccountSetup')}/>
                    <Text style={styles.text}>Dont have an account for your club, set up a new admin account and team for your players to join</Text>
                </View>
                <View style={styles.optionContainer}>
                    <Button title="New Fantasy Team" onPress={()=>this.props.navigation.navigate('nts1')}/>
                    <Text style={styles.text}>Does your club already have an account with us, but you dont have a team. Set one up here</Text>
                </View>
                <View style={styles.optionContainer}>
                    <Button title="Contact Us"/>
                    <Text style={styles.text}>Please get in touch, we want to here from you</Text>
                </View>
            </View>
          </View>
        );

    }
  }

export default OpenerScreen

const styles = StyleSheet.create({
    optionContainer: {
        height: '33%', 
        width: '35%', 
        backgroundColor: 'black', 
        marginTop: 38, 
        borderRadius: 40
    },
    text: {
        fontSize: 14,
        color: 'coral',
        textAlign: "center"
    }
})

