import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SectionList, ScrollView, Picker } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { postPlayer } from '../functions/APIcalls';
import  { validatePlayer } from '../functions/validity'


class ClubSetupScreen extends Component {

    state = {
        tableHeaders: ['Name', 'Position', 'Price, £m, 0-99'],
        players: {
            0: {name: '', position:"Goalkeeper", price: ''},
            1: {name: '', position:"Goalkeeper", price: ''},
            2: {name: '', position:"Goalkeeper", price: ''},
            3: {name: '', position:"Goalkeeper", price: ''},
            4: {name: '', position:"Goalkeeper", price: ''},
            5: {name: '', position:"Goalkeeper", price: ''},
            6: {name: '', position:"Goalkeeper", price: ''},
            7: {name: '', position:"Goalkeeper", price: ''},
            8: {name: '', position:"Goalkeeper", price: ''},
            9: {name: '', position:"Goalkeeper", price: ''},
            10: {name: '', position:"Goalkeeper", price: ''},
            11: {name: '', position:"Goalkeeper", price: ''},
            12: {name: '', position:"Goalkeeper", price: ''},
            12: {name: '', position:"Goalkeeper", price: ''},
            13: {name: '', position:"Goalkeeper", price: ''},
            14: {name: '', position:"Goalkeeper", price: ''},
            15: {name: '', position:"Goalkeeper", price: ''},
            16: {name: '', position:"Goalkeeper", price: ''},
            17: {name: '', position:"Goalkeeper", price: ''},
            18: {name: '', position:"Goalkeeper", price: ''},
            19: {name: '', position:"Goalkeeper", price: ''},
            21: {name: '', position:"Goalkeeper", price: ''},
            20: {name: '', position:"Goalkeeper", price: ''},
            22: {name: '', position:"Goalkeeper", price: ''},
            23: {name: '', position:"Goalkeeper", price: ''}
        }
    }

    updatePosition = (i, selectedValue) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], position: selectedValue}}})
    }

    updatePrice = (text, i) => {
        if (text.match('^[1-9]{1,2}$')) {
            this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: text}}})
        } else if (text.match('^[0-9]{3,}$')) {
            this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: text.substring(0,2)}}})
        } else {
            this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: ''}}})
        }
    }


    renderRow = (i)  => <Row style={styles.row} data={
        [<TextInput value={this.state.players[i].name} onChange={el=>this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], name: el.nativeEvent.text}}})}/>, 
        <Picker style={styles.picker} key={i} selectedValue={this.state.players[i].position} onValueChange={value=>this.updatePosition(i, value)}>
            <Picker.Item label="GK" value="Goalkeeper"/>
            <Picker.Item label="DEF" value="Defender"/>
            <Picker.Item label="MID" value="Midfielder"/>
            <Picker.Item label="FWD" value="Forward"/>
        </Picker>,
        <TextInput 
        placeholder='£1m - £99m'
        value={this.state.players[i].price} 
        onChange={el=>this.updatePrice(el.nativeEvent.text, i)}
        />]
    }/>

    submitPlayers = () => {
        if (this.countPlayers()>1) {
            this.postPlayers();
        } else {
            console.warn('not enough players ya get me')
        }
    }

    postPlayers = async() => {
        try {
            for (let i=0;i<24;i++) {
                let entry = this.state.players[i];
                if (validatePlayer(entry)) {
                    await postPlayer(entry, this.props.aUserId);
                } else {
                    console.warn('invalid entry: ' + i);
                }
            }
            this.props.navigation.navigate('Home');
        } catch(e)  {
            console.warn(e);
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
        return noOfPlayers;
    }

    render() {
        return (
          <ScrollView >
            <View style={styles.topBar}>
                <Text>Club Setup</Text>
                <Button title="Submit Club Players" onPress={this.submitPlayers}/>
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
        aUserId: state.aUser.admin_user_id
    }
}

export default connect(mapStateToProps)(ClubSetupScreen)

const styles = StyleSheet.create({
    head: { height: 20 },
    row: { height: 34 },
    picker: {transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
    topBar: {flexDirection: 'row', justifyContent: "space-between"}
})