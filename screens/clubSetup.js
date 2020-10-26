import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SectionList, ScrollView, Picker } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { postPlayer } from '../APIcalls';


class ClubSetupScreen extends Component {

    state = {
        tableHeaders: ['Name', 'Position', 'Price (£) 0.1-12.0'],
        noOfPlayers: 0,
        players: {
            0: {name: '', position:"Goalkeeper", price: 0.00},
            1: {name: '', position:"Goalkeeper", price: 0.00},
            2: {name: '', position:"Goalkeeper", price: 0.00},
            3: {name: '', position:"Goalkeeper", price: 0.00},
            4: {name: '', position:"Goalkeeper", price: 0.00},
            5: {name: '', position:"Goalkeeper", price: 0.00},
            6: {name: '', position:"Goalkeeper", price: 0.00},
            7: {name: '', position:"Goalkeeper", price: 0.00},
            8: {name: '', position:"Goalkeeper", price: 0.00},
            9: {name: '', position:"Goalkeeper", price: 0.00},
            10: {name: '', position:"Goalkeeper", price: 0.00},
            11: {name: '', position:"Goalkeeper", price: 0.00},
            12: {name: '', position:"Goalkeeper", price: 0.00},
            12: {name: '', position:"Goalkeeper", price: 0.00},
            13: {name: '', position:"Goalkeeper", price: 0.00},
            14: {name: '', position:"Goalkeeper", price: 0.00},
            15: {name: '', position:"Goalkeeper", price: 0.00},
            16: {name: '', position:"Goalkeeper", price: 0.00},
            17: {name: '', position:"Goalkeeper", price: 0.00},
            18: {name: '', position:"Goalkeeper", price: 0.00},
            19: {name: '', position:"Goalkeeper", price: 0.00},
            20: {name: '', position:"Goalkeeper", price: 0.00},
            21: {name: '', position:"Goalkeeper", price: 0.00},
            22: {name: '', position:"Goalkeeper", price: 0.00},
            23: {name: '', position:"Goalkeeper", price: 0.00}
        }
    }

    updatePosition = (i, selectedValue) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], position: selectedValue}}})
    }

    renderRow = (i)  => <Row style={styles.row} data={
        [<TextInput value={this.state.players[i].name} onChange={el=>this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], name: el.nativeEvent.text}}})}/>, 
        <Picker style={styles.picker} key={i} selectedValue={this.state.players[i].position} onValueChange={value=>this.updatePosition(i, value)}>
            <Picker.Item label="GK" value="Goalkeeper"/>
            <Picker.Item label="DEF" value="Defender"/>
            <Picker.Item label="MID" value="Midfielder"/>
            <Picker.Item label="FWD" value="Forward"/></Picker>,
        <TextInput value={this.state.players[i].price} onChange={el=>this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: el.nativeEvent.text}}})}/>]
    }/>

    submitPlayers = () => {
        console.log('hit');
        this.countPlayers();
        console.log(this.state.noOfPlayers);
        if (this.state.noOfPlayers>0) {
            this.postPlayers();
        } else {
            console.warn('not enough players ya get me')
        }
    }

    postPlayers = async() => {
        try {
            let i=0;
            console.log(this.props.aUserId)
            while (i<24) {
                if (this.validatePlayer(this.state.players[i])) {
                    console.log('before');
                    let player = await postPlayer(this.state.players[i], this.props.aUserId);
                    console.log(player);
                    console.log("after");
                }
                i++;
            }
            return;
        } catch(e) {
            console.warn(e);
        }
        return;
    }

    validatePlayer = player => {
        if (player.name!==''&&player.price!==0) {
            return true;
        } else {
            return false;
        }
    }

    countPlayers = () => {
        let { players } = this.state;
        let noOfPlayers = 0;
        for (let i=0;i<24;i++) {
            if (players[i].name!==''&&players[i].price!==0) {
                noOfPlayers++;
            }
        }
        this.setState({...this.state, noOfPlayers: noOfPlayers});
    }

    render() {
        return (
          <ScrollView >
            <View style={styles.topBar}>
                <Text>Club Setup</Text>
                <Button title="Submit Club Players" onClick={this.submitPlayers}/>
            </View>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row style={styles.head} data={this.state.tableHeaders}/>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
                {this.renderRow(9)}
                {this.renderRow(10)}
                {this.renderRow(11)}
                {this.renderRow(12)}
                {this.renderRow(13)}
                {this.renderRow(14)}
                {this.renderRow(15)}
                {this.renderRow(16)}
                {this.renderRow(17)}
                {this.renderRow(18)}
                {this.renderRow(19)}
                {this.renderRow(20)}
                {this.renderRow(21)}
                {this.renderRow(22)}
                {this.renderRow(23)}
            </Table>
          </ScrollView>
        );
    }
  }

const mapStateToProps = state => {
    return {
        aUserId: state.aUser.id
    }
}

export default connect(mapStateToProps)(ClubSetupScreen)

const styles = StyleSheet.create({
    head: { height: 20 },
    row: { height: 34 },
    picker: {transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
    topBar: {flexDirection: 'row', justifyContent: "space-between"}
})