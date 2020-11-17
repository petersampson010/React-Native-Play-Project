import React, { Component } from 'react';
import PlayerGraphic from './playerGraphic';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { fullName } from '../functions/reusable';

class Pitch extends Component {
    state = { 
        modal: {
            active: false,
            player: {
                player_id: 1,
                first_name: "Steve",
                last_name: "Dunno",
                position: "1",
                price: 80,
                availability: "a",
                admin_user_id: 1
            }
        },
     }

    renderPlayers = () => {
        return this.props.team[position].map((player, i) => 
        <PlayerGraphic player={player} key={i}
        clickFcn={this.props.clickFcn}
        openModal={this.openModal}
        captain={false}
        vCaptain={false}/>
        )
    }

    openModal = player => {
        this.setState({...this.state,
            modal: {
                active: true,
                player
            }
        })
    }

    render() { 
        return ( 
            <View>
                <View style={styles.subHead}>
                    <Text style={{color: (this.state.budget>=0 ? 'green' : 'red')}}>Budget: {this.props.budget}m</Text>
                    <Button title="Confirm Transfers" onPress={this.props.update}/>
                </View>
                <Text style={{color: 'red'}}>{this.props.error}</Text>
                <View style={styles.pitch}>
                    <View style={styles.starters}>
                        <View style={styles.goalkeeper}>
                            {this.props.team[1].length>0 ? this.renderPlayers('1') : null}
                        </View>
                        <View style={styles.defender}>
                            {this.props.team[2].length>0 ? this.renderPlayers('2') : null}
                        </View>
                        <View style={styles.midfielder}>
                            {this.props.team[3].length>0 ? this.renderPlayers('3') : null}
                        </View>
                        <View style={styles.forward}>
                            {this.props.team[4].length>0 ? this.renderPlayers('4') : null}
                        </View>
                    </View>
                    <Modal  
                    transparent={true}
                    visible={this.state.modal.active}
                    >
                        <View style={styles.modal}>
                            <Text>{fullName(this.state.modal.player)}</Text>
                            <Text>{positionString(this.state.modal.player.position)}</Text>
                            <Text>£{this.state.modal.player.price}m</Text>
                            <Text>MAYBE SOME STATS AT SOME POINT</Text>
                            <Button title="Close modal" onPress={()=>this.setState({modal: {...this.state.modal, active: false}})}/>
                        </View>
                    </Modal>
                </View>
            </View>
         );
    }
}
 
export default Pitch;

const styles = StyleSheet.create({
    subHead: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pitch: {
        flex: 1,
        height: vh(60),
        backgroundColor: 'green'
    },
    modal: {
        position: "absolute",
        height: vh(30),
        width: vw(60),
        left: vw(15),
        top: vh(20),
        backgroundColor: 'red'
    },
    starters: {
        flex: 1
    },
    goalkeeper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    defender: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    midfielder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    forward: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})