import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker, Modal, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getPuId } from '../functions/reusable';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import PlayerGraphic from '../components/playerGraphic';
import { pickTeamUpdate } from '../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../functions/validity';
import _ from 'lodash';
import { patchPlayerUserJoinerSUBS, patchPlayerUserJoinerCAPTAINS } from '../functions/APIcalls';


class PickTeamScreen extends Component {
    state = {
        error: '',
        team: {
            '1': this.props.starters.filter(x=>x.position==='1'),
            '2': this.props.starters.filter(x=>x.position==='2'),
            '3': this.props.starters.filter(x=>x.position==='3'),
            '4': this.props.starters.filter(x=>x.position==='4')
        },
        subs: this.props.subs,
        captain: getCaptain(this.props.starters, this.props.puJoiners),
        vCaptain: getVCaptain(this.props.starters, this.props.puJoiners),
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
        }
    }

    transfer = player => {
        if (this.state.subs.includes(player)) {
            this.subIn(player);
        } else {
            this.subOut(player);
        }
    }

    subIn = player => {
        console.log('sub in')
        let position = player.position
        this.setState({
            ...this.state, 
            team: {
                ...this.state.team,
                [position]: [...this.state.team[position], player],
            },
            subs: this.state.subs.filter(x=>x!==player)
        })
    }

    subOut = player => {
        console.log('sub out')
        let position = player.position
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                [position]: this.state.team[position].filter(x=>x!==player),
            },
            subs: [...this.state.subs, player]
        })
    }

    renderSubs = () => {
        return this.state.subs.map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+7} 
        clickFcn={this.transfer} openModal={this.openModal}
        captain={this.state.captain===player}
        vCaptain={this.state.vCaptain===player}/>)
    }

    showState = () => {
        console.log(this.state)
    }

    openModal = player => {
        this.setState({...this.state, 
            modal: {
                active: true,
                player
            }
        })
    }

    renderPlayers = position => {
        return this.state.team[position].map((player, i) => 
        <PlayerGraphic player={player} key={i}
        clickFcn={this.transfer}
        openModal={this.openModal}
        captain={this.state.captain===player}
        vCaptain={this.state.vCaptain===player}/>
        )
    }

    setCaptain = player => {
        if (this.state.captain===player) {
            this.setState({...this.state, 
                captain: undefined
            })
        } else if (this.state.vCaptain===player) {
            this.setState({...this.state, 
                error: 'Player is already a Captain'})
        } else {
            this.setState({...this.state, 
                captain: player
            })
        }
    }

    setVCaptain = player => {
        if (this.state.vCaptain===player) {
            this.setState({...this.state, 
                vCaptain: undefined
            })
        } else if (this.state.captain===player) {
            this.setState({...this.state, 
            error: 'Player is already a Captain'})
        } else {
            this.setState({...this.state, 
                vCaptain: player
            })
        }
    }

    validateTeam = () => {
        let { result, error } = validatePickTeam(this.state.team)
        if (result) {
            this.updateTeam();
        }
    }
        
    updateTeam = async() => {
        let prevCaptain = getCaptain(this.props.starters, this.props.puJoiners);
        let prevVCaptain = getVCaptain(this.props.starters, this.props.puJoiners);
        let startToSub = _.difference(this.props.starters, playersObjToArray(this.state.team))
        let subToStart = _.difference(this.props.subs, this.state.subs);
        try {
            for (let i=0;i<subToStart.length;i++) {
                await patchPlayerUserJoinerSUBS(true, getPuId(startToSub[i], this.props.puJoiners));
                await patchPlayerUserJoinerSUBS(false, getPuId(subToStart[i], this.props.puJoiners));
            }
            if (prevCaptain!==this.state.captain) {
                await patchPlayerUserJoinerCAPTAINS(true, false, getPuId(this.state.captain, this.props.puJoiners));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(prevCaptain, this.props.puJoiners));
            } 
            if (prevVCaptain!==this.state.vCaptain) {
                await patchPlayerUserJoinerCAPTAINS(false, true, getPuId(this.state.vCaptain, this.props.puJoiners));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(prevVCaptain, this.props.puJoiners));
            }
            console.log('complete');
        } catch(e) {
            console.warn(e);
        }
    }

    teamChange = () =>
        (this.props.subs===this.state.subs && 
        getCaptain(this.props.starters, this.props.puJoiners)===this.state.captain &&
        getVCaptain(this.props.starters, this.props.puJoiners)===this.state.vCaptain
        ) ?
        false : true;

    render() { 
        return ( 
            <ScrollView>
                <MyHeader title='Pick Team' navigate={page=>this.props.navigation.navigate(page)}/>
                <Button onPress={this.showState} title="show state"/>
                <Text style={{color: 'red'}}>{this.state.error}</Text>
                <View style={styles.pitch}>
                    <View style={styles.starters}>
                        <View style={styles.goalkeeper}>
                            {this.renderPlayers('1')}
                        </View>
                        <View style={styles.defender}>
                            {this.renderPlayers('2')}
                        </View>
                        <View style={styles.midfielder}>
                            {this.renderPlayers('3')}
                        </View>
                        <View style={styles.forward}>
                            {this.renderPlayers('4')}
                        </View>
                    </View>
                    <Modal  
                    transparent={true}
                    visible={this.state.modal.active}
                    >
                        <View style={styles.modal}>
                            <CheckBox title="Captain"
                            checked={this.state.modal.player===this.state.captain}
                            onPress={()=>this.setCaptain(this.state.modal.player)}
                            />
                            <CheckBox title="Vice Captain"
                            checked={this.state.modal.player===this.state.vCaptain}
                            onPress={()=>this.setVCaptain(this.state.modal.player)}
                            />
                            <Text>{fullName(this.state.modal.player)}</Text>
                            <Text>{positionString(this.state.modal.player.position)}</Text>
                            <Text>£{this.state.modal.player.price}m</Text>
                            <Text>MAYBE SOME STATS AT SOME POINT</Text>
                            <Button title="Close modal" onPress={()=>this.setState({...this.state, modal: {...this.state.modal, active: false}})}/>

                        </View>
                    </Modal>
                </View>
                <View style={styles.subs}>
                    <Text>Pic of the user here (circular)</Text>
                    {this.renderSubs()}
                </View>
                {this.teamChange() ? <Button title="Update Team" onPress={()=>this.validateTeam()}/> : null}
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.subs,
        starters: state.starters,
        puJoiners: state.puJoiners,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pickTeamUpdate: (team, subs) => dispatch(pickTeamUpdate(team, subs))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);

const styles = StyleSheet.create({
    pitch: {
        flex: 1,
        height: vh(60),
        backgroundColor: 'green'
    },
    subs: {
        height: vh(11),
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly"
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