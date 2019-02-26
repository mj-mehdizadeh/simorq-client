// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Avatar from '../../components/Avatar/index';
import {getRoomProp} from '../../selector/rooms';

class AvatarContainer extends React.PureComponent {
  render() {
    const {size, avatar} = this.props;
    return <Avatar
      size={size}
      initial={avatar.initial}
      color={avatar.color}
      backgroundColor={avatar.backgroundColor}
      uri={avatar.file ? avatar.file.uri : null}/>;
  }
}

AvatarContainer.propTypes = {
  size: PropTypes.string,
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    avatar: getRoomProp(state, {roomId: props.roomId, key: 'avatar'}),
  };
};

export default connect(
  mapStateToProps,
)(AvatarContainer);
