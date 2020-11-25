import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Header } from 'react-native-elements';;


class MyHeader extends Component {
    state = {}

     centerComponent = () => {
         return (
            <View style={styles.nav}>
                <Text onPress={()=>this.props.navigate('Transfers')}>Transfers</Text>
                <Text onPress={()=>this.props.navigate('League')}>League</Text>
                <Text onPress={()=>this.props.navigate('PickTeam')}>Pick Team</Text>
            </View>
         )
     }
    render() { 
        return ( 
            <Header
                leftComponent={{text: 'AppTitle/Logo', color: '#fff'}}
                centerComponent={this.centerComponent()}
                rightComponent={{onPress: () => this.props.navigate('Home'), icon: 'home', color: '#fff'}}
            />
         );
    }
}
 
export default MyHeader;

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})