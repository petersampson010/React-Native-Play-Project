import React, { Component } from 'react';
import MyHeader from '../../components/myHeader';
import { ScrollView, View, StyleSheet, ImageBackground, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import {vw, vh} from 'react-native-expo-viewport-units';
import { postPlayerUserJoiner } from '../../functions/APIcalls';
import { setTeamPlayers } from '../../actions';
import Pitch from '../../components/pitch';
import { positionString } from '../../functions/reusable';

class ntsScreen2 extends Component {
    state = { 
        budget: 600,
        num: 1,
        positionFilter: 0,
        error: '',
        selectedPlayers: {
            1: [],
            2: [],
            3: [],
            4: []
        }
    }

    select = player => {
        const { selectedPlayers } = this.state;
        let newBudget = this.state.budget - player.price;
        if (selectedPlayers.length>7) {
            this.setState({...this.state, error: 'too many players, please deselect a player before adding anymore'});
        } else if (newBudget<0) {
            this.setState({...this.state, error:  'not enough money'})
        } else {
            switch(player.position) {
                case 1:
                    if (selectedPlayers[1].length>0) {
                        this.setState({...this.state, error: 'Keeper already selected'});
                    } else {
                        this.setState({...this.state, error: '', selectedPlayers: {...this.state.selectedPlayers, 1: [...this.state.selectedPlayers[1], player]}, budget: newBudget})
                    };
                    break;
                case 2:
                    if (selectedPlayers[2].length>3) {
                        this.setState({...this.state, error: 'Too many defenders selected'});
                    } else {
                        this.setState({...this.state, error: '', selectedPlayers: {...this.state.selectedPlayers, 2: [...this.state.selectedPlayers[2], player]}, budget: newBudget})
                    };
                    break;
                case 3:
                    if (selectedPlayers[3].length>3) {
                        this.setState({...this.state, error: 'Too many midfielders selected'});
                    } else {
                        this.setState({...this.state, error: '', selectedPlayers: {...this.state.selectedPlayers, 3: [...this.state.selectedPlayers[3], player]}, budget: newBudget})
                    };
                    break;
                case 4:
                    if (selectedPlayers[4].length>2) {
                        this.setState({...this.state, error: 'Too many forwards selected'});
                    } else {
                        this.setState({...this.state, error: '', selectedPlayers: {...this.state.selectedPlayers, 4: [...this.state.selectedPlayers[4], player]}, budget: newBudget})
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    deselect = player => {
        let { selectedPlayers } = this.state
        this.setState({...this.state, budget: this.state.budget + player.price, selectedPlayers: {...selectedPlayers, [player.position]: selectedPlayers[player.position].filter(x=>x.player_id!==player.player_id)}});
    }

    allSelectedPlayers = () => [...this.state.selectedPlayers[1], ...this.state.selectedPlayers[2], ...this.state.selectedPlayers[3], ...this.state.selectedPlayers[4]]

    playerSelected = player => {
        return this.allSelectedPlayers().includes(player)
    };

    submitTeam = async() => {
        let selectedPlayers = this.allSelectedPlayers();
        try {
            if (selectedPlayers.length===8) {
                if (this.state.selectedPlayers[1].length===1) {
                    for (let i=0;i<8;i++) {
                        await postPlayerUserJoiner(selectedPlayers[i], this.props.user.user_id, i)
                    }
                    // this.props.setTeamPlayers(selectedPlayers);
                    this.props.navigation.navigate('Login');
                } else {
                    this.setState({...this.state, error: 'You need one goalkeeper selected'});
                }
            } else {
                this.setState({...this.state, error: 'You need 8 players in your team!'})
            }
        } catch(e) {
            console.warn(e);
        }
    }



    playerList = () => {

        switch(this.state.positionFilter) {
            case 0: 
                return this.props.clubPlayers.map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 1: 
                return this.props.clubPlayers.filter(x=>x.position===1).map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 2: 
                return this.props.clubPlayers.filter(x=>x.position===2).map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 3: 
                return this.props.clubPlayers.filter(x=>x.position===3).map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 4: 
                return this.props.clubPlayers.filter(x=>x.position===4).map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)   
            default: 
                console.log('no no no no no');
                break;
        }
    }

    componentDidMount() {
    }
    

    render() { 
        return ( 
            <ScrollView style={styles.container}>
                <MyHeader style={styles.header} title='Team Selection'/>
                <Text>Transfer Budget: £{this.state.budget}m</Text>
                <Pitch teamPlayers={this.state.selectedPlayers} clickFcn={this.deselect} setup={true}/>
                <Text style={{color: 'red'}}>{this.state.error}</Text>
                <Button title="Submit Team" onPress={this.submitTeam}/>
                <View style={styles.filter}>
                    <Picker style={styles.picker} selectedValue={this.state.positionFilter} onValueChange={value=>this.setState({...this.state, positionFilter: value})}>
                        <Picker.Item label="ANY" value={0}/>
                        <Picker.Item label="GK" value={1}/>
                        <Picker.Item label="DEF" value={2}/>
                        <Picker.Item label="MID" value={3}/>
                        <Picker.Item label="FWD" value={4}/>
                    </Picker>
                </View>
                <View style={styles.playersList}>
                    <Table>
                        <Row 
                        style={styles.tableHead} 
                        data={['Name', 'Position', 'Price, £m, 0-99']}
                        />
                        {this.playerList()}
                    </Table>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.clubPlayers,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTeamPlayers: players => dispatch(setTeamPlayers(players))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen2);

const styles = StyleSheet.create({
    playersList: {
        paddingBottom: vh(15)
    }
})