import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, AsyncStorage, Dimensions, Platform, ScrollView, Text, View} from 'react-native';
import {IconSAT} from '../utils';
import TabHeader from '../components/TabHeader';
import HeaderIcon from '../components/HeaderIcon';

class HomeContainer extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({focused, tintColor }) => (
            <IconSAT name="Trangchu" size={30} color={focused ? '#008764' : '#696969'}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            previousHeight: 0,
            loading: false
        }
    }

    componentWillMount() {
        this.setState({loading: true})
    }

    render() {
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
              <TabHeader
                  imageSource={require('../resources/images/logo-top.png')}
                  iconRight={(
                      <HeaderIcon
                          iconName='USER'
                          onPress={() => this.showLogoutPrompt()}
                      />
                  )}
              />
                {this.renderContent()}
            </View>
        );
    }

    renderContent() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }
}

HomeContainer.propTypes = {
    navigation: PropTypes.object,
    userInfo: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object,
    processing: PropTypes.bool,
    success: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo,
        data: state.notification.data,
        processing: state.notification.processing,
        success: state.notification.success,
        locals: state.notification.locals,
    };
}

export default connect(mapStateToProps)(HomeContainer);
