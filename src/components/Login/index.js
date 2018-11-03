import React, {Component} from 'react';
import {FlatList, InteractionManager} from 'react-native';
import {Body, Col, Container, Content, Fab, Form, Grid, Header, Icon, Input, Item, Label, Left, ListItem, Right, Spinner, Text, Title, View} from 'native-base';
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
    const {t, loading, phoneNumber, countryName, countryCode, searchCountry, changeCountryCode, changePhoneNumber, onSubmit} = this.props;
    return (
      <Container>
        <Header>
          <Body>
            <Title>{t('login.title')}</Title>
          </Body>
        </Header>
        <Content style={styles.flex}>
          <Form>
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
          </Form>
        </Content>
        {this.state.search && this.renderCountryList()}
        {(!this.state.search && !!phoneNumber) && (<Fab
          style={styles.fabStyle}
          position="bottomRight"
          onPress={onSubmit}>
          {loading ? (<Spinner color="#ffffff"/>) : (<Icon name="arrow-forward"/>)}
        </Fab>)}
      </Container>
    );
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
  loading: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string,
  countryName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  countryList: PropTypes.array,
  searchCountry: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  changeCountryCode: PropTypes.func.isRequired,
  changePhoneNumber: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
