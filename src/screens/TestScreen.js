import React, {Component} from 'react';
import {Body, Container, Header, Title} from 'native-base';
import {translate} from 'react-i18next';

class TestScreen extends Component {
  render() {
    const {t} = this.props;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Test Screen</Title>
          </Body>
        </Header>
      </Container>
    );
  }
}

export default translate()(TestScreen);
