'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, PanResponder, View, StyleSheet } from 'react-native'
import SwipeableListItem from './SwipeableListItem'
import { screen } from '../../resources/styles/common'

export default class SwipeableFlatList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderItem: PropTypes.func.isRequired,
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func,
    itemBackgroundColor: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: '#fff'
  }

  _itemRef = undefined

  handleOpenChild = ref => {
    this._itemRef && this._itemRef.close && this._itemRef.close()
    this._itemRef = ref
    ref.props.right &&
      ref.props.right.props.onPress &&
      ref.props.right.props.onPress()
  }

  handleCloseChild = shouldReset => {
    this._itemRef = shouldReset ? undefined : this._itemRef
  }

  handleScroll = () => {
    this._itemRef && this._itemRef.close && this._itemRef.close()
  }

  render = () => {
    const {
      data,
      extraData,
      renderItem,
      renderLeft,
      renderRight,
      itemBackgroundColor,
      style
    } = this.props

    return (
      <FlatList
        {...this.props}
        data={data}
        extraData={extraData}
        renderItem={({ item }) => (
          <SwipeableListItem
            item={renderItem({ item })}
            left={renderLeft && renderLeft({ item })}
            right={renderRight && renderRight({ item })}
            backgroundColor={itemBackgroundColor}
            onOpen={this.handleOpenChild}
            onClose={this.handleCloseChild}
          />
        )}
        onScroll={this.handleScroll}
        style={style}
      />
    )
  }
}

// ItemSeparatorComponent={() => (
//   <View
//     style={{
//       marginHorizontal: screen.margin,
//       backgroundColor: 'black',
//       height: StyleSheet.hairlineWidth
//     }}
//   />
// )}
