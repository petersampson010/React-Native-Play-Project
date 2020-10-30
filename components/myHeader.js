import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Header } from 'react-native-elements';;
import { connect } from 'react-redux';
import { reverseMenu } from '../actions';



class MyHeader extends Component {
    state = {}

     centerComponent = () => {
         return (
            <View style={styles.nav}>
                <Text onPress={()=>this.props.navigate('Transfers')}>Transfers</Text>
                <Text onPress={()=>this.props.navigate('League')}>League</Text>
            </View>
         )
     }
    render() { 
        return ( 
            <Header
                leftComponent={{text: this.props.title, color: '#fff'}}
                centerComponent={this.centerComponent()}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
         );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reverseMenu: () => dispatch(reverseMenu())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MyHeader);

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})