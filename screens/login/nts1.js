import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Switch, Button, StyleSheet, TextInput } from 'react-native';
import { fetchAdminUserById, fetchAllAdminUsers, fetchAllPlayersByAdminUserId, fetchAllUsers, postUser } from '../../functions/APIcalls';
import { validateUser } from '../../functions/validity';
import Header from '../../components/header/header';
import { setAdminUser, setClubPlayers, setUser } from '../../actions';
import { showMessage } from 'react-native-flash-message';
import { screenContainer } from '../../styles/global';
import { input, inputField, inputFieldsContainer, loginHead, switchText, textLabel } from './style';



class ntsScreen1 extends Component {

  state = {
    userObj: {
      email: '',
      teamName: '',
      password: '',
      rePassword: '',
      clubId: '',
      terms: ''
    },
    signedUp: false,
  }

  formChange = (id, entry) => {
    switch(id) {
      case 'email': 
        this.setState({...this.state, userObj: {...this.state.userObj, email: entry}})
        break;
      case 'teamName': 
        this.setState({...this.state, userObj: {...this.state.userObj, teamName: entry}})
        break;
      case 'password': 
        this.setState({...this.state, userObj: {...this.state.userObj, password: entry}})
        break;
      case 'rePassword': 
        this.setState({...this.state, userObj: {...this.state.userObj, rePassword: entry}})
        break;
      case 'clubID':
        this.setState({...this.state, userObj: {...this.state.userObj, clubId: entry}})
    }
  }

  fetchInfo = async() => {
    const { userObj } = this.state;
    try {
      let allUsers = await fetchAllUsers();
      let allAdminUsers = await fetchAllAdminUsers();
      let aUser = await fetchAdminUserById(parseInt(userObj.clubId));
      if (validateUser(allUsers, aUser, userObj)) {
        this.handleSubmit(allUsers, allAdminUsers, aUser);
      }
    } catch(e) {
      showMessage({
        message: "Login failed, please try again",
        description: "It is most likely, you have an incorrect club ID. Please check this and report the issue if it continues",
        type: "danger"
      })
    }
  }

  handleSubmit = async(allUsers, allAdminUsers, aUser) => {
    const { userObj } = this.state;
    try {
        await postUser(userObj)
        .then(result=>{
          if (result.transfers===0) {
            this.setState({signedUp: true});
            this.props.setUser(result);
            this.props.setAdminUser(aUser);
            fetchAllPlayersByAdminUserId(aUser.admin_user_id)
            .then(players => this.props.setClubPlayers(players))
            .then(() => this.props.navigation.navigate('nts2'));
          } else {
            console.warn("fetch return: ", result)
          }})
    } catch(e) {
      console.warn(e);
    }
  }

  render() {
    return (
      <View style={screenContainer}>
            <View style={inputFieldsContainer}>
              <Text style={loginHead}>Create Account</Text>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputField}>
                <TextInput style={input}
                value={this.state.userObj.email} 
                onChangeText={value => this.formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Text style={textLabel}>Enter your team name</Text>
              <View style={inputField}>
                <TextInput style={input}
                value={this.state.userObj.teamName} 
                onChangeText={value => this.formChange('teamName', value)}
                placeholder="Sunday Funday"
                placeholderTextColor='#d1d2d6'
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputField}>
                <TextInput style={input}
                value={this.state.userObj.password} 
                onChangeText={value => this.formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <Text style={textLabel}>Re-enter your password</Text>
              <View style={inputField}>
                <TextInput style={input}
                value={this.state.userObj.rePassword} 
                onChangeText={value => this.formChange('rePassword', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <Text style={textLabel}>Club ID</Text>
              <View style={inputField}>
                <TextInput style={input}
                value={this.state.userObj.clubId} 
                onChangeText={value => this.formChange('clubID', value)}
                placeholder="24"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Button title="Sign Up" onPress={this.fetchInfo}/>
            </View>
          </View>
      // <View style={styles.container}>
      //   <Header title='Create Account'/>
      //   <View style={styles.formContainer}>
      //     <Text>Email</Text>
      //     <Text>Club Name</Text
      //     <TextInput value={this.state.userObj.rePassword} onChange={el => this.formChange('rePassword', el.nativeEvent.text)}/>
      //     <Text>Club ID</Text>
      //     <TextInput value={this.state.userObj.clubId} onChange={el => this.formChange('clubID', el.nativeEvent.text)}/>
      //     <Button title="Sign Up" onPress={this.fetchInfo}/>
      //   </View>
      // </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    setAdminUser: aUser => dispatch(setAdminUser(aUser)),
    setClubPlayers: players => dispatch(setClubPlayers(players))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen1);

const styles = StyleSheet.create({
  container: {
  },
  formContainer: {
    marginTop: '20%',
    marginLeft: '10%',
    marginRight: '10%'
  }
})