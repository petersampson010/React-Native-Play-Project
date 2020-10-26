import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../actions';
import { fetchUser } from '../APIcalls'; 
// unsure on how to call the function from somewhere else  when i need the whole process to be asynchronous otherwise the function in this file will still try to send data to the reducer which is yet to be fetched


class LoginScreen extends Component {
  
  state = {
    userObj: {
      email: "p",
      password: 'p',
      re_password: 'p',
      terms: false
    },
    error: ''
  }
  
  formChange = (id, entry) => {
    if (id==='email') {
      this.setState({...this.state, userObj: {...this.state.userObj, email: entry}})
    } else if (id==='password') {
      this.setState({...this.state, userObj: {...this.state.userObj, password: entry}})
    } else {
      this.setState({...this.state, userObj: {...this.state.userObj, re_password: entry}})
    }
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, userObj: {...this.state.userObj, terms: !this.state.terms}
    })
  }
  
  handleSubmit = async() => {
    try {
      let user = await fetchUser(this.state.userObj);
      this.handleReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
    
  handleReturn = user => {
    console.log("here: " + user);
    if (user !== undefined && user !== null) {
      this.props.login(user);
      this.props.navigation.navigate('Home');
    } else {
      this.setState({email: "p",
      password: 'p',
      re_password: 'p',
      terms: false, 
      error: 'login failed, please try again!'})
    }
  }

    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <View>
              <Text>Email</Text>
              <TextInput value={this.state.userObj.email} onChange={el => this.formChange('email', el.nativeEvent.text)}/>
              <Text>Password</Text>
              <TextInput value={this.state.userObj.password} onChange={el => this.formChange('password', el.nativeEvent.text)}/>
              <Text>Re-enter Password</Text>
              <TextInput value={this.state.userObj.re_password} onChange={el => this.formChange('re_password', el.nativeEvent.text)}/>
              <Switch value={this.state.userObj.terms} onValueChange={this.toggleSwitch}/>
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
            <Button title="Sign in" onPress={this.handleSubmit}/>
          </View>
        );
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      login: user => dispatch(login(user)),

    }
  }

export default connect(null, mapDispatchToProps)(LoginScreen);