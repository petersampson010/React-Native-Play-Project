import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';


class PitchHead extends Component {
    state = {  }

    // componentDidMount() {
    //     console.log(this.props.latestUG);
    // }

    comp1 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text>Points: {this.props.latestUG.total_points}</Text>;
            case 'transfers':
                return <Text style={{color: (this.props.budget>=0 ? 'green' : 'red')}}>Budget: {this.props.budget}m</Text>
            case 'pickTeam':
                return <Text></Text>
            default: 
                return;
        }
    }

    comp2 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text>XXX</Text>;
            case 'transfers':
                return <Button title="Confirm" onPress={this.props.update}/>
            case 'pickTeam':
                return <Button title="Confirm" onPress={this.props.update}/>
            default: 
                return;
        }
    }

    render() { 
        return ( 
            <View style={styles.pitchHead}>
                {this.comp1()}
                {this.comp2()}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        latestUG: state.joiners.latestUG
    }
}
 
export default connect(mapStateToProps)(PitchHead);

const styles = StyleSheet.create({
    pitchHead: {
        flex: 1,
        width: vw(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
})