import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import PlayerGraphic from './playerGraphic';

class Pitch extends Component {
    state = {  }

    componentDidMount() {
        console.log(this.props.teamPlayers[1][1]);
    }
    render() { 
        return ( 
            <View style={styles.pitchContainer}>
                <Text>COME ONE</Text>
                {/* <Text>{this.props.teamPlayers[2][1].first_name}</Text> */}
                <View style={styles.starters}>
                    <View style={styles.goalkeeper}>
                        {this.props.teamPlayers[1].map((player, i) => <PlayerGraphic player={player} key={i} num={i+1} deselect={this.props.deselect}/>)}
                    </View>
                    <View style={styles.defender}>
                        {this.props.teamPlayers[2].map((player, i) => <PlayerGraphic player={player} key={i} num={i+2} deselect={this.props.deselect}/>)}
                    </View>
                    <View style={styles.midfielder}>
                        {this.props.teamPlayers[3].map((player, i) => <PlayerGraphic player={player} key={i} num={i+2+this.props.teamPlayers[2].length} deselect={this.props.deselect}/>)}
                    </View>
                    <View style={styles.forward}>
                        {this.props.teamPlayers[4].map((player, i) => <PlayerGraphic player={player} key={i} num={i+2+this.props.teamPlayers[2].length+this.props.teamPlayers[3].length} deselect={this.props.deselect}/>)}
                    </View>
                </View>
            </View>
         );
    }
}
 
export default Pitch;

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