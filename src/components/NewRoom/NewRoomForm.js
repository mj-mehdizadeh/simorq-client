import * as React from 'react';
import {Body, Container, Header, Icon, Input, Item, Left} from 'native-base';
import styles from './styles';

export default class NewRoomForm extends React.PureComponent {
  render() {
    return <Container style={styles.container}>
      <Header span style={styles.header}>
        <Left>
          <Icon name={'camera'}/>
        </Left>
        <Body>
          <Item>
            <Input placeholder="title"/>
          </Item>
        </Body>
      </Header>
      <Body>
        <Item>
          <Icon name="info"/>
          <Input placeholder="Description"/>
        </Item>
      </Body>
    </Container>;
  }
}

NewRoomForm.propTypes = {};
