import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  picketWrap: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 150,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  logo: {
    maxWidth: 280,
    height: 65,
  },
  form: {},
  item: {
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: '#efefef',
  },
  label: {
    fontSize: 13,
    color: '#efefef',
    left: 5,
  },
  usernameLabel: {
    left: 15,
  },
  input: {
    color: '#efefef',
  },
  changeIdentity: {
    top: 15,
    right: 0,
    position: 'absolute',
  },
  icon: {
    color: '#efefef',
  },
  button: {
  },
  btnTxt: {},
  signupWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#efefef',
  },
  blob: {
    position: 'absolute',
    backgroundColor: 'rgba(39, 144, 176, 0.3)',
  },
});
