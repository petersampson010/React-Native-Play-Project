import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { reverseHomeScreenMenuVisibility } from '../actions';

class HomeScreen extends Component {
    state = {  }
    render() { 
        return ( 
            <Provider>
                <View>
                    <Text>{this.props.user.teamname}</Text>
                    <Menu
                    visible={this.props.homeScreenMenuVisibility}
                    onDismiss={this.props.reverseHomeScreenMenuVisibility}
                    anchor={<Button onPress={this.props.reverseHomeScreenMenuVisibility}>Show Menu</Button>}
                    >
                        <Menu.Item onPress={()=> this.props.navigation.navigate('Transfers')} title="Transfers"/>
                        <Menu.Item onPress={()=> this.props.navigation.navigate('League')} title="League"/>
                        {/* <Menu.Item onPress={()=> navigation.navigate('transfers')} title="Transfers"/> */}
                    </Menu>
                </View>
            </Provider>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        homeScreenMenuVisibility: state.homeScreenMenuVisibility
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reverseHomeScreenMenuVisibility: () => dispatch({
            type: 'REVERSEHOMESCREENMENUVISIBILITY'
        })
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);