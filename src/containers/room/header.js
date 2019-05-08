// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRoomProp} from '../../selector/rooms';
import {RoomHeader} from '../../components/RoomHeader';

class RoomHeaderContainer extends React.PureComponent {
  render() {
    const {roomId, title} = this.props;
    return <RoomHeader roomId={roomId} title={title}/>;
  }
}

RoomHeaderContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    title: getRoomProp(state, {roomId: props.roomId, key: 'title'}),
  };
};

export default connect(
  mapStateToProps,
)(RoomHeaderContainer);
