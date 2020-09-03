import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../actions';


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
  
  handleSubmit = () => {
    console.log("HIT")
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => data.filter(x => x.username===this.state.email && x.password===this.state.password)[0])
    .then(user => this.handleReturn(user))
  }
    
  handleReturn = user => {
    console.log("here")
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

  const mapDispatchToProps = {
      login
  }

  // export default LoginScreen;
export default connect(null, mapDispatchToProps)(LoginScreen);