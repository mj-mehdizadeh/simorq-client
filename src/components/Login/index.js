import React, {Component} from 'react';
import {Dimensions, Image} from 'react-native';
import {Button, Content, Form, Icon, Input, Item, Label, Picker, Text, View} from 'native-base';
import {random} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';

const imageSource = require('../../../assets/images/logo.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Login extends Component {
  state = {
    identity: 'mobile',
    identityIcon: 'phone',
    blobs: [],
  };

  componentDidMount() {
    const blobs = [];
    for (let i = 1; i < 30; i++) {
      const volume = random(1, 20);
      const left = random(0, screenWidth);
      const bottom = random(0, screenHeight);
      blobs.push(<View key={'blob-' + i} style={[styles.blob, {width: volume, height: volume, borderRadius: volume / 2, left, bottom}]}/>);
    }
    this.setState({blobs});
  }

  toggleIdentity = () => {
    this.setState(prev => {
      let identity, identityIcon;
      switch (prev.identity) {
        case 'mobile':
          identity = 'email';
          identityIcon = 'envelope';
          break;
        case 'email':
          identity = 'username';
          identityIcon = 'user';
          break;
        default:
          identity = 'mobile';
          identityIcon = 'phone';
          break;
      }
      return {
        identity,
        identityIcon,
      };
    });
  };

  render() {
    const {t, currentLang, languages, changeLang, onSubmit, goRegisterScreen} = this.props;
    const {blobs, identity, identityIcon} = this.state;
    return (<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0e3e66', '#2790b0']} style={styles.container}>
      {blobs.map(blob => (blob))}
      <View style={styles.picketWrap}>
        <Picker
          note mode="dropdown"
          style={styles.picker}
          selectedValue={currentLang}
          onValueChange={changeLang}>
          {languages.map(({id, i18nKey}) => (<Picker.Item key={`picker-${id}`} label={t(i18nKey)} value={id}/>))}
        </Picker>
      </View>
      <Content style={styles.content}>
        <View style={styles.heading}>
          <Image style={styles.logo} source={imageSource}/>
        </View>
        <Form style={styles.form}>
          <Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name={identityIcon}/>
            <Label style={styles.label}>{t(`login.${identity}`)}</Label>
            <Input selectionColor={'white'} style={styles.input}/>
          </Item>
          <Button transparent onPress={this.toggleIdentity} style={styles.changeIdentity}>
            <Icon name="exchange" style={styles.icon}/>
          </Button>
          <Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name="lock"/>
            <Label style={styles.label}>{t('login.password')}</Label>
            <Input selectionColor={'white'} style={styles.input}/>
          </Item>
          <View br/>
          <Button light big block noshadow style={styles.button} onPress={onSubmit}>
            <Text style={styles.btnTxt}>{t('login.loginBtn')}</Text>
          </Button>
          <Button big block transparent light>
            <Text style={styles.btnTxt}>{t('login.forgetPasswordBtn')}</Text>
          </Button>
          <View padder style={styles.signupWrap}>
            <Button big bordered light style={styles.signupBtn} onPress={goRegisterScreen}>
              <Text style={styles.btnTxt}>{t('login.signupBtn')}</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </LinearGradient>
    );
  }
}

export default translate()(Login);

Login.propTypes = {
  t: PropTypes.func.isRequired,
  currentLang: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  changeLang: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  goRegisterScreen: PropTypes.func.isRequired,
};
