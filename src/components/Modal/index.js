import React, {PureComponent} from 'react';
import BaseModal from 'react-native-modal';
import PropTypes from 'prop-types';

class Modal extends PureComponent {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    this.setState({isVisible: this.props.isVisible});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible !== this.props.isVisible) {
      this.setState({isVisible: this.props.isVisible});
    }
  }

  openModal = () => {
    this.setState({isVisible: true});
  };
  closeModal = () => {
    this.setState({isVisible: false});
  };
  toggleModal = () => {
    this.setState(prev => ({isVisible: !prev.isVisible}));
  };

  emptyFunc = () => {
  };

  render() {
    return (<BaseModal
      isVisible={this.state.isVisible}
      onBackdropPress={this.props.persist ? this.emptyFunc : this.closeModal}
      onBackButtonPress={this.props.persist ? this.emptyFunc : this.closeModal}>
      {this.props.children}
    </BaseModal>
    );
  }
}

export default Modal;

Modal.defaultProps = {
  persist: false,
};

Modal.propTypes = {
  isVisible: PropTypes.bool,
  persist: PropTypes.bool,
};
