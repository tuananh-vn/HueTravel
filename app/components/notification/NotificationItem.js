/*
 * Created by tuananh on 7/25/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { IconSAT } from '../../utils';
import * as utils from '../../utils';
import { screen } from '../../resources/styles/common';
import HeaderIcon from '../../components/header/HeaderIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { style } from 'expo/src/Font';

export default class NotificationItem extends Component {
  static propTypes = {
    nativekey: PropTypes.string,
    notificationData: PropTypes.object,
    itemClick: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  itemClick() {
    this.props.itemClick(this.props.notificationData.id);
  }

  itemDelete() {
    this.props.itemDelete(this.props.notificationData.id);
  }

  render() {
    let { notificationData } = this.props;
    var stringDate = utils.formatDate(notificationData.created_at);
    var st = utils.getNotificationStyle(
      notificationData.sender,
      notificationData.title
    );

    return (
      <View nativeID={this.props.nativekey} style={styles.itemNotification}>
        <TouchableOpacity
          accessibilityLabel="notification_item"
          style={styles.headerNotification}
          onPress={() => this.itemClick()}
        >
          <IconSAT
            name={st.icon}
            size={this.props.notificationData.is_read ? 20 : 21}
            color={st.color}
          />
          <Text
            accessibilityLabel="notification_item_title"
            style={[
              this.props.notificationData.is_read
                ? styles.senderNotificationRead
                : styles.senderNotification,
              { color: st.color }
            ]}
            numberOfLines={1}
          >
            {st.title}
          </Text>
          <Text
            accessibilityLabel="notification_item_date"
            style={
              this.props.notificationData.is_read
                ? styles.timeNotificationRead
                : styles.timeNotification
            }
            numberOfLines={1}
          >
            {stringDate}
          </Text>
          {/*
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.itemDelete()}
              accessibilityLabel='notification_item_delete'
            >
                <IconSAT name='TRASH' size={this.props.notificationData.is_read? 20:25} color='white'/>
            </TouchableOpacity>
          */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentNotification}
          onPress={() => this.itemClick()}
        >
          <Text
            accessibilityLabel="notification_item_message"
            style={
              this.props.notificationData.is_read
                ? styles.bodyNotificationRead
                : styles.bodyNotification
            }
            numberOfLines={3}
          >
            {notificationData.message}
          </Text>
          <IconSAT
            name="BACK"
            size={18}
            color="gray"
            style={{
              alignSelf: 'center',
              marginBottom: screen.height * 0.13 * 1 / 5
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  //notification
  itemNotification: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: screen.margin / 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray'
    // backgroundColor: 'transparent',
    // borderRadius: 5,
    // shadowColor: '#cfcfcf',
    // shadowOffset: { width: 1, height: 1 }
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    // elevation: 1
  },
  headerNotification: {
    flex: 2,
    flexDirection: 'row',
    //paddingLeft: screen.padding,
    alignItems: 'center',
    backgroundColor: 'transparent'
    // marginTop: -1,
    // marginLeft: -1,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
  },
  contentNotification: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2,
    //paddingLeft: screen.padding,
    backgroundColor: 'transparent'
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  senderNotification: {
    fontWeight: 'bold',
    color: 'black',
    flex: 3,
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  senderNotificationRead: {
    fontWeight: 'normal',
    color: 'black',
    flex: 3,
    textAlign: 'left',
    fontSize: 13,
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  bodyNotification: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    //alignItems: 'center',
    textAlign: 'justify',
    //color: '#9FA8AF',
    color: '#333'
  },
  bodyNotificationRead: {
    flex: 1,
    fontWeight: 'normal',
    fontSize: 13,
    //alignItems: 'center',
    textAlign: 'justify',
    //color: '#9FA8AF',
    color: '#333'
  },
  timeNotification: {
    fontWeight: 'bold',
    color: 'gray',
    flex: 4,
    textAlign: 'right',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  timeNotificationRead: {
    fontWeight: 'normal',
    color: 'gray',
    flex: 4,
    textAlign: 'right',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  deleteButton: {
    paddingLeft: 10
  }
});
