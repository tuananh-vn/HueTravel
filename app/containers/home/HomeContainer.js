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
    TouchableHighlight
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

export class HomeContainer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      promptVisible: false,
      deleting: []
    }
    this.gotoDetail = this.gotoDetail.bind(this)
  }

  componentWillMount() {
  }

  gotoDetail(){
      this.props.navigation.navigate('Detail')
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
            iconRight={
              <HeaderIcon
                iconName="qrcode"
                iconPack="MaterialCommunityIcons"
                onPress={() =>
                  this.props.navigation.navigate('QRCode')
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
        <MapView
            style={{ flex: 1 }}
            provider={MapView.PROVIDER_GOOGLE}
            annotations={this.props.list_article}
            region={{
                latitude: 16.4684685,
                longitude: 107.5764258,
                latitudeDelta: 0.045,
                longitudeDelta: 0.025,
            }}
        >
            {this.props.list_article.map(marker => (
                <MapView.Marker
                    key={marker.id}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    onPress= {() => this.gotoDetail()}
                >
                    <MapView.Callout tooltip={false}>
                        <TouchableHighlight onPress= {()=> this.gotoDetail()} underlayColor='#dddddd'>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text>{marker.title}{"\n"}{marker.description}</Text>
                            </View>
                        </TouchableHighlight>
                    </MapView.Callout>
                </MapView.Marker>
            ))}
        </MapView>
    );
  }
}

HomeContainer.propTypes = {
  navigation: PropTypes.object,
  userInfo: PropTypes.object,
  dispatch: PropTypes.func,
  data: PropTypes.object,
  processing: PropTypes.bool,
  success: PropTypes.bool,
    list_article: PropTypes.array,
}

function mapStateToProps(state) {
  return {
    list_article: state.article.list_article,
  }
}

export default connect(mapStateToProps)(HomeContainer)
