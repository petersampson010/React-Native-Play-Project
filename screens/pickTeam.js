import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import Pitch from '../components/pitch';
import PlayerGraphic from '../components/playerGraphic';
import { isCaptain, playersArrayToObj, playersObjToArray, isVCaptain } from '../functions/reusable';
import { updateTeam } from '../actions';

class PickTeamScreen extends Component {
    state = {
        team: {
            1: [],
            2: [],
            3: [],
            4: []
        },
        subs: [],
        captain: null,
        vCaptain: null,
        newCaptain: null,
        newVCaptain: null,
        update: false,
        error: ''
    }

    componentDidMount() {
        let { starters, subs, puJoiners } = this.props;
        for (let i=0;i<starters.length;i++) {
            console.log(this.state.team[2][0])
            let player = starters[i];
            let position = player.position
            if (isCaptain(player, puJoiners)) {
                this.setState({...this.state, captain: player, newCaptain: player,
                    team: {...this.state.team, position: [...this.state.team[position], player]}
                })
            } else if (isVCaptain(player, puJoiners)) {
                this.setState({...this.state, vCaptain: player, newVCaptain: player, 
                    team: {...this.state.team, position: [...this.state.team[position], player]}
                })
            } else {
                this.setState({...this.state, 
                    team: {...this.state.team, position: [...this.state.team[position], player]}
                })
            }
        }
        this.setState({...this.state,
            subs: subs
        })
    }

    // componentDidUpdate() {
    //     if (this.props.subs===this.state.team.subs &&
    //         this.state.captain===this.state.newCaptain &&
    //         this.state.vCaptain===this.state.newVCaptain) {
    //     } else {
    //         this.setState({...this.state, update: true})
    //     }
    // }

    transfer = player => {
        console.log(this.state.subs);
        if (this.state.subs.includes(player)) {
            console.log('1');
            this.subIn(player);
        } else {
            console.log('2')
            this.subOut(player);
        }
    }

    subIn = player => {
        this.setState({
            ...this.state, 
            subs: this.state.subs.filter(x=>x!==player),
            team: {
                ...this.state.team,
                [player.position]: [...this.state.team[player.position], player]
            }
        })
    }

    subOut = player => {
        console.log(this.state.subs);
        console.log('break');
        // console.log(newSubs);
        let position = player.position
        this.setState({
            ...this.state,
            subs: [...this.state.subs, player],
            team: {
                ...this.state.team,
                [position]: this.state.team[position].filter(x=>x!==player)
            }
        })
    }

    renderSubs = () => {
        return this.state.subs.map((player, i) => <PlayerGraphic player={player} key={i} num={i+7} clickFcn={this.transfer}/>)
    }

    updateTeam = () => {
        if (this.state.subs===2) {
            this.props.updateTeam()
        } else {
            this.setState({...this.state, error: 'You need 6 starting players!'})
        }
    }

    pickerItems = () => {
        return playersObjToArray(this.state.team).map((player, i) => {
            return <Picker.Item label={player.first_name + ' ' + player.last_name} value={player} key={i}/>
        })
    }

    render() { 
        return ( 
            <ScrollView>
                <MyHeader title='Pick Team' navigate={page=>this.props.navigation.navigate(page)}/>
                <Picker selectedValue={this.state.newCaptain} onValueChange={()=>this.setState({...this.state, newCaptain: player})}>
                    {this.pickerItems()}
                </Picker>
                <Picker selectedValue={this.state.newVCaptain} onValueChange={()=>this.setState({...this.state, newVCaptain: player})}>
                    {this.pickerItems()}
                </Picker>
                <Pitch teamPlayers={this.state.team} clickFcn={this.transfer} setup={false}/>
                <View style={styles.subs}>
                    {this.renderSubs()}
                </View>
                <Text stlye={{color: 'red'}}>{this.state.error}</Text>
                {this.state.update ? <Button title="Update Team" onPress={this.props.updateTeam}/> : null}
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.subs,
        starters: state.starters,
        puJoiners: state.puJoiners
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTeam: () => dispatch(updateTeam(this.state.team, this.state.subs))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);

const styles = StyleSheet.create({
    subs: {
        height: vh(11),
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly"
    }
})