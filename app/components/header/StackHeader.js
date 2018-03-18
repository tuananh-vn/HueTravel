import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LayoutAnimation,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import { SearchBar, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import ConnectionStatusBar from '../ConnectionStatusBar';
import header_styles from '../../resources/styles/header_styles';
import { screen } from '../../resources/styles/common';
import { scale } from '../../utils/scaling';
import { IconSAT } from '../../utils';

export class StackHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    imageSource: PropTypes.number,
    searchPlaceholder: PropTypes.string,
    hasSearchFilter: PropTypes.bool,
    onFilterPress: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    searchBarValue: PropTypes.string
  };

  static defaultProps = {
    title: '',
    imageSource: require('../../resources/images/logo-top.png'),
    titleTextStyle: {},
    searchPlaceholder: 'Nhập từ khóa muốn tìm kiếm',
    hasSearchFilter: false,
    filterNumber: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.searchBarValue
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchBarValue !== nextProps.searchBarValue) {
      this.setState({ text: nextProps.searchBarValue });
    }
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <Text
          accessibilityLabel="header_title"
          style={[header_styles.titleText, this.props.titleTextStyle]}>
          {this.props.title}
        </Text>
      );
    } else {
      return (
        <Image
          style={header_styles.titleImage}
          source={this.props.imageSource}
        />
      );
    }
  }

  renderLeftIcon() {
    if (this.props.iconLeft !== undefined) {
      return this.props.iconLeft;
    } else {
      return <View style={header_styles.iconPlaceholder} />;
    }
  }

  renderRightIcon() {
    if (this.props.iconRight !== undefined) {
      return this.props.iconRight;
    } else {
      return <View style={header_styles.iconPlaceholder} />;
    }
  }

  renderSearchSection = () => {
    if (this.props.hasSearchSection)
      return (
        <View style={header_styles.searchHeader}>
          {this.props.hasSearchFilter ? (
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                width: screen.header.headerHeight,
                height: screen.header.headerHeight,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() =>
                this.props.onFilterPress && this.props.onFilterPress()
              }>
              <View style={{ padding: 8 }} accessibilityLabel="filter_button">
                <IconSAT
                  name="Filter"
                  size={screen.header.iconSize}
                  color="white"
                />
                {this.props.filterNumber !== 0 ? (
                  <Badge
                    wrapperStyle={{
                      position: 'absolute',
                      top: scale(0),
                      right: scale(0)
                    }}
                    containerStyle={{
                      height: scale(15),
                      minWidth: scale(15),
                      backgroundColor: '#FD632B',
                      padding: 2
                    }}>
                    <Text
                      accessibilityLabel="filter_button_quantity"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white'
                      }}>
                      {this.props.filterNumber}
                    </Text>
                  </Badge>
                ) : null}
              </View>
            </TouchableOpacity>
          ) : null}
          <SearchBar
            noIcon={true}
            clearIcon={{
              color: '#86939e',
              size: scale(28),
              style: {
                top: (screen.searchBar.height - scale(28)) / 2
              }
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0
            }}
            accessibilityLabel="search_bar"
            inputStyle={header_styles.searchBarInputStyle}
            placeholder={this.props.searchPlaceholder}
            onChangeText={text => this.onSearchTextChanged(text)}
            onClearText={() => this.onSearchTextCleared()}
            onSubmitEditing={() =>
              this.props.onSubmitEditing &&
              this.props.onSubmitEditing(this.state.text)
            }
            value={this.state.text}
            textInputRef={'searchBarTextInput'}
            onFocus={this.props.onFocus}
          />
        </View>
      );
  };

  render() {
    return (
      <View style={header_styles.container}>
        <LinearGradient
          colors={['#2CCA71', '#138d75']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            alignSelf: 'stretch',
            height:
              screen.header.totalHeight +
              (this.props.hasSearchSection ? screen.searchBar.height : 0)
          }}>
          <View style={[header_styles.header, {}]}>
            <View style={header_styles.iconPlaceholder}>
              {this.renderLeftIcon()}
            </View>
            <View style={header_styles.title}>{this.renderTitle()}</View>
            <View style={header_styles.iconPlaceholder}>
              {this.renderRightIcon()}
            </View>
          </View>
          {this.renderSearchSection()}
        </LinearGradient>
        <ConnectionStatusBar />
      </View>
    );
  }

  onSearchTextCleared() {
    Keyboard.dismiss();
    this.props.onSubmitEditing && this.props.onSubmitEditing('');
  }

  onSearchTextChanged(text) {
    this.setState({ text: text });
    this.props.onChangeText && this.props.onChangeText(text);
  }
}

export default StackHeader;
