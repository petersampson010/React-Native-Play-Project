import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import Pitch from '../components/pitch';
import { getCaptain, getVCaptain, playersArrayToObj } from '../functions/reusable';


class PointsScreen extends Component {
    state = {  }


    render() { 
        return ( 
            <ScrollView>
                <MyHeader title='Points' navigate={page=>this.props.navigation.navigate(page)}/>
                <Pitch
                type="points"
                update={()=>console.log('do nothing')}
                budget={false}
                team={playersArrayToObj(this.props.starters)}
                subs={this.props.subs}
                clickFcn={()=>console.log('do nothing')}
                captain={getCaptain(this.props.starters, this.props.puJoiners)}
                vCaptain={getVCaptain(this.props.starters, this.props.puJoiners)}
                />
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.subs,
        starters: state.starters,
        puJoiners: state.puJoiners
    }
}
 
export default connect(mapStateToProps)(PointsScreen);