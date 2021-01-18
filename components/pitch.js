import React, { Component } from 'react';
import PlayerGraphic from './playerGraphic';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { fullName, positionString } from '../functions/reusable';
import { CheckBox } from 'react-native-elements';
import MyModal from './myModal';
import { connect } from 'react-redux';
import PitchHead from '../components/pitchHead';



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

    playerPG = (playerId) => this.props.type==="points" ? this.props.pgJoiners.filter(pg=>pg.player_id===playerId)[0] : false;

    renderPlayers = (position, j) => {
        return this.props.team[position].map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+j}
        clickFcn={this.props.clickFcn}
        openModal={this.openModal}
        captain={this.props.captain===player}
        vCaptain={this.props.vCaptain===player}
        playerPG={this.playerPG(player.player_id)}
        type={this.props.type}
        />)
    }

    renderSubs = j => {
        return this.props.subs.map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+j} 
        clickFcn={this.props.clickFcn} 
        openModal={this.openModal}
        captain={this.props.captain===player}
        vCaptain={this.props.vCaptain===player}
        type={this.props.type}
        />)
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
                <PitchHead
                budget={this.props.budget}
                type={this.props.type}
                update={this.props.update}
                />
                <View style={styles.pitch}>
                    <View style={styles.starters}>
                        <View style={styles.goalkeeper}>
                            {this.props.team[1].length>0 ? this.renderPlayers('1', 1) : null}
                        </View>
                        <View style={styles.defender}>
                            {this.props.team[2].length>0 ? this.renderPlayers('2', 2) : null}
                        </View>
                        <View style={styles.midfielder}>
                            {this.props.team[3].length>0 ? this.renderPlayers('3', 6) : null}
                        </View>
                        <View style={styles.forward}>
                            {this.props.team[4].length>0 ? this.renderPlayers('4', 10) : null}
                        </View>
                    </View>
                    <MyModal 
                    visible={this.state.modal.active}
                    height={vh(70)}
                    width={vw(60)}
                    closeModalFcn={()=>this.setState({modal: {...this.state.modal, active: false}})}
                    jsx={<View>
                        <Text>{fullName(this.state.modal.player)}</Text>
                        <Text>{positionString(this.state.modal.player.position)}</Text>
                        <Text>£{this.state.modal.player.price}m</Text>
                        <Text>MAYBE SOME STATS AT SOME POINT</Text>
                        {this.props.type==="pickTeam" ? <CheckBox
                        checked={this.props.captain===this.state.modal.player}
                        title="Captain"
                        onPress={()=>this.props.setCaptain(this.state.modal.player)} 
                        /> : null}
                        {this.props.type==="pickTeam" ? <CheckBox
                        checked={this.props.vCaptain===this.state.modal.player}
                        title="Vice - Captain"
                        onPress={()=>this.props.setVCaptain(this.state.modal.player)} 
                        /> : null}
                    </View>}
                    buttonOptions={[]}
                    />
                </View>
                {this.props.subs ? <View style={styles.subs}>
                    {this.renderSubs(12)}
                </View> : null}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        pgJoiners: state.joiners.pgJoiners
    }
}
 
export default connect(mapStateToProps)(Pitch);

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
    },
    subs: {
        height: vh(11),
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
})