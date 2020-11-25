import React, { Component } from 'react';
// import MyHeader from '../components/myHeader';
import { ListItem } from 'react-native-elements';
import { Button, ScrollView, View, Modal, StyleSheet, Text, TouchableHighlightBase } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validateGame } from '../functions/validity';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postGame, patchGame } from '../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import TouchableScale from 'react-native-touchable-scale'
import { setGameweekId, addGameState, resetTeamPlayers } from '../actions';
import { Dialog, DialogButton, DialogContent } from 'react-native-popup-dialog';

class AdminHomeScreen extends Component {
    state = { 
        modal: {
            active: false,
            update: false,
            game: {
                opponent: '',
                date: new Date()
            }
        },
        dialog: {
            active: false,
            game: {
                opponent: '',
                date: new Date(),
            }
        }
     }

    renderGames = () => {
        console.log(this.props.games);
        let sortedArr = this.props.games.sort((a,b)=>b.date-a.date);
        return sortedArr.map((game,i) => 
        <ListItem key={i} style={styles.listItem}
        onPress={()=>{
            this.setState({...this.state, dialog: {active: true, game}})
            this.props.setGameweekId(game.gameweek_id)}}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
            colors: game.complete ? ['grey', 'black'] : ['#FF9800', '#F44336'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
        }}
        >
            <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{game.opponent}</ListItem.Title>
                <ListItem.Subtitle style={styles.listSub}>{game.date}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        )
    }

    formChange = (id, value) => {
        this.setState({...this.state, 
        modal: {...this.state.modal,
            game: {...this.state.modal.game,
                [id]: value
            }
        }})
    }

    addGame = async() => {
        try {
            let res = await postGame(this.state.modal.game, this.props.aUser.admin_user_id);
            if (res.date) {
                this.props.addGameState(res);
                this.setState({
                    modal: {
                        active: false,
                        game: {
                            opponent: '',
                            date: new Date()
                        }
                    }
                });
                showMessage({
                    message: "Game/Event added",
                    type: 'success'
                })
            }
        } catch(e) {
            console.warn(e);
        }
    }   

    updateGame = async() => {
        try {
            let res = await patchGame(this.state.modal.game);
            if (res.date) {
                this.setState({
                    modal: {
                        active: false,
                        game: {
                            opponent: '',
                            date: new Date()
                        }
                    }
                })
                showMessage({
                    message: "Game/Event updated",
                    type: 'success'
                })
            }
        } catch(e) {
            console.warn(e);
        }
    }

    render() { 
        return ( 
            <ScrollView>
                {/* <MyHeader title="" navigate={page=>this.props.navigation.navigate(page)}/> */}
                <Button title="Add Event/Game" onPress={()=>this.setState({...this.state, modal: {...this.state.modal, active: true}})}/>
                <ScrollView>
                    {this.renderGames()}
                </ScrollView>
                <Modal
                visible={this.state.modal.active}>
                    <View style={styles.modal}>
                    <Input value={this.state.modal.game.opponent} 
                        onChange={(el)=>this.formChange('opponent', el.nativeEvent.text)}
                        placeholder="Fantasy FC"
                        label="Opposition"
                    />
                    <Text>Please select the date the game will be played</Text>
                    <DateTimePicker
                    value={this.state.modal.game.date}
                    onChange={(event, date)=>this.formChange('date', date)}
                    />
                    <Button  title={this.state.modal.update ? "Update Game" : "Submit Game"} onPress={this.state.modal.update ? this.updateGame : this.addGame}/>
                    </View>
                </Modal>
                <Dialog
                visible={this.state.dialog.active}
                onTouchOutside={()=>this.setState({...this.state, dialog: {active: false,}})}
                >
                    <DialogButton
                    text="SUBMIT STATS"
                    onPress={()=>{this.setState({...this.state, dialog: {...this.state.dialog, active: false}});this.props.navigation.navigate('GameEditor')}}
                    />
                    <DialogButton 
                    text="EDIT GAME"
                    onPress={()=>this.setState({...this.state, modal: {active: true, update: true,
                        game: this.state.dialog.game}, dialog: {...this.state.dialog, active: false}})}
                    />

                </Dialog>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        games: state.games,
        aUser: state.aUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGameweekId: id => dispatch(setGameweekId(id)),
        addGameState: game => dispatch(addGameState(game))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeScreen);

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        height: vh(60),
        width: vw(90),
        left: vw(5),
        top: vh(20),
        backgroundColor: 'grey'
    },
    listItem: {
        borderRadius: 17,
        marginBottom: 10,
    },
    listTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    listSub: {
        color: 'white',

    }
})