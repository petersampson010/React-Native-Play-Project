import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/header/header';
import Pitch from '../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj } from '../functions/reusable';
import BottomNav from '../components/bottomNav/bottomNav';


class PointsScreen extends Component {
    state = {  }


    render() { 
        return ( 
            <ScrollView>
                <Header title='Points' navigate={page=>this.props.navigation.navigate(page)}/>
                {this.props.latestGw ? 
                <Pitch
                type="points"
                update={()=>console.log('do nothing')}
                budget={false}
                team={playersArrayToObj(this.props.starters)}
                subs={this.props.subs}
                clickFcn={()=>console.log('do nothing')}
                captain={getCaptain(this.props.starters, this.props.puJoiners)}
                vCaptain={getVCaptain(this.props.starters, this.props.puJoiners)}
                /> : <Text>No Games played yet, come back soon!</Text>}
                <BottomNav navigate={this.props.navigation.navigate}/>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.players.subs,
        starters: state.players.starters,
        puJoiners: state.joiners.puJoiners,
        league: state.homeGraphics.league
    }
}
 
export default connect(mapStateToProps)(PointsScreen);