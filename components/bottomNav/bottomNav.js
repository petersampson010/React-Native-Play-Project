import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { navContainer, navButton } from './style';
import NavSection from './navSection';

class BottomNav extends Component {
    state = {  }

    render() {
        const pages = ['Home', 'PickTeam', 'Points', 'Transfers'];
        return ( 
            <View style={navContainer}>
                {pages.map(p=>
                <NavSection 
                navigate={this.props.navigate} 
                page={p}/>
                )}
            </View>
         );
    }
}
 
export default BottomNav;

// const styles = StyleSheet.create({
//     navContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         position: 'absolute',
//         height: vh(9),
//         width: vw(100),
//         backgroundColor: 'red',
//         top: vh(82)
//     }
// })