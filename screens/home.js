import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../components/myHeader';
import { Table, Row, Rows } from 'react-native-table-component';


class HomeScreen extends Component {
    state = {  }

    // componentDidMount() {

    // }

    // renderRows = () => {
    //     return this.props.league.map()
    // }


    render() { 
        return ( 
            <ScrollView>
                <MyHeader title="title of APP" navigate={page=>this.props.navigation.navigate(page)}/> 
                <View style={styles.gameweek}>

                </View>
                <View style={styles.topPerformers}>

                </View>
                <ScrollView style={styles.league}>
                    <Table>
                        <Row style={styles.head} data={['Team', 'Total Points', 'GW Points']} />
                        {/* {this.renderRows()} */}
                    </Table>
                </ScrollView>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        league: state.league
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

    }
})