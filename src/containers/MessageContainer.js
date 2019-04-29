// @flow
import * as React from 'react';
import RoomMessage from '../components/RoomMessage';
import PropTypes from 'prop-types';
import {getMessage} from '../selector/messages';
import {connect} from 'react-redux';

class MessageContainer extends React.Component {
  render() {
    if (!this.props.message) {
      return null;
    }
    return <RoomMessage
      message={this.props.message}/>;
  }
}

MessageContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
const mapStateToProps = (state, props) => ({
  message: getMessage(state, props.id),
});

export default connect(mapStateToProps)(MessageContainer);
