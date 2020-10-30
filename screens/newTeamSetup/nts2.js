import React, { Component } from 'react';
import MyHeader from '../../components/myHeader';
import { ScrollView, View, StyleSheet, ImageBackground, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import pitchImg from '../../images/pitch.png';
import PlayerGraphic from '../../components/playerGraphic';
import {vw, vh} from 'react-native-expo-viewport-units';
import { postPlayerUserJoiner } from '../../functions/APIcalls';


class ntsScreen2 extends Component {
    state = { 
        position: 'any',
        num: 1,
        positionFilter: 'any',
        error: '',
        selectedPlayers: {
            goalkeeper: [],
            defender: [],
            midfielder: [],
            forward: []
        }
    }

    select = player => {
        const { selectedPlayers } = this.state;
        if (selectedPlayers.length>8) {
            console.warn('too many players, please deselect a player before addinganymore');
        } else {
            switch(player.position) {
                case 'goalkeeper':
                    if (selectedPlayers.goalkeeper.length>0) {
                        console.warn('keeper already selected')
                    } else {
                        this.setState({...this.state, selectedPlayers: {...this.state.selectedPlayers, goalkeeper: [...this.state.selectedPlayers.goalkeeper, player]}})
                    };
                    break;
                case 'goalkeeper':
                    if (selectedPlayers.goalkeeper.length>0) {
                        console.warn('keeper already selected')
                    } else {
                        this.setState({...this.state, selectedPlayers: {...this.state.selectedPlayers, goalkeeper: [...this.state.selectedPlayers.goalkeeper, player]}})
                    };
                    break;
                case 'defender':
                    if (selectedPlayers.defender.length>3) {
                        console.warn('too many defenders selected')
                    } else {
                        this.setState({...this.state, selectedPlayers: {...this.state.selectedPlayers, defender: [...this.state.selectedPlayers.defender, player]}})
                    };
                    break;
                case 'midfielder':
                    if (selectedPlayers.midfielder.length>3) {
                        console.warn('too many midfielders selected')
                    } else {
                        this.setState({...this.state, selectedPlayers: {...this.state.selectedPlayers, midfielder: [...this.state.selectedPlayers.midfielder, player]}})
                    };
                    break;
                case 'forward':
                    if (selectedPlayers.forward.length>2) {
                        console.warn('keeper already selected')
                    } else {
                        this.setState({...this.state, selectedPlayers: {...this.state.selectedPlayers, forward: [...this.state.selectedPlayers.forward, player]}})
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    deselect = player => {
        let { selectedPlayers } = this.state
        this.setState({...this.state, selectedPlayers: {...selectedPlayers, [player.position]: selectedPlayers[player.position].filter(x=>x.player_id!==player.player_id)}});
    }

    allSelectedPlayers = () => [...this.state.selectedPlayers.goalkeeper, ...this.state.selectedPlayers.defender, ...this.state.selectedPlayers.midfielder, ...this.state.selectedPlayers.forward]

    playerSelected = player => {
        return this.allSelectedPlayers().includes(player)
    };

    submitTeam = async() => {
        let selectedPlayers = this.allSelectedPlayers();
        try {
            if (selectedPlayers.length===7) {
                if (this.state.selectedPlayers.goalkeeper.length===1) {
                    for (let i=0;i<7;i++) {
                        await postPlayerUserJoiner(selectedPlayers[i], this.props.user.user_id)
                        .then(console.log)
                    }
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({...this.state, error: 'You need one goalkeeper selected'});
                }
            } else {
                this.setState({...this.state, error: 'You need 7 players in your team!'})
            }
        } catch(e) {
            console.warn(e);
        }
    }


    playerList = () => {
        switch(this.state.positionFilter) {
            case 'any': 
                return this.props.clubPlayers.map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, player.position, player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 'goalkeeper': 
                return this.props.clubPlayers.filter(x=>x.position==='goalkeeper').map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, player.position, player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 'defender': 
                return this.props.clubPlayers.filter(x=>x.position==='defender').map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, player.position, player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 'midfielder': 
                return this.props.clubPlayers.filter(x=>x.position==='midfielder').map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, player.position, player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case 'forward': 
                return this.props.clubPlayers.filter(x=>x.position==='forward').map((player, i) => 
                <Row 
                key={i}
                data={[`${player.first_name} ${player.last_name}`, player.position, player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.select(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)   
            default: 
                console.log('no no no no no');
                break;
        }
    }
    

    render() { 
        return ( 
            <ScrollView style={styles.container}>
                <MyHeader style={styles.header} title='Team Selection'/>
                <View style={styles.pitchContainer}>
                    <View style={styles.starters}>
                        <View style={styles.goalkeeper}>
                            {this.state.selectedPlayers.goalkeeper.map((player, i) => <PlayerGraphic player={player} key={i} num={i+1} deselect={this.deselect}/>)}
                        </View>
                        <View style={styles.defender}>
                            {this.state.selectedPlayers.defender.map((player, i) => <PlayerGraphic player={player} key={i} num={i+2} deselect={this.deselect}/>)}
                        </View>
                        <View style={styles.midfielder}>
                            {this.state.selectedPlayers.midfielder.map((player, i) => <PlayerGraphic player={player} key={i} num={i+2+this.state.selectedPlayers.defender.length} deselect={this.deselect}/>)}
                        </View>
                        <View style={styles.forward}>
                            {this.state.selectedPlayers.forward.map((player, i) => <PlayerGraphic player={player} key={i} num={i+2+this.state.selectedPlayers.defender.length+this.state.selectedPlayers.midfielder.length} deselect={this.deselect}/>)}
                        </View>
                    </View>
                </View>
                <Text>{this.state.error}</Text>
                <Button title="Submit Team" onPress={this.submitTeam}/>
                <View style={styles.filter}>
                    <Picker style={styles.picker} selectedValue={this.state.positionFilter} onValueChange={value=>this.setState({...this.state, positionFilter: value})}>
                        <Picker.Item label="ANY" value='any'/>
                        <Picker.Item label="GK" value="goalkeeper"/>
                        <Picker.Item label="DEF" value="defender"/>
                        <Picker.Item label="MID" value="midfielder"/>
                        <Picker.Item label="FWD" value="forward"/>
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
 
export default connect(mapStateToProps)(ntsScreen2);

const styles = StyleSheet.create({
    pitchContainer: {
        flex: 1,
        height: vh(60),
        backgroundColor: 'green'
    },
    pitch: {
        flex: 1,
        flexDirection: 'row',

    },
    playersList: {
        flex: 1,
        paddingBottom: vh(20)
    },
    starters: {
        flex: 1
    },
    goalkeeper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    defender: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    midfielder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    forward: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})