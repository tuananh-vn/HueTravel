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
import { sprintf } from 'sprintf-js';
import Panel from '../Panel';
import InfoRow from '../InfoRow';
import LoadingButton from '../LoadingButton';
import { screen } from '../../resources/styles/common';
import { scale } from '../../utils/scaling';
import * as utils from '../../utils';

export class CSHistoryItem extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item);
  // }

  render() {
    let { item } = this.props;

    return (
      <Panel
        accessibilityLabel="cshistory_item_panel"
        key={item.id}
        caption={'# ' + item.id}
        captionRightText={utils.getCSConstants('priority', item.priority).text}
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
        <InfoRow
          accessibilityLabel="cshistory_item_created_at"
          caption="Ngày tạo:"
          information={utils.formatDateWithoutTimeZone(
            item.created_at,
            'DD/MM/YYYY - HH:mm'
          )}
          captionFlex={4}
          infoFlex={6}
        />
        {item.user ? (
          <InfoRow
            accessibilityLabel="cshistory_item_user_name"
            caption="Người xử lý:"
            information={sprintf(
              '%s - %s\n(%s)',
              item.user.name,
              item.user.teko_id,
              item.user.email
            )}
            captionFlex={4}
            infoFlex={6}
          />
        ) : null}
        <InfoRow
          accessibilityLabel="cshistory_item_status"
          caption="Trạng thái:"
          information={utils.getCSConstants('status', item.status).text}
          informationTextStyle={{
            backgroundColor: utils.getCSConstants('status', item.status).color,
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
          accessibilityLabel="cshistory_item_type"
          caption="Loại phiếu:"
          information={
            item.type || utils.getCSConstants('type', item.type_id).text
          }
          captionFlex={4}
          infoFlex={6}
        />
        <InfoRow
          accessibilityLabel="cshistory_item_content"
          caption="Nội dung:"
          information={item.note}
          captionFlex={4}
          infoFlex={6}
          rowStyle={{
            paddingBottom: screen.padding
          }}
        />
        <InfoRow
          accessibilityLabel="cshistory_item_note"
          caption="Các ghi chú:"
          captionTextStyle={{ color: '#F79648' }}
          information={item.works.length > 0 ? '' : 'Không có'}
          captionFlex={4}
          infoFlex={6}
          rowStyle={{
            borderTopWidth: 1,
            borderColor: 'grey',
            paddingTop: screen.padding
          }}
        />
        {item.works.map(note => (
          <InfoRow
            accessibilityLabel="cshistory_item_note_created_at"
            key={note.id}
            caption={utils.formatDateWithoutTimeZone(
              note.created_at,
              'DD/MM/YYYY'
            )}
            information={
              <Text>
                <Text style={{ color: 'grey' }}>
                  {sprintf('%s (%s)', note.user.name, note.user.teko_id)}
                </Text>
                {'\n'}
                {note.work_note}
              </Text>
            }
            captionTextStyle={{ color: 'grey' }}
            captionStyle={{ alignSelf: 'flex-start' }}
            captionFlex={4}
            infoFlex={6}
          />
        ))}
      </Panel>
    );
  }
}

export default CSHistoryItem;

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
    height: 0.06 * screen.height
  }
});
