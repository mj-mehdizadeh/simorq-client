import * as React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Radio,
  Spinner,
  Text,
  Textarea,
  Title,
  View,
} from 'native-base';
import styles from './styles';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {goBack} from '../../services/navigator';

class NewRoom extends React.PureComponent {
  render() {
    const {t, page, type, loading, onSubmit} = this.props;
    return <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent>
            <Icon onPress={goBack} style={styles.arrowIcon} name={'arrow-back'}/>
          </Button>
        </Left>
        <Body>
        {page === 'CREATE' && (<Title bold>{t(`newRoom.header_${type}`)}</Title>)}
        {page === 'COMPLETE' && (<Title bold>{t(`newRoom.privacy`)}</Title>)}
        </Body>
      </Header>
      <Content padder>
        {page === 'CREATE' && this.renderCreate()}
        {page === 'COMPLETE' && this.renderComplete()}
      </Content>
      <Button round primary bottomRight onPress={loading ? null : onSubmit}>
        {loading ? (<Spinner color="white"/>) : (<Icon name="arrow-forward"/>)}
      </Button>
    </Container>;
  }

  renderCreate() {
    const {t, type, title, info, changeTitle, changeInfo} = this.props;
    return (<View>
      <View style={styles.titleWrap}>
        <TouchableWithoutFeedback>
          <View style={styles.avatarPicker}>
            <Icon style={styles.avatarPickerIcon} name={'camera'} type={'MaterialCommunityIcons'}/>
          </View>
        </TouchableWithoutFeedback>
        <Item>
          <Input autoFocus={true}
                 value={title}
                 onChangeText={changeTitle}
                 placeholder={t(`newRoom.title_${type}`)}/>
        </Item>
      </View>
      <Item style={styles.item}>
        <Icon style={styles.icon} name="info"/>
        <Textarea
          rowSpan={2}
          value={info}
          onChangeText={changeInfo}
          style={styles.infoInput}
          placeholder={t('newRoom.info')}/>
      </Item>
      <Text note>{t('newRoom.infoHint')}</Text>
    </View>);
  }

  renderComplete() {
    return (<View>
      <Item style={styles.pubWrap}>
        <View style={styles.pubItem}>
          <Radio selected={true}/>
          <Text style={styles.pubText}>Private</Text>
        </View>
        <View style={styles.pubItem}>
          <Radio selected={true}/>
          <Text style={styles.pubText}>Public</Text>
        </View>
      </Item>

      <Item style={styles.item}>
        <Icon style={styles.icon} name="link"/>
        <Text style={styles.usernameHolder}>https://30q.me/</Text>
        <Input style={styles.usernameInput} placeholder="Username"/>
      </Item>
    </View>);
  }
}

NewRoom.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.oneOf(['CREATE', 'COMPLETE']).isRequired,
  type: PropTypes.oneOf(['GROUP', 'CHANNEL']).isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
  changeTitle: PropTypes.func,
  changeInfo: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
export default translate()(NewRoom);
