import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import { Table, Row } from 'react-native-table-component';
import {vw, vh} from 'react-native-expo-viewport-units';
import { allSelectedPlayerIds, fullName, positionString } from '../functions/reusable';
import PlayerGraphic from '../components/playerGraphic';
import Pitch from '../components/pitch';
import PlayersList from '../components/playersList';
import { showMessage } from 'react-native-flash-message';



class TransfersScreen extends Component {
    state = { 
        team: {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        },

        positionFilter: '0',
        budget: this.props.budget,
    }

    // componentDidMount() {
    //     // console.log(typeof this.props.budget)
    // }


    transfer = player => {
        let { player_id, position, price } = player;
        let newBudget = this.state.budget;
        if (this.playerSelected(player)) {
            newBudget += price;
            this.setState({...this.state,
                team: {...this.state.team,
                    [position]: this.state.team[position].filter(x=>x.player_id!==player_id)
                },
                budget: newBudget
            })
        } else {
            if (this.state.team[position].length>3) {
                showMessage({
                    message: "Too many palyers in this position",
                    type: "warning"
                })
            } else {
                newBudget -= price;
                this.setState({...this.state,
                    team: {...this.state.team,
                        [position]: [...this.state.team[position], player]
                    },
                    budget: newBudget
                })
            }
        }
    }   

    playerSelected = player => {
        return allSelectedPlayerIds(this.state.team).includes(player.player_id);
    };

    render() { 
        return ( 
            <ScrollView>
                <MyHeader title='Transfers' navigate={page=>this.props.navigation.navigate(page)}/>
                <Pitch 
                type="transfers"
                update={this.confirmUpdates}
                budget={this.state.budget}
                team={this.state.team}
                clickFcn={this.transfer}
                subs={false}
                captain={false}
                vCaptain={false}
                />
                <PlayersList
                allSelectedPlayerIds={allSelectedPlayerIds(this.state.team)}
                clickFcn={this.transfer}
                />
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.players.starters.concat(state.players.subs),
        clubPlayers: state.players.clubPlayers,
        budget: state.endUser.user.budget
    }
}
 
export default connect(mapStateToProps)(TransfersScreen);

const styles = StyleSheet.create({
})