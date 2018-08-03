import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Button, Content, Form, Icon, Input, Item, Label, Text, View} from 'native-base';
import {random} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import LoadingOverlay from '../LoadingOverlay';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Register extends Component {
  state = {
    loading: false,
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

  onSubmit = async (props) => {
    const {onSubmit} = this.props;
    this.setState({loading: true});
    await onSubmit(props);
    this.setState({loading: false});
  };

  render() {
    const {blobs} = this.state;
    const {t, state, goBack} = this.props;
    return (<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0e3e66', '#2790b0']} style={styles.container}>
      {blobs.map(blob => (blob))}
      <Content style={styles.content}>
        <Form style={styles.form}>

          <Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name="phone"/>
            <Label style={styles.label}>{t('register.mobile')}</Label>
            <Input disabled={state > 0} selectionColor={'white'} style={styles.input}/>
          </Item>

          {state >= 1 && (<Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name="check"/>
            <Label style={styles.label}>{t('register.verify')}</Label>
            <Input disabled={state > 1} selectionColor={'white'} style={styles.input}/>
          </Item>)}

          {state >= 2 && (<Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name="lock"/>
            <Label style={styles.label}>{t('register.password')}</Label>
            <Input selectionColor={'white'} style={styles.input}/>
          </Item>)}
          {state >= 2 && (<Item floatingLabel style={styles.item}>
            <Icon style={styles.icon} name="lock"/>
            <Label style={styles.label}>{t('register.rePassword')}</Label>
            <Input selectionColor={'white'} style={styles.input}/>
          </Item>)}

          <View br/>
          <Button light big block noshadow style={styles.button} onPress={this.onSubmit}>
            <Text style={styles.btnTxt}>{t('register.nextBtn')}</Text>
          </Button>
          <View padder style={styles.signupWrap}>
            <Button big block transparent light style={styles.signupBtn} onPress={goBack}>
              <Text style={styles.btnTxt}>{t('register.loginBtn')}</Text>
            </Button>
          </View>
        </Form>
        <LoadingOverlay isVisible={this.state.loading}/>
      </Content>
    </LinearGradient>
    );
  }
}

export default translate()(Register);

Register.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};
