import React, { Component } from 'react';
import PlayerGraphic from '../playerGraphic';
import { View, Text, StyleSheet, Modal, Button, TouchableHighlightBase } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { fullName, positionString } from '../../functions/reusable';
import { CheckBox } from 'react-native-elements';
import MyModal from '../myModal';
import { connect } from 'react-redux';
import PitchHead from '../pitchHead';
import MenuDrawer from 'react-native-side-drawer';
import { defender, forward, goalkeeper, midfielder, pitch, pitchContainer, starters, subs } from './style';



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
        slideDrawer: false,
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

    drawerContent = () => {
        return (<View style={{backgroundColor: 'red'}}>
            <Button title="close drawer" onPress={()=>this.setState({...this.state, slideDrawer: false})}/>
        </View>)
    }


    render() { 
        return ( 
            <View>
                <PitchHead
                budget={this.props.budget}
                type={this.props.type}
                update={this.props.update}
                />
                <View style={pitchContainer}>
                    <MenuDrawer
                        open={this.state.slideDrawer}
                        drawerContent={this.drawerContent()}
                        drawerPercentage={45}
                        animationTime={250}
                        overlay={true}
                        opacity={0.7}
                        position="right"
                    >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={pitch}>
                                <View style={starters}>
                                    <View style={goalkeeper}>
                                        {this.props.team[1].length>0 ? this.renderPlayers('1', 1) : null}
                                    </View>
                                    <View style={defender}>
                                        {this.props.team[2].length>0 ? this.renderPlayers('2', 2) : null}
                                    </View>
                                    <View style={midfielder}>
                                        {this.props.team[3].length>0 ? this.renderPlayers('3', 6) : null}
                                    </View>
                                    <View style={forward}>
                                        {this.props.team[4].length>0 ? this.renderPlayers('4', 10) : null}
                                    </View>
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
                            <Button title="open drawer" onPress={()=>this.setState({...this.state, slideDrawer: true})}/>

                        </View>

                    </MenuDrawer>
                </View>
                {this.props.subs ? <View style={subs}>
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