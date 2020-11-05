import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { fetchAdminUserById, fetchAllAdminUsers, fetchAllPlayersOfAdminUser, fetchAllUsers, postUser } from '../../functions/APIcalls';
import { validateUser } from '../../functions/validity';
import MyHeader from '../../components/myHeader';
import { setAdminUser, setClubPlayers, setUser } from '../../actions';


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
    error: 'make sure this updates at some point with errors',
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
      let { result, error } = validateUser(allUsers, allAdminUsers, userObj);
      if (result) {
        this.handleSubmit(allUsers, allAdminUsers, aUser);
      } else {
        this.setState({...this.state, error});
      }
    } catch(e) {
      this.setState({...this.state, error: 'Network Issues: Please try again in 5 minutes'});
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
            fetchAllPlayersOfAdminUser(aUser.admin_user_id)
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
      <View style={styles.container}>
        <MyHeader title='Create Account'/>
        <View style={styles.formContainer}>
          <Text>Email</Text>
          <TextInput value={this.state.userObj.email} onChange={el => this.formChange('email', el.nativeEvent.text)}/>
          <Text>Club Name</Text>
          <TextInput value={this.state.userObj.teamName} onChange={el => this.formChange('teamName', el.nativeEvent.text)}/>
          <Text>Password</Text>
          <TextInput value={this.state.userObj.password} onChange={el => this.formChange('password', el.nativeEvent.text)}/>
          <Text>Re-enter Password</Text>
          <TextInput value={this.state.userObj.rePassword} onChange={el => this.formChange('rePassword', el.nativeEvent.text)}/>
          <Text>Club ID</Text>
          <TextInput value={this.state.userObj.clubId} onChange={el => this.formChange('clubID', el.nativeEvent.text)}/>
          <Text style={{color: 'red'}}>{this.state.error}</Text>
          <Button title="Sign Up" onPress={this.fetchInfo}/>
        </View>
      </View>
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