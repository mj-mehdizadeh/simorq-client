// @flow
import * as React from 'react';
import SendBox from '../../components/SendBox';

export default class SendBoxContainer extends React.PureComponent {
  state = {
    text: '',
  };

  changeText = (text) => {
    this.setState({text});
  };

  render() {
    return <SendBox
      changeText={this.changeText}
      text={this.state.text}/>;
  }
}
