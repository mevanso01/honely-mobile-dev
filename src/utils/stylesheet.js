import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

export {  deviceWidth, deviceHeight };
