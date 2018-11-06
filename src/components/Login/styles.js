import {StyleSheet} from 'react-native';
import variable from './../../theme/variables/material';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  help: {
    fontSize: 13,
    padding: 20,
    color: '#838c96',
  },
  label: {
    fontSize: 12,
    color: '#a6afba',
  },
  phoneNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#838c96',
  },
  countryCode: {
    textAlign: 'center',
    marginTop: 26,
    height: 39,
  },
  fabStyle: {
    backgroundColor: variable.brandPrimary,
  },
  countryList: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 121,
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 10000,
  },
  item: {
    padding: 15,
  },
  registerForm: {
    paddingTop: 25,
    paddingRight: 25,
  },
  footerWrap: {
    paddingLeft: 15,
  },
  thumbWrap: {
    paddingTop: 15,
    paddingLeft: 15,
  },
});
