import React, {Component} from 'react';
import {Container, Spinner} from 'native-base';
import styles from './styles';

class LoadingPage extends Component {
  render() {
    return (<Container style={styles.container}>
      <Spinner/>
    </Container>);
  }
}

export default LoadingPage;
