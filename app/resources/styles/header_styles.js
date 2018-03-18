import { StyleSheet, Platform } from 'react-native';
import { screen } from './common';
import { scale } from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screen.header.totalHeight,
    paddingTop: screen.header.statusBarHeight,
    alignSelf: 'stretch'
  },
  title: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleImage: {
    backgroundColor: 'transparent',
    height: screen.header.headerHeight * 0.5,
    resizeMode: 'contain'
  },
  titleText: {
    color: 'white',
    fontSize: screen.header.textSize,
    fontFamily: 'sale-text-light',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  iconPlaceholder: {
    backgroundColor: 'transparent',
    width: screen.header.headerHeight,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchHeader: {
    flexDirection: 'row',
    height: screen.searchBar.height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBarInputStyle: {
    height: screen.searchBar.height - 16,
    backgroundColor: screen.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sale-text-light',
    fontSize: screen.searchBar.fontSize
  }
});
