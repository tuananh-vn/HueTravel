import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Icon } from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'
import * as utils from '../utils'

export default class InputRow extends Component {
  static propTypes = {
    rowStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    captionStyle: PropTypes.object,
    captionTextStyle: PropTypes.object,
    caption: PropTypes.string,
    inputType: PropTypes.oneOf([
      'textInput',
      'numberInput',
      'picker',
      'textMultiline',
      'captionOnly'
    ]),
    hasFindButton: PropTypes.bool,
    inputValue: PropTypes.string,
    onFind: PropTypes.func,
    onEndEditing: PropTypes.func,
    editable: PropTypes.bool,
    onChangeText: PropTypes.func,
    clearTextOnFocus: PropTypes.bool,
    unit: PropTypes.string,
    unitStyle: PropTypes.object,
    unitTextStyle: PropTypes.object
  }

  static defaultProps = {
    rowStyle: {},
    inputStyle: {},
    captionStyle: {},
    captionTextStyle: {},
    unitStyle: {},
    unitTextStyle: {},
    caption: '',
    inputType: 'textInput',
    hasFindButton: false,
    inputValue: '',
    clearTextOnFocus: false,
    pickerData: [],
    editable: true,
    placeholder: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      takeValueFromProps: true,
      contentInputOffsetY: 0
    }
  }

  onInputFocus() {
    this.setState({
      takeValueFromProps: false
    })

    if (this.props.clearTextOnFocus) this.props.onChangeText('')
    this.props.onInputSelected &&
      this.props.onInputSelected(this.state.contentInputOffsetY)
  }

  measureContentInput() {
    this.mainView.measure(
      (frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        var offsetY =
          Platform.OS === 'android' && Platform.Version <= 20
            ? pageOffsetY
            : frameOffsetY
        this.setState({ contentInputOffsetY: offsetY > 0 ? offsetY : 0 })
      }
    )
  }

  onInputBlur() {
    this.setState({
      takeValueFromProps: true
    })
  }

  onEditEnd() {
    if (
      this.props.inputType === 'numberInput' &&
      this.props.inputValue &&
      (this.props.inputValue.length === 0 ||
        isNaN(utils.textWithoutCommas(this.props.inputValue)))
    ) {
      this.props.onChangeText('0')
    }

    if (this.props.onFind && this.props.inputValue) {
      this.props.onFind(this.props.inputValue, true)
    }
  }

  render() {
    let {
      rowStyle,
      inputStyle,
      captionStyle,
      captionTextStyle,
      unitStyle,
      unitTextStyle,
      caption,
      inputType,
      hasFindButton,
      inputValue,
      onFind,
      onEndEditing,
      onChangeText,
      pickerData,
      editable,
      unit,
      accessibilityLabel
    } = this.props

    // let textToDisplay = this.state.takeValueFromProps? this.props.inputValue:this.state.inputValue;

    let renderInput = () => {
      switch (inputType) {
        case 'numberInput':
          return (
            <TextInput
              accessibilityLabel={accessibilityLabel}
              keyboardType="numeric"
              style={[
                hasFindButton ? styles.rowInputWithLookup : styles.rowInput,
                inputStyle,
                { backgroundColor: editable ? 'white' : 'whitesmoke' }
              ]}
              onChangeText={text => onChangeText && onChangeText(text)}
              onEndEditing={() => this.onEditEnd()}
              onFocus={() => this.onInputFocus()}
              onBlur={() => this.onInputBlur()}
              value={this.props.inputValue}
              underlineColorAndroid="transparent"
              editable={editable}
              maxLength={20}
              placeholder={this.props.placeholder}
              placeholderTextColor="lightgray"
            />
          )
        case 'picker':
          return (
            <ModalSelector
              accessibilityLabel={accessibilityLabel}
              data={pickerData}
              style={[
                styles.pickerInput,
                inputStyle,
                { backgroundColor: editable ? 'white' : 'whitesmoke' }
              ]}
              onChangeText={text => onChangeText && onChangeText(text)}
              selectStyle={{ borderWidth: 0, padding: 0 }}
              selectTextStyle={{
                color: '#555',
                textAlign: 'left',
                fontWeight: 'bold'
              }}
              initValue={this.props.inputValue}
              cancelText="Đóng"
              onChange={option => onEndEditing(option.key, option.label)}
              disabled={!editable}
            />
          )
        case 'textMultiline':
          return (
            <TextInput
              accessibilityLabel={accessibilityLabel}
              style={[
                hasFindButton ? styles.rowInputWithLookup : styles.rowInput,
                { textAlignVertical: 'top', padding: 5, marginLeft: 1 },
                inputStyle,
                { backgroundColor: editable ? 'white' : 'whitesmoke' }
              ]}
              onChangeText={text => onChangeText && onChangeText(text)}
              // onEndEditing={() => onEndEditing(this.state.inputValue)}
              onFocus={() => this.onInputFocus()}
              onBlur={() => this.onInputBlur()}
              value={this.props.inputValue}
              underlineColorAndroid="transparent"
              editable={editable}
              maxLength={255}
            />
          )
        case 'captionOnly':
          return null
        case 'textInput':
        default:
          return (
            <TextInput
              accessibilityLabel={accessibilityLabel}
              style={[
                hasFindButton ? styles.rowInputWithLookup : styles.rowInput,
                inputStyle,
                { backgroundColor: editable ? 'white' : 'whitesmoke' }
              ]}
              onChangeText={text => onChangeText && onChangeText(text)}
              // onEndEditing={() => onEndEditing(this.state.inputValue)}
              onFocus={() => this.onInputFocus()}
              onBlur={() => this.onInputBlur()}
              value={this.props.inputValue}
              underlineColorAndroid="transparent"
              editable={editable}
              maxLength={50}
            />
          )
      }
    }

    return (
      <View
        style={[styles.contentRow, rowStyle]}
        ref={ref => {
          this.mainView = ref
        }}
        onLayout={() => this.measureContentInput()}
      >
        <View style={[styles.rowCaption, captionStyle]}>
          <Text
            style={[styles.captionTextStyle, captionTextStyle]}
            accessibilityLabel="input_row_caption"
          >
            {caption}
          </Text>
        </View>
        {renderInput()}
        {hasFindButton ? (
          <TouchableOpacity
            style={styles.rowLookupButton}
            onPress={() => {
              onFind && inputValue ? onFind(inputValue, true) : {}
            }}
            disabled={!this.props.editable}
          >
            <Icon name={'search'} size={25} color="white" />
          </TouchableOpacity>
        ) : null}
        {unit ? (
          <View style={[styles.rowCaption, unitStyle]}>
            <Text style={[styles.captionTextStyle, unitTextStyle]}>{unit}</Text>
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    height: 40
  },
  rowCaption: {
    flex: 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5
  },
  rowInput: {
    flex: 6,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 2,
    margin: 5,
    marginLeft: -2,
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    padding: Platform.OS === 'ios' ? 2 : 1,
    paddingLeft: 5,
    color: '#555',
    fontWeight: 'bold'
  },
  rowInputWithLookup: {
    flex: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 2,
    margin: 5,
    fontSize: Platform.OS === 'ios' ? 14 : 13,
    padding: Platform.OS === 'ios' ? 2 : 1,
    paddingLeft: 5,
    color: '#555',
    fontWeight: 'bold'
  },
  pickerInput: {
    flex: 6,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 2,
    margin: 5,
    marginLeft: -2,
    padding: Platform.OS === 'ios' ? 2 : 1,
    paddingLeft: 5
  },
  rowLookupButton: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#28384b',
    margin: 5,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center'
  },
  captionTextStyle: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 14 : 13
  },
  buttonText: {
    fontSize: Platform.OS === 'ios' ? 14 : 13
  }
})
