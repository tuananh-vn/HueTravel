import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { scale } from '../../utils/scaling';

const { width, height } = Dimensions.get('window');
const statusBarHeight = Constants.statusBarHeight;
const headerHeight = Platform.OS === 'ios' ? scale(44) : scale(56);
const base_resolution = Platform.OS === 'ios' ? 375 : 360; // screen width of iphone 6 - Nexus 5X
const real_resolution = width;

export const screen = {
  width,
  height,
  isLandscape: width > height,
  margin: scale(8),
  padding: scale(8),
  backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#ffffff',
  lineColor: Platform.OS === 'ios' ? '#ceced2' : '#ceced2',
  linkColor: Platform.OS === 'ios' ? '#007aff' : '#007aff',
  calendarColor: Platform.OS === 'ios' ? '#ff3b30' : '#ff3b30',
  messageColor: Platform.OS === 'ios' ? '#4cd964' : '#4cd964',
  common: {
    buttonHeight: Platform.OS === 'ios' ? scale(44) : scale(44),
    titleFontSize: Platform.OS === 'ios' ? scale(17) : scale(24),
    smallFontSize: Platform.OS === 'ios' ? scale(11) : scale(13),
    mediumFontSize: Platform.OS === 'ios' ? scale(13) : scale(15),
    fontSize: Platform.OS === 'ios' ? scale(15) : scale(17),
    iconSize: Platform.OS === 'ios' ? scale(29) : scale(29),
    fwIconSize: Platform.OS === 'ios' ? scale(24) : scale(24),
    smallIconSize: Platform.OS === 'ios' ? scale(15) : scale(15),
    largeIconSize: Platform.OS === 'ios' ? scale(35) : scale(35)
  },
  commonRatio: {
    buttonHeight: height * 0.06,
    titleFontSize: height * 0.06,
    smallFontSize: height * 0.02,
    mediumFontSize: height * 0.025,
    fontSize: height * 0.03,
    iconSize: height * 0.04,
    smallIconSize: height * 0.03,
    largeIconSize: height * 0.05
  },
  header: {
    statusBarHeight: statusBarHeight,
    headerHeight: headerHeight,
    totalHeight: headerHeight + statusBarHeight,
    titleWidth: width - 2 * headerHeight - 80,
    iconSize: Platform.OS === 'ios' ? scale(22) : scale(22),
    textSize: Platform.OS === 'ios' ? scale(17) : scale(17)
  },
  searchBar: {
    height: Platform.OS === 'ios' ? scale(44) : scale(44),
    fontSize: Platform.OS === 'ios' ? scale(15) : scale(15)
  },
  tabBar: {
    height: Platform.OS === 'ios' ? scale(49) : scale(49),
    labelFontSize: Platform.OS === 'ios' ? scale(11) : scale(13),
    labelIconSize: Platform.OS === 'ios' ? scale(29) : scale(29)
  },
  fontScale: real_resolution / base_resolution
};

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 8
  },
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: { height: 0 },
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: '#16A085',
    height: Platform.OS === 'ios' ? scale(64) : scale(64),
    paddingTop: statusBarHeight,
    justifyContent: 'center'
  }
});
