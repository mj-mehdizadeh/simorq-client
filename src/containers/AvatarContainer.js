// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AvatarComponent from '../components/Avatar';
import {getRoomProp} from '../selector/rooms';

class AvatarContainer extends React.PureComponent {
  render() {
    return <AvatarComponent
      message={this.props.message}/>;
  }
}

AvatarContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    avatar: getRoomProp(state, props),
  };
};

export default connect(
  mapStateToProps
)(AvatarContainer);