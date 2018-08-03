import React, {Component} from 'react';
import {Body, Button, Container, Header, Icon, Left, Right, Title} from 'native-base';


class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu"/>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}

export default Home;
