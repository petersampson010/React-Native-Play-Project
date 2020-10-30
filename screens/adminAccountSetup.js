import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setAdminUser } from '../actions';
import { fetchAllAdminUsers, postAdminUser } from '../functions/APIcalls'; 

class AdminAccountSetupScreen extends Component {

  state = {
    aUserObj: {
      email: "test",
      password: 'test',
      rePassword: 'test',
      clubName: 'test',
      terms: false
    },
    error: ''
  }
  
  formChange = (id, entry) => {
    if (id==='email') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, email: entry}})
    } else if (id==='password') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, password: entry}})
    } else if (id==='clubName') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, clubName: entry}})
    } else {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, rePassword: entry}})
    }
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, aUserObj: {...this.state.aUserObj, terms: !this.state.terms}
    })
  }

  checkValidAccount = (allAdminUsers) => {
    if (this.checkEmailUsername(allAdminUsers) && this.checkPassword()) {
      return true;
    } else {
      return false;
    }
  }

  checkEmailUsername = allAdminUsers => {
    let valid = true;
    // loop1:
    for (let i=0;i<allAdminUsers.length;i++) {
      let user = allAdminUsers[i];
      if (user.username===this.state.aUserObj.email) {
        this.setState({...this.state, error: "Email already exists, please try again or go back and try to login using this email"});
        valid = false;
        break;
      } else if (user.club_name===this.state.aUserObj.clubName) {
        this.setState({...this.state, error: "Club Name already in use, please try again or go back and try to login"});
        valid = false;
        break;
      }
    }
    return valid;
  }

  checkPassword = () => {
    if (this.state.aUserObj.password===this.state.aUserObj.rePassword) {
      return true;
    } else {
      this.setState({...this.state, error: "Passwords do not match, please try again!"});
      return false;
    }
  }
  
  handleSubmit = async() => {
    try {
      let allAdminUsers = await fetchAllAdminUsers();
      let validAccount = this.checkValidAccount(allAdminUsers);
      if (validAccount) {
        let adminUser = await postAdminUser(this.state.aUserObj);
        this.props.setAdminUser(adminUser);
        this.props.navigation.navigate('ClubSetup');
      }
    } catch(e) {
      console.warn(e);
    }
    return;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Admin Account Setup Screen</Text>
            <View>
              <Text>Email</Text>
              <TextInput value={this.state.aUserObj.email} onChange={el => this.formChange('email', el.nativeEvent.text)}/>
              <Text>Password</Text>
              <TextInput value={this.state.aUserObj.password} onChange={el => this.formChange('password', el.nativeEvent.text)}/>
              <Text>Re-enter Password</Text>
              <TextInput value={this.state.aUserObj.rePassword} onChange={el => this.formChange('rePassword', el.nativeEvent.text)}/>
              <Text>Club Name</Text>
              <TextInput value={this.state.aUserObj.clubName} onChange={el => this.formChange('clubName', el.nativeEvent.text)}/>
              <Switch value={this.state.aUserObj.terms} onValueChange={this.toggleSwitch}/>
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
            <Button title="Sign in" onPress={this.handleSubmit}/>
          </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAdminUser: aUser => dispatch(setAdminUser(aUser)),
  }
}

export default connect(null, mapDispatchToProps)(AdminAccountSetupScreen);