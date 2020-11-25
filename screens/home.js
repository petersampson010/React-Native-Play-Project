import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';

class HomeScreen extends Component {
    state = {  }
    render() { 
        return ( 
            <ScrollView>
                <MyHeader title="title of APP" navigate={page=>this.props.navigation.navigate(page)}/> 
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);