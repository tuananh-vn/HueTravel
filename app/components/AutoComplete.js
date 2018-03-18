import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes
} from 'react-native'

class AutoComplete extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ViewPropTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func,

    autoFocus: PropTypes.bool
  }

  static defaultProps = {
    data: [],
    defaultValue: '',
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: rowData => <Text>{rowData}</Text>,
    renderSeparator: null
  }

  constructor(props) {
    super(props)
    this.resultList = null
    this.state = {
      text: ''
    }
  }

  componentWillReceiveProps({ data }) {
    // const data = this.state.data.cloneWithRows(data);
    // this.setState({ data });
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this
    textInput && textInput.blur()
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this
    textInput && textInput.focus()
  }

  renderResultList() {
    // const { data } = this.state;
    const { listStyle, renderItem, extraData, keyExtractor, data } = this.props

    if (Array.isArray(data) && data.length > 0) {
      return (
        <FlatList
          ref={resultList => {
            this.resultList = resultList
          }}
          renderItem={renderItem}
          style={[styles.list, listStyle]}
          data={data}
          extraData={extraData}
          keyExtractor={keyExtractor}
        />
      )
    } else {
      return (
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Không có kết quả phù hợp</Text>
          </View>
        </View>
      )
    }
  }

  renderTextInput() {
    const { onSubmit, style, autoFocus } = this.props
    const props = {
      style: [styles.input, style],
      ref: ref => (this.textInput = ref),
      autoFocus: autoFocus,
      accessibilityLabel: 'autocomplete_textinput',
      onChangeText: text => {
        this.setState({ text })
      },
      onSubmitEditing: () => {
        onSubmit && onSubmit(this.state.text)
      },
      ...this.props
    }

    return <TextInput {...props} />
  }

  render() {
    const { data } = this.props
    const {
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture
    } = this.props
    const showResults = data.length > 0

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults)

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
        </View>
        {!hideResults && (
          <View
            style={listContainerStyle}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {this.renderResultList()}
          </View>
        )}
      </View>
    )
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
}

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    ...border,
    marginBottom: 0
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 0,
    marginTop: 0
  }
}

const iosStyles = {
  container: {
    zIndex: 1
  },
  inputContainer: {
    ...border
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    right: 0
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
})

export default AutoComplete
