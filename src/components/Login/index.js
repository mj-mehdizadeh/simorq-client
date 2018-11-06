import React, {Component} from 'react';
import {FlatList, InteractionManager, TouchableWithoutFeedback} from 'react-native';
import {Body, Button, Col, Container, Content, Form, Grid, Header, Icon, Input, Item, Label, Left, ListItem, Right, Spinner, Text, Thumbnail, Title, View} from 'native-base';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import styles from './styles';


class Login extends Component {
  state = {
    search: false,
  };

  selectCountry = (country) => {
    const {selectCountry} = this.props;
    this.setState({search: false});
    selectCountry(country);
  };

  focusSearch = () => {
    this.setState({search: true});
  };

  render() {
    const {t, state, loading, showSubmit, onSubmit} = this.props;
    return (
      <Container>
        <Header>
          <Body>
            <Title>{t('login.title')}</Title>
          </Body>
        </Header>
        <Content style={styles.flex}>
          {state === 'sendCode' && this.renderSendCode()}
          {state === 'login' && this.renderLogin()}
          {state === 'register' && this.renderRegister()}
        </Content>
        {this.state.search && this.renderCountryList()}
        {(!this.state.search && showSubmit) && (<Button onPress={onSubmit} round primary bottomRight>
          {loading ? (<Spinner color="white"/>) : (<Icon name="arrow-forward"/>)}
        </Button>)}
      </Container>
    );
  }

  renderSendCode() {
    const {t, countryName, countryCode, phoneNumber, searchCountry, changeCountryCode, changePhoneNumber} = this.props;
    return (<Form>
      <Item stackedLabel>
        <Label style={styles.label}>{t('login.country')}</Label>
        <Input
          value={countryName}
          onChangeText={searchCountry}
          onFocus={this.focusSearch}/>
      </Item>
      <Grid>
        <Col size={2}>
          <Item>
            <Input
              style={styles.countryCode}
              keyboardType={'phone-pad'}
              onChangeText={changeCountryCode}
              value={countryCode}
            />
          </Item>
        </Col>
        <Col size={8}>
          <Item stackedLabel>
            <Label style={styles.label}>{t('login.phoneNumber')}</Label>
            <Input
              autoFocus={true}
              keyboardType={'phone-pad'}
              value={phoneNumber}
              onChangeText={changePhoneNumber}/>
          </Item>
        </Col>
      </Grid>
      <Text style={styles.help}>{t('login.help')}</Text>
      <View padder>
        <Button primary transparent>
          <Text>{t('login.privacy')}</Text>
        </Button>
      </View>
    </Form>);
  }

  renderLogin() {
    const {t, phoneCode, changePhoneCode, countryCode, phoneNumber, invalidCode} = this.props;
    return (<Form>
      <Item floatingLabel error={invalidCode}>
        <Label style={styles.label}>{t('login.phoneCode')}</Label>
        <Input
          autoFocus={true}
          value={phoneCode}
          keyboardType={'numeric'}
          onChangeText={changePhoneCode}/>
        {invalidCode && (<Icon name="remove-circle"/>)}
      </Item>
      <Text style={styles.help}>
        {t('login.helpSendCode')} <Text style={styles.phoneNumber}>{countryCode + ' ' + phoneNumber}</Text>.
      </Text>
    </Form>);
  }

  renderRegister() {
    const {t, title, changeTitle, avatarUri} = this.props;
    return (<Form style={styles.registerForm}>
      <Grid>
        <Col size={2} style={styles.thumbWrap}>
          {!!avatarUri && (<TouchableWithoutFeedback>
            <Thumbnail source={{uri: avatarUri}}/>
          </TouchableWithoutFeedback>)}
          {!avatarUri && (<Button info round>
            <Icon name="add"/>
          </Button>
          )}
        </Col>
        <Col size={7}>
          <Item floatingLabel>
            <Label style={styles.label}>{t('login.titleField')}</Label>
            <Input
              autoFocus={true}
              value={title}
              onChangeText={changeTitle}/>
          </Item>
        </Col>
      </Grid>
    </Form>);
  }

  renderCountryList() {
    const {countryList} = this.props;
    return (
      <View style={styles.countryList}>
        <FlatList
          style={styles.flatList}
          data={countryList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _keyExtractor = (item) => `country-${item.code}`;
  _renderItem = ({item}) => (
    <ListItem style={styles.item} onPress={() => {
      InteractionManager.runAfterInteractions(() => {
        this.selectCountry(item);
      });
    }}>
      <Left>
        <Text>{item.name}</Text>
      </Left>
      <Right>
        <Text note>{item.dial_code}</Text>
      </Right>
    </ListItem>
  );
}

export default translate()(Login);

Login.propTypes = {
  t: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showSubmit: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string,
  countryName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  countryList: PropTypes.array,
  phoneCode: PropTypes.string,
  title: PropTypes.string,
  invalidCode: PropTypes.bool,
  searchCountry: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  changeCountryCode: PropTypes.func.isRequired,
  changePhoneNumber: PropTypes.func.isRequired,
  changePhoneCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
