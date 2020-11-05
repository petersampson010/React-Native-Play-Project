import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyHeader from '../components/myHeader';

class LeagueScreen extends Component {
    state = {  }
    render() { 
        return ( 
            <View>
                <MyHeader title='League' navigate={page=>this.props.navigation.navigate(page)}/>
            </View>
         );
    }
}
 
export default LeagueScreen;