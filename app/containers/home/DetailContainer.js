import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MapView} from 'expo';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  Linking,
  Platform,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native'
import Menu, {
  MenuContext,
  MenuOption,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import HeaderIcon from '../../components/header/HeaderIcon'
import TabHeader from '../../components/header/TabHeader'
import ProcessingPrompt from '../../components/modal/ProcessingPrompt'

import * as utils from '../../utils'
import scale from '../../utils/scaling'
import { IconSAT } from '../../utils'

const { width } = Dimensions.get('window');
const height = width * 0.8

export class DetailContainer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      promptVisible: false,
      deleting: []
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <MenuContext
        style={{
          flex: 1,
          alignSelf: 'stretch'
        }}
      >
        <TabHeader
            iconLeft={
              <HeaderIcon
                iconName="ios-arrow-back"
                iconPack="Ionicons"
                onPress={() =>
                {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'AppNavigator' })]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
              }
              />
            }
            title="Du Lịch Huế"
          // imageSource={require('../../resources/images/logo-top.png')}

        />
        {this.renderContent()}
      </MenuContext>
    )
  }

  renderContent() {
    // show initial loading
    return (
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
        >
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        >
            {this.props.detail_article.images.map(image => (
                <Image style={styles.image} source={{uri: image}}
                       key={image}
                />
            ))}
        </ScrollView>

            <Text numberOfLines={0}>{this.props.detail_article.title}</Text>
            <Text numberOfLines={0}>{this.props.detail_article.content}</Text>

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1.5,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
    image: {
        width,
        height,
    },
});

DetailContainer.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  data: PropTypes.object,
  processing: PropTypes.bool,
  success: PropTypes.bool,
    detail_article: PropTypes.object,
}

function mapStateToProps(state) {
  return {
      detail_article: state.article.detail_article,
  }
}

export default connect(mapStateToProps)(DetailContainer)
