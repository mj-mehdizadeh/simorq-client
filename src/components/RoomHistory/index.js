// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Subtitle, Text, Title} from 'native-base';
import MessageContainer from '../../containers/MessageContainer';
import AvatarContainer from '../../containers/room/AvatarContainer';
import styles from './styles';

class RoomHistory extends React.PureComponent  {

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item}) => (<MessageContainer id={item}/>);

  render() {
    const {t, roomId, panHandlers} = this.props;
    return <View style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={this.props.close}>
            <Icon name="arrow-back"/>
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <AvatarContainer roomId={roomId}/>
          <View style={styles.headerTitleWrap}>
            <Title style={styles.headerTitle} bold>Title</Title>
            <Subtitle style={styles.headerSubTitle}>Subtitle</Subtitle>
          </View>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="more-vert"/>
          </Button>
        </Right>
      </Header>
      {this.props.loading && (<View style={styles.loadingWrap}>
        <Text style={styles.loading}>{t('history.loading')}</Text>
      </View>)}
      {!this.props.loading && (<FlatList
        {...panHandlers}
        style={styles.content}
        data={this.props.history}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />)}
    </View>;
  }
}

RoomHistory.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
};

export default translate()(RoomHistory);
