import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu, {
    MenuContext,
    MenuOption,
    MenuOptions,
    MenuTrigger
} from 'react-native-popup-menu'
import { NavigationActions } from 'react-navigation'
import HeaderIcon from '../../components/header/HeaderIcon'
import TabHeader from '../../components/header/TabHeader'
import {
    Alert,
    Linking,
    Dimensions,
    LayoutAnimation,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export class QRCodeScanContainer extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            lastScannedUrl: null,
        }
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannedUrl: result.data });
        }
    };

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
                {this.state.hasCameraPermission === null
                    ? <Text>Requesting for camera permission</Text>
                    : this.state.hasCameraPermission === false
                        ? <Text style={{ color: '#fff' }}>
                            Camera permission is not granted
                        </Text>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width,
                            }}
                        />}

                {this._maybeRenderUrl()}
            </MenuContext>
        )
    }

    _handlePressUrl = () => {
        Alert.alert(
            'Open this URL?',
            this.state.lastScannedUrl,
            [
                {
                    text: 'Yes',
                    onPress: () => Linking.openURL(this.state.lastScannedUrl),
                },
                { text: 'No', onPress: () => {} },
            ],
            { cancellable: false }
        );
    };

    _handlePressCancel = () => {
        this.setState({ lastScannedUrl: null });
    };

    _maybeRenderUrl = () => {
        if (!this.state.lastScannedUrl) {
            return;
        }

        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
                    <Text numberOfLines={1} style={styles.urlText}>
                        {this.state.lastScannedUrl}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={this._handlePressCancel}>
                    <Text style={styles.cancelButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
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
});

QRCodeScanContainer.propTypes = {
    navigation: PropTypes.object,
    userInfo: PropTypes.object,
    dispatch: PropTypes.func,
    data: PropTypes.object,
    processing: PropTypes.bool,
    success: PropTypes.bool,
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(QRCodeScanContainer)