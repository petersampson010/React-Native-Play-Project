import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import { Table, Row, Rows } from 'react-native-table-component';
import { topPlayer, topUser } from '../functions/reusable';


class HomeScreen extends Component {
    state = {  }

    componentDidMount() {
        console.log(this.props.ugJoiners);
    }

    renderRows = () => {
        return this.props.league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
            <Row key={i} style={styles.row} data={[team.team_name, team.total_points, team.gw_points]}/>);
    }


    render() { 
        return ( 
            <ScrollView>
                <MyHeader title="title of APP" navigate={page=>this.props.navigation.navigate(page)}/> 
                <View style={styles.gameweek}>

                </View>
                <View style={styles.topPerformers}>
                    <View style={styles.topPlayer}>
                        <Text>{this.props.topPlayer.player.first_name}</Text>
                    </View>
                    <View style={styles.topUser}>
                        <Text>{this.props.topUser.user.teamname}</Text>
                    </View>
                </View>
                <ScrollView style={styles.league}>
                    <Table>
                        <Row style={styles.head} data={['Team', 'Total Points', 'GW Points']} />
                        {this.renderRows()}
                    </Table>
                </ScrollView>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.endUser.user,
        league: state.league,
        topPlayer: state.topPlayer,
        topUser: state.topUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles=StyleSheet.create({
    gameweek: {

    },
    topPerformers: {

    },
    league: {

    },
    head: {

    },
    row: {

    }
})