import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Panel from '../Panel';
import InfoRow from '../InfoRow';
import LoadingButton from '../LoadingButton';
import { screen } from '../../resources/styles/common';
import { scale } from '../../utils/scaling';
import * as utils from '../../utils';

export class CSTicketItem extends Component {
  constructor(props) {
    super(props);
    this.hasChanges = true;
    this.state = {
      isMyTicket: props.isMyTicket,
      status: props.item.status,
      timetables_length:
        Array.isArray(props.item.timetables) && props.item.timetables.length,
      user_id: props.item.user && props.item.user.teko_id
    };
  }

  componentWillReceiveProps(nextProps) {
    this.hasChanges =
      this.state.isMyTicket !== nextProps.isMyTicket ||
      this.state.status !== nextProps.item.status ||
      (Array.isArray(nextProps.item.timetables) &&
        this.state.timetables_length !== nextProps.item.timetables.length) ||
      (nextProps.item.user &&
        this.state.user_id !== nextProps.item.user.teko_id);
    this.hasChanges = this.hasChanges ? true : false;
    if (this.hasChanges) {
      this.setState({
        isMyTicket: nextProps.isMyTicket,
        status: nextProps.item.status,
        timetables_length:
          Array.isArray(nextProps.item.timetables) &&
          nextProps.item.timetables.length,
        user_id: nextProps.item.user && nextProps.item.user.teko_id
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.hasChanges ? true : false;
  }

  render() {
    let {
      item,
      onTakeTicket,
      onAssignTicket,
      onTicketDetail,
      onScheduleMeeting,
      onShowMap,
      onShowHistory,
      ticketUnderProcessing,
      isMyTicket,
      canAssignTicket
    } = this.props;

    let scheduledDate = null;
    if (Array.isArray(item.timetables)) {
      let tb = item.timetables.slice();
      tb.sort((a, b) => b.created_at.localeCompare(a.created_at));
      scheduledDate = tb[0] && tb[0].time ? tb[0].time : null;
    }

    return (
      <TouchableOpacity
        accessibilityLabel="csticket_item"
        onPress={() => onTicketDetail && onTicketDetail(item)}>
        <Panel
          accessibilityLabel="csticket_item_panel"
          key={item.id}
          caption={'# ' + item.id}
          captionRightText={
            utils.getCSConstants('priority', item.priority).text
          }
          captionRightTextStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: utils.getCSConstants('priority', item.priority).color,
            backgroundColor: 'transparent',
            color: utils.getCSConstants('priority', item.priority).color,
            paddingHorizontal: 10,
            paddingVertical: 3,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}
          captionTextStyle={{ fontWeight: 'bold' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 8 }}>
              <InfoRow
                accessibilityLabel="csticket_item_cafe_username"
                caption="Tên GCafe:"
                information={item.cafe_username}
                captionFlex={4}
                infoFlex={4}
              />
              <InfoRow
                accessibilityLabel="csticket_item_cafe_uid"
                caption="Gcafe ID:"
                information={item.cafe_uid}
                captionFlex={4}
                infoFlex={4}
              />
              <InfoRow
                accessibilityLabel="csticket_name_customer_name"
                caption="Khách hàng:"
                information={item.customer_name}
                captionFlex={4}
                infoFlex={4}
              />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
              <TouchableOpacity
                accessibilityLabel="csticket_show_map"
                style={{ flex: 1 }}
                onPress={() => onShowMap && onShowMap(item)}
                activeOpacity={0.8}>
                <Image
                  source={require('../../resources/images/sat-map.jpg')}
                  style={{ width: scale(50), height: scale(50) }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <InfoRow
            accessibilityLabel="csticket_item_mobile_phone"
            caption="Số điện thoại:"
            information={utils.phonesWithSpace(
              item.customer_mobile_phone,
              item.customer_home_phone
            )}
            captionFlex={4}
            infoFlex={6}
          />
          <InfoRow
            accessibilityLabel="csticket_item_address"
            caption="Địa chỉ:"
            captionStyle={{ alignSelf: 'flex-start' }}
            information={utils.getCustomerFullAddress({
              province: item.province_teko_name,
              district: item.district_teko_name,
              street: item.customer_address_street || item.customer_address
            })}
            captionFlex={4}
            infoFlex={6}
          />
          <InfoRow
            accessibilityLabel="csticket_item_created_at"
            caption="Ngày tạo:"
            information={utils.formatDateWithoutTimeZone(
              item.created_at,
              'DD/MM/YYYY - HH:mm'
            )}
            captionFlex={4}
            infoFlex={6}
          />
          <InfoRow
            accessibilityLabel="csticket_item_status"
            caption="Trạng thái:"
            information={utils.getCSConstants('status', item.status).text}
            informationTextStyle={{
              backgroundColor: utils.getCSConstants('status', item.status)
                .color,
              borderRadius: 3,
              overflow: 'hidden',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              paddingHorizontal: 3,
              textAlignVertical: 'top',
              alignSelf: 'flex-start'
            }}
            captionFlex={4}
            infoFlex={6}
          />
          <InfoRow
            accessibilityLabel="csticket_item_type"
            caption="Loại phiếu:"
            information={
              item.type || utils.getCSConstants('type', item.type_id).text
            }
            captionFlex={4}
            infoFlex={6}
          />
          {item.user ? (
            <InfoRow
              accessibilityLabel="csticket_item_user_name"
              caption="Người xử lý:"
              information={item.user.name}
              captionFlex={4}
              infoFlex={6}
            />
          ) : null}
          {item.status < 3 && this.props.isMyTicket ? (
            <InfoRow
              accessibilityLabel="csticket_item_schedule_date"
              caption="Lịch hẹn:"
              information={
                scheduledDate
                  ? utils.formatDateWithoutTimeZone(
                      scheduledDate,
                      'DD/MM/YYYY - HH:mm'
                    )
                  : '-'
              }
              clickable={
                <Text
                  accessibilityLabel="csticket_item_schedule_date_schedule"
                  style={{
                    textDecorationLine: 'underline',
                    color: '#45adff',
                    textAlign: 'right',
                    fontWeight: 'bold'
                  }}>
                  Đặt lịch
                </Text>
              }
              onClick={() =>
                !ticketUnderProcessing &&
                onScheduleMeeting &&
                onScheduleMeeting(item)
              }
              captionFlex={4}
              infoFlex={6}
            />
          ) : null}
          {item.status < 3 && (canAssignTicket || item.status === 0) ? (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10
              }}>
              {canAssignTicket ? (
                <LoadingButton
                  accessibilityLabel="csticket_item_assign"
                  processing={ticketUnderProcessing}
                  buttonText="Gán phiếu"
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: '#f6a426' }
                  ]}
                  buttonTextStyle={{ textAlign: 'center' }}
                  onPress={() => onAssignTicket && onAssignTicket(item)}
                />
              ) : null}
              {item.status === 0 ? (
                <LoadingButton
                  accessibilityLabel="csticket_item_receive"
                  processing={ticketUnderProcessing}
                  buttonText="Nhận phiếu"
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: '#1fb08a' }
                  ]}
                  buttonTextStyle={{ textAlign: 'center' }}
                  onPress={() => onTakeTicket && onTakeTicket(item)}
                />
              ) : null}
            </View>
          ) : null}
        </Panel>
      </TouchableOpacity>
    );
  }
}

export default CSTicketItem;

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: 'white',
    fontSize: 20
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 2,
    borderRadius: 3,
    alignItems: 'center',
    height: 0.06 * Dimensions.get('window').height
  }
});
