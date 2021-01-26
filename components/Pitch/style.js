import {vw, vh} from 'react-native-expo-viewport-units';
import { $luminousGreen } from '../../styles/global';

export const subHead= {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const pitchContainer = {
    flex: 1,
    width: vw(100),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
}

export const pitch = {
    flex: 14,
    flexDirection: 'row',
    height: vh(60),
    // width: vw(90),
    backgroundColor: 'green'
}
export const starters = {
    flex: 1
}
export const goalkeeper = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
}
export const defender = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
}
export const midfielder = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
}
export const forward = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
}
export const subs = {
    height: vh(11),
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly"
}

export const slideButton = {
    height: vh(7),
    width: vh(2),
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: $luminousGreen
}

export const slideButtonContainer = {
    flex: 1,
    justifyContent: 'center',
    height: vh(60),
    // width: vw(5),
    backgroundColor: 'green',
    // alignItems: 'right',
}


