import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyHeader from '../components/myHeader';

class TransfersScreen extends Component {
    state = {  }
    render() { 
        return ( 
            <View>
                <MyHeader title='Transfers' navigate={page=>this.props.navigation.navigate(page)}/>
            </View>
         );
    }
}
 
export default TransfersScreen;