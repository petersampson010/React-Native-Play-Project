import { vh, vw } from 'react-native-expo-viewport-units';
import { $arylideYellow, $baseBlue, $chocolateBlack, $coral, $onyx, $platinum, $sage, $skobeloff } from '../../styles/global';

export const navContainer = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    height: vh(3.5),
    width: vw(100),
    backgroundColor: $platinum,
    top: vh(84)
}

export const navText = {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    // backgroundColor: "white",
    color: $skobeloff,
    fontSize: 19
}

export const navSectionContainer = {
    // backgroundColor: "white",
    width: vw(25),
    borderLeftWidth: 1,
    borderLeftColor: $skobeloff,
    borderRightWidth: 1,
    borderRightColor: $skobeloff
}
