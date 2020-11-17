import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import { Table, Row } from 'react-native-table-component';
import {vw, vh} from 'react-native-expo-viewport-units';
import { fullName, positionString } from '../functions/reusable';
import PlayerGraphic from '../components/playerGraphic';



class TransfersScreen extends Component {
    state = { 
        error: '',
        team: {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        },

        positionFilter: '0',
        budget: parseInt(this.props.budget),
    }

    renderPlayers = position => {
        return this.state.team[position].map((player, i) => 
        <PlayerGraphic player={player} key={i}
        clickFcn={this.transfer}
        openModal={this.openModal}
        captain={false}
        vCaptain={false}/>
        )
    }

    transfer = player => {
        console.log(this.playerSelected(player));
        let { player_id, position } = player;
        if (this.playerSelected(player)) {
            this.setState({...this.state,
                team: {...this.state.team,
                    [position]: this.state.team[position].filter(x=>x.player_id!==player_id)
                }
            })
        } else {
            this.setState({...this.state,
                team: {...this.state.team,
                    [position]: [...this.state.team[position], player]
                }
            })
        }
    }

    openModal = player => {
        this.setState({...this.state,
            modal: {
                active: true,
                player
            }
        })
    }

    

    playerSelected = player => {
        return this.props.allSelectedPlayerIds().includes(player.player_id);
    };
    
    componentDidMount() {
        console.log(this.props.allSelectedPlayerIds);
    }

    render() { 
        return ( 
            <ScrollView>
                {/* <MyHeader title='Transfers' navigate={page=>this.props.navigation.navigate(page)}/>
                <View style={styles.subHead}>
                    <Text style={{color: (this.state.budget>=0 ? 'green' : 'red')}}>Budget: {this.state.budget}m</Text>
                    <Button title="Confirm Transfers" onPress={this.transfersUpdate}/>
                </View>
                {/* <Button onPress={this.showState} title="show state"/> */}
                {/* {this.teamChange() ? <Button title="Update Team" onPress={()=>this.validateTeam()}/> : null} */}
                {/* <Text style={{color: 'red'}}>{this.state.error}</Text>
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
                    > */}
                        {/* <View style={styles.modal}>
                            <Text>{fullName(this.state.modal.player)}</Text>
                            <Text>{positionString(this.state.modal.player.position)}</Text>
                            <Text>£{this.state.modal.player.price}m</Text>
                            <Text>MAYBE SOME STATS AT SOME POINT</Text>
                            <Button title="Close modal" onPress={()=>this.setState({...this.state, modal: {...this.state.modal, active: false}})}/>
                        </View>
                    </Modal>
                </View>
                <View style={styles.filter}>
                    <Picker style={styles.picker} selectedValue={this.state.positionFilter} onValueChange={value=>this.setState({...this.state, positionFilter: value})}>
                        <Picker.Item label="ANY" value='0'/>
                        <Picker.Item label="GK" value='1'/>
                        <Picker.Item label="DEF" value='2'/>
                        <Picker.Item label="MID" value='3'/>
                        <Picker.Item label="FWD" value='4'/>
                    </Picker>
                </View>
                <View style={styles.playersList}>
                    <Table>
                        <Row 
                        style={styles.tableHead} 
                        data={['Name', 'Position', 'Price, £m, 0-99']}
                        />
                        {this.playerList()}
                    </Table> */}
                {/* </View> */}
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.starters.concat(state.subs),
        clubPlayers: state.clubPlayers,
        budget: state.user.budget
    }
}
 
export default connect(mapStateToProps)(TransfersScreen);

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
    },

})