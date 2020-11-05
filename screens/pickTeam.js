import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import Pitch from '../components/pitch';
import { teamPlayersArrayToObj } from '../functions/reusable';

class PickTeamScreen extends Component {
    state = { 
        // 1: [],
        // 2: [],
        // 3: [],
        // 4: []
    }

    // componentDidMount() {
    //     this.props.teamPlayers.map(player=>{
    //         let num = player.position;
    //         this.setState({
    //             ...this.state,
    //             [num]: this.state.num.push(player)
    //         })
    //     })
    // }

    render() { 
        return ( 
            <ScrollView>
                <MyHeader title='Pick Team' navigate={page=>this.props.navigation.navigate(page)}/>
                <Pitch teamPlayers={teamPlayersArrayToObj(this.props.teamPlayers)}/>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.teamPlayers
    }
}
 
export default connect(mapStateToProps)(PickTeamScreen);