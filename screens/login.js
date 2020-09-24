import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../actions';
import { fetchAllUsers } from '../APIcalls'; 
// unsure on how to call the function from somewhere else  when i need the whole process to be asynchronous otherwise the function in this file will still try to send data to the reducer which is yet to be fetched


class LoginScreen extends Component {
  
  state = {
    email: "p",
    password: 'p',
    re_password: 'p',
    terms: false,
    error: ''
  }
  
  formChange = (id, entry) => {
    if (id==='email') {
      this.setState({...this.state, email: entry})
    } else if (id==='password') {
      this.setState({...this.state, password: entry})
    } else {
      this.setState({...this.state, re_password: entry})
    }
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, terms: !this.state.terms
    })
  }
  
  async handleSubmit() {
    const res = await fetch('http://localhost:3000/users');
    const json = await res.json();
    const user = await json[0];
    this.handleReturn(user);
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
              <TextInput value={this.state.email} onChange={el => this.formChange('email', el.nativeEvent.text)}/>
              <Text>Password</Text>
              <TextInput value={this.state.password} onChange={el => this.formChange('password', el.nativeEvent.text)}/>
              <Text>Re-enter Password</Text>
              <TextInput value={this.state.re_password} onChange={el => this.formChange('re_password', el.nativeEvent.text)}/>
              <Switch value={this.state.terms} onValueChange={this.toggleSwitch}/>
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

  // export default LoginScreen;
export default connect(null, mapDispatchToProps)(LoginScreen);