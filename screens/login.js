import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login, addTeamPlayer } from '../actions';
import { fetchUser, fetchAdminUser, fetchPlayerFromId, fetchAllPlayerUserJoinersOfUser } from '../functions/APIcalls'; 


class LoginScreen extends Component {
  
  state = {
    userObj: {
      email: 'V',
      password: 'V'
    },
    error: '',
    admin: false
  }
  
  formChange = (id, entry) => {
    if (id==='email') {
      this.setState({...this.state, userObj: {...this.state.userObj, email: entry}})
    } else if (id==='password') {
      this.setState({...this.state, userObj: {...this.state.userObj, password: entry}})
    }
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, userObj: {...this.state.userObj, terms: !this.state.userObj.terms}
    })
  }

  toggleAdmin = () => {
    this.setState({
      ...this.state, admin: !this.state.admin
    })
  }

  handleSubmit = ()  => {
    if (this.state.admin) {
      this.handleAdminSubmit()
    } else {
      this.handleUserSubmit()
    }
  }

  handleAdminSubmit = async() => {
    try {
      let user = await fetchAdminUser(this.state.userObj);
      this.handleReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
  
  handleUserSubmit = async() => {
    try {
      let user = await fetchUser(this.state.userObj);
      this.handleReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
    
  handleReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        this.props.login(user);
        let puJoiners = await fetchAllPlayerUserJoinersOfUser(user.user_id);
        for (let i=0;i<puJoiners.length;i++) {
          let player = await fetchPlayerFromId(puJoiners[i].player_id);
          this.props.addTeamPlayer(player);
        }
        this.props.navigation.navigate('Home');
      } else {
        this.setState({email: 'V',
        password: 'V',
        error: 'login failed, please try again!'});
      }
    } catch(e) {
      console.warn(e);
    }
  }

    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Switch value={this.state.admin} onValueChange={this.toggleAdmin} />
            <Text>Login Screen</Text>
            <View>
              <Text>Email</Text>
              <TextInput value={this.state.userObj.email} onChange={el => this.formChange('email', el.nativeEvent.text)}/>
              <Text>Password</Text>
              <TextInput value={this.state.userObj.password} onChange={el => this.formChange('password', el.nativeEvent.text)}/>
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
      addTeamPlayer: player => dispatch(addTeamPlayer(player))
    }
  }

export default connect(null, mapDispatchToProps)(LoginScreen);