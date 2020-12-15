import React, { Component } from 'react';
import { View, Text, Button, Switch, TouchableHighlightBase } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers } from '../actions';
import { fetchUserByEmail, fetchAdminUserByEmail, fetchAllPlayersByAdminUserId, 
  fetchStartersByUserId, fetchSubsByUserId, fetchAllPlayerUserJoinersByUserId, 
  fetchAllUsersByAdminUserId, fetchAllGamesByAdminUserId, fetchLeague } 
  from '../functions/APIcalls'; 


class LoginScreen extends Component {


  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players
  
  state = {
    userObj: {
      email: '',
      password: ''
    },
    admin: false,
    loginComplete: false
  }
  
  formChange = (id, entry) => {
    this.setState({...this.state, 
      userObj: {...this.state.userObj,
        [id]: entry
      }
    })
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

  handleSubmit = () => {
    if (this.state.admin) {
      this.handleAdminSubmit();
    } else {
      this.handleUserSubmit();
    }
  }

  handleAdminSubmit = async() => {
    try {
      let aUser = await fetchAdminUserByEmail(this.state.userObj);
      this.handleAdminReturn(aUser);
    } catch(e) {
      console.warn(e);
    }
  }
  
  handleUserSubmit = async() => {
    try {
      let user = await fetchUserByEmail(this.state.userObj);
      this.handleUserReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
    
  handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(user.admin_user_id)
        let starters = await fetchStartersByUserId(user.user_id);
        let subs = await fetchSubsByUserId(user.user_id);
        let puJoiners = await fetchAllPlayerUserJoinersByUserId(user.user_id);
        let league = await fetchLeague(user.admin_user_id);
        let gameweek = await fetchLatestGameweekFromAdminUserId(user.admin_user_id);
        
        await this.props.loginUser(user, clubPlayers, starters, subs, puJoiners, league, gameweek);
        this.props.navigation.navigate('Home');
      } else {
        // this.setState({email: 'A',
        // password: 'A'});
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      console.warn(e);
    }
  }

  handleAdminReturn = async(aUser) => {
    try {
      if (aUser !== undefined && aUser !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(aUser.admin_user_id);
        let allUsers = await fetchAllUsersByAdminUserId(aUser.admin_user_id);
        let games = await fetchAllGamesByAdminUserId(aUser.admin_user_id);
        await this.props.loginAdminUser(aUser, clubPlayers, allUsers, games);
        this.props.navigation.navigate('AdminHome');
      } else {
        // this.setState({email: 'A',
        // password: 'A'});
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      console.warn(e);
    }
  }

    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Switch value={this.state.admin} onValueChange={this.toggleAdmin} />
            <View>
              <Input value={this.state.userObj.email} 
              onChangeText={value => this.formChange('email', value)}
              placeholder="email@address.com"
              leftIcon={{ type: 'font-awesome', name: 'envelope'}}
              label="Your email address"
              autoCapitalize="none"
              />
              <Input value={this.state.userObj.password} 
              onChangeText={value => this.formChange('password', value)}
              placeholder="Password"
              leftIcon={{type:'font-awesome', name: 'lock'}}
              label="Password"
              autoCapitalize="none"
              />
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
      loginUser: (user, clubPlayers, starters, subs, puJoiners, league) => dispatch(loginUser(user, clubPlayers, starters, subs, puJoiners, league)),
      loginAdminUser: (aUser, clubPlayers, allUsers, games) => dispatch(loginAdminUser(aUser, clubPlayers, allUsers, games)),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
    }
  }

export default connect(null, mapDispatchToProps)(LoginScreen);