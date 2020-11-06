import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button } from 'react-native';


class PlayerGraphic extends Component {
    state = {  }

    playerName = () => {
        const { player } = this.props;
        if (player) {
            return player.first_name + '. ' + player.last_name;
        } else {
            return '';
        }
    }

    playerNumber = () => {
        const { num } = this.props;
        if (num) {
            return num;
        } else {
            return '';
        }
    }
    render() {
        if (this.props.setup) {
            return (
                <View style={styles.container} onPress={()=>this.props.clickFcn(this.props.player)}>
                    <Text style={styles.number}>{this.playerNumber()}</Text>
                    <Text style={styles.name}>{this.playerName()}</Text>
                </View>
            )
        } else {
            return ( 
                <View style={styles.container}>
                    <Text style={styles.number}>{this.playerNumber()}</Text>
                    <Text style={styles.name}>{this.playerName()}</Text>
                    {this.props.player.captain ? <Text style={{color: 'red'}}>CAPTAIN</Text> : null}
                    {this.props.player.vCaptain ? <Text style={{color: 'red'}}>VICE - CAPTAIN</Text> : null}
                    <Button title="SUB" onPress={()=>this.props.clickFcn(this.props.player)}/>
                </View>
             );
        }
    }
}
 
export default PlayerGraphic;

const styles = StyleSheet.create({
    container: {
    },
    number: {
        fontSize: 18
    },
    name: {
        width: 90,
        textAlign: 'center',
        marginTop: 10
    }
})