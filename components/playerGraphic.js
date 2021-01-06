import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { isCaptain, isVCaptain, fullName } from '../functions/reusable';


class PlayerGraphic extends Component {
    state = {}

    playerNumber = () => {
        const { num } = this.props;
        if (num) {
            return num;
        } else {
            return '';
        }
    }

    points = () => {
        let PG = this.props.playerPG;
        if (PG===undefined) {
            return '0';
        } else if (!PG)  {
            return '';
        } else {
            return this.props.playerPG.total_points;
        }
    }

    render() {
        return ( 
                <View style={styles.container}>
                    <TouchableHighlight onPress={()=>this.props.clickFcn(this.props.player)}>
                        <View>
                            <Text style={styles.num}>{this.props.num}</Text>
                            <Text style={styles.name}>{fullName(this.props.player) + '  ' + (this.props.captain ? '(C)' : '') + (this.props.vCaptain ? '(VC)' : '')}</Text>
                            <Text>{this.points()}</Text>
                        </View>
                    </TouchableHighlight>
                    <Button title="INFO" onPress={()=>this.props.openModal(this.props.player)}/>
                </View>
             );
    }
}

const mapStateToProps = state => {
    return {
        puJoiners: state.joiners.puJoiners
    }
}
 
export default connect(mapStateToProps)(PlayerGraphic);

const styles = StyleSheet.create({
    container: {
        width: vw(20),
    },
    num: {
        textAlign: 'center',
        fontSize: 26
    }
})