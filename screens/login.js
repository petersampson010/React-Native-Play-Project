import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { loginUser, resetTeamPlayers } from '../actions';
import { fetchUserByEmail, fetchAdminUser, fetchAllPlayersByAdminUserId, fetchStartersByUserId, fetchSubsByUserId, fetchAllPlayerUserJoinersByUserId } from '../functions/APIcalls'; 


class LoginScreen extends Component {


  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players
  
  state = {
    userObj: {
      email: 'G',
      password: 'G'
    },
    error: '',
    admin: false,
    loginComplete: false
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
      let user = await fetchUserByEmail(this.state.userObj);
      this.handleReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
    
  handleReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(user.admin_user_id)
        let starters = await fetchStartersByUserId(user.user_id);
        let subs = await fetchSubsByUserId(user.user_id);
        let puJoiners = await fetchAllPlayerUserJoinersByUserId(user.user_id);
        this.props.loginUser(user, clubPlayers, starters, subs, puJoiners);
        this.props.navigation.navigate('Home');
      } else {
        this.setState({email: 'A',
        password: 'A',
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

  const mapStateToProps = state => {
    return {
      loginComplete: state.loginComplete
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      loginUser: (user, clubPlayers, starters, subs, puJoiners) => dispatch(loginUser(user, clubPlayers, starters, subs, puJoiners)),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
      // addSub: player => dispatch(addSub(player)),
      // addStarter: player => dispatch(addStarter(player))
    }
  }

export default connect(null, mapDispatchToProps)(LoginScreen);