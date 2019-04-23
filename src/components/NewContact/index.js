import * as React from 'react';
import PropTypes from 'prop-types';
import {FlatList, InteractionManager} from 'react-native';
import {Body, Button, Col, Container, Content, Form, Grid, Header, Icon, Input, Item, Label, Left, ListItem, Right, Spinner, Text, Title, View} from 'native-base';
import styles from './styles';
import {translate} from 'react-i18next';
import {goBack} from '../../utils/navigator';

class NewContact extends React.PureComponent {
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
    const {t, page, showSubmit, loading, onSubmit} = this.props;
    return <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent>
            <Icon onPress={goBack} style={styles.arrowIcon} name={'arrow-back'}/>
          </Button>
        </Left>
        <Body>
          {page === 'CREATE' && (<Title bold>{t(`newContact.new`)}</Title>)}
          {page === 'EDIT' && (<Title bold>{t(`newContact.edit`)}</Title>)}
        </Body>
      </Header>
      <Content style={styles.flex}>
        {this.renderCreate()}
      </Content>
      {this.state.search && this.renderCountryList()}
      {(!this.state.search && showSubmit) && (<Button onPress={onSubmit} round primary bottomRight>
        {loading ? (<Spinner color="white"/>) : (<Icon name="arrow-forward"/>)}
      </Button>)}
    </Container>;
  }

  renderCreate() {
    const {t, firstName, lastName, phoneNumber, countryCode, countryName, changeFirstName, changeLastName, changePhoneNumber, searchCountry, changeCountryCode} = this.props;
    return (<Form>
      <Item stackedLabel>
        <Label style={styles.label}>{t('newContact.firstName')}</Label>
        <Input
          value={firstName}
          onChangeText={changeFirstName}/>
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
      <Item stackedLabel>
        <Label style={styles.label}>{t('newContact.lastName')}</Label>
        <Input
          value={lastName}
          onChangeText={changeLastName}/>
      </Item>
      <Item stackedLabel>
        <Label style={styles.label}>{t('login.country')}</Label>
        <Input
          value={countryName}
          onChangeText={searchCountry}
          onFocus={this.focusSearch}/>
      </Item>
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

NewContact.propTypes = {
  t: PropTypes.func.isRequired,

  page: PropTypes.string,
  showSubmit: PropTypes.boolean,
  loading: PropTypes.boolean,
  onSubmit: PropTypes.func.isRequired,

  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  countryName: PropTypes.string,
  countryCode: PropTypes.string,

  changeFirstName: PropTypes.func.isRequired,
  changeLastName: PropTypes.func.isRequired,
  changePhoneNumber: PropTypes.func.isRequired,
  changeCountryCode: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  searchCountry: PropTypes.func.isRequired,
};
export default translate()(NewContact);
