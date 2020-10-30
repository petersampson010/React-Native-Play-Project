import React, { Component } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import shirtImg from '../images/shirt.jpg';

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
        return ( 
            <View style={styles.container} onStartShouldSetResponder={()=>this.props.deselect(this.props.player)}>
                {/* <Image
                source={shirtImg}
                style={styles.shirt}
                > */}
                {/* </Image> */}
                <Text style={styles.number}>{this.playerNumber()}</Text>
                <Text style={styles.name}>{this.playerName()}</Text>
            </View>
         );
    }
}
 
export default PlayerGraphic;

const styles = StyleSheet.create({
    container: {
    },
    // shirt: {
    //     width: 90,
    //     height: 120,
    //     resizeMode: 'center',
    //     backgroundColor: 'green'
    // },
    number: {
        // marginTop: ,
        fontSize: 18
    },
    name: {
        width: 90,
        textAlign: 'center',
        marginTop: 10
    }
})