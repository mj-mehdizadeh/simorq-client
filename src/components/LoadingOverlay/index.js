import React, {Component} from 'react';
import Modal from '../Modal';
import {View} from 'react-native';
import styles from './styles';
import {Body, Card, CardItem, Spinner, Text} from 'native-base';
import {Trans} from 'react-i18next';
import PropTypes from 'prop-types';

class LoadingOverlay extends Component {

  openLoading = () => {
    this.modal.openModal();
  };

  closeLoading = () => {
    this.modal.closeModal();
  };

  modalRefFunc = (ref) => {
    this.modal = ref;
  };

  render() {
    return (<Modal
      persist={true}
      ref={this.modalRefFunc}
      isVisible={this.props.isVisible}>
      <View style={styles.container}>
        <Card>
          <CardItem style={styles.cardItem}>
            <Body style={styles.cardBody}>
              <Spinner/>
              <Text style={styles.txt}><Trans i18nKey={'common.loading'}/></Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Modal>);
  }
}

export default LoadingOverlay;

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool,
};
