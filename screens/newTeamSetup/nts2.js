import React, { Component } from 'react';
import MyHeader from '../../components/myHeader';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { patchUserBUDGET, postPlayerUserJoiner } from '../../functions/APIcalls';
import { setTeamPlayers } from '../../actions';
import Pitch from '../../components/pitch';
import PlayersList from '../../components/playersList';

class ntsScreen2 extends Component {
    state = { 
        budget: 600,
        num: 1,
        error: '',
        team: {
            '1': [],
            '2': [],
            '3': [],
            '4': []
        }
    }

    clickFcn = player => {
        if (this.allSelectedPlayerIds.includes(player.player_id)) {
            this.deSelect(player);
        } else {
            this.select(player);
        }
    }

    select = player => {
        const { team } = this.state;
        let newBudget = this.state.budget - player.price;
        if (team.length>7) {
            this.setState({...this.state, error: 'too many players, please deselect a player before adding anymore'});
        } else if (newBudget<0) {
            this.setState({...this.state, error:  'not enough money'})
        } else {
            switch(player.position) {
                case '1':
                    if (team[1].length>0) {
                        this.setState({...this.state, error: 'Keeper already selected'});
                    } else {
                        this.setState({...this.state, error: '', team: {...this.state.team, 1: [...this.state.team[1], player]}, budget: newBudget})
                    };
                    break;
                case '2':
                    if (team[2].length>3) {
                        this.setState({...this.state, error: 'Too many defenders selected'});
                    } else {
                        this.setState({...this.state, error: '', team: {...this.state.team, 2: [...this.state.team[2], player]}, budget: newBudget})
                    };
                    break;
                case '3':
                    if (team[3].length>3) {
                        this.setState({...this.state, error: 'Too many midfielders selected'});
                    } else {
                        this.setState({...this.state, error: '', team: {...this.state.team, 3: [...this.state.team[3], player]}, budget: newBudget})
                    };
                    break;
                case '4':
                    if (team[4].length>2) {
                        this.setState({...this.state, error: 'Too many forwards selected'});
                    } else {
                        this.setState({...this.state, error: '', team: {...this.state.team, 4: [...this.state.team[4], player]}, budget: newBudget})
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    deSelect = player => {
        let { team } = this.state
        this.setState({...this.state, budget: this.state.budget + player.price, team: {...team, [player.position]: team[player.position].filter(x=>x.player_id!==player.player_id)}});
    }

    allSelectedPlayers = () => [...this.state.team['1'], ...this.state.team['2'], ...this.state.team['3'], ...this.state.team['4']]

    submitTeam = async() => {
        let team = this.allSelectedPlayers();
        try {
            if (team.length===8) {
                if (this.state.team['1'].length===1) {
                    for (let i=0;i<8;i++) {
                        await postPlayerUserJoiner(team[i], this.props.user.user_id, i)
                    }
                    await patchUserBUDGET(this.state.budget)
                    this.props.navigation.navigate('Login');
                } else {
                    this.setState({...this.state, error: 'You need one goalkeeper selected'});
                }
            } else {
                this.setState({...this.state, error: 'You need 8 players in your team!'})
            }
        } catch(e) {
            console.warn(e);
        }
    }

    componentDidMount() {
        console.log(this.allSelectedPlayers)
    }
    
    render() { 
        return ( 
            <ScrollView style={styles.container}>
                <MyHeader style={styles.header} title='Team Selection'/>
                <Pitch
                update={this.submitTeam}
                budget={this.state.budget}
                error={this.state.error}
                team={this.state.team}
                clickFcn={this.clickFcn}
                captain={false}
                vCaptain={false}
                />
                {/* <PlayersList
                allSelectedPlayerIds={this.allSelectedPlayers.map(x=>x.player_id)}
                clickFcn={this.clickFcn}
                /> */}
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

const mapDispatchToProps = dispatch => {
    return {
        setTeamPlayers: players => dispatch(setTeamPlayers(players))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen2);

const styles = StyleSheet.create({
    
})