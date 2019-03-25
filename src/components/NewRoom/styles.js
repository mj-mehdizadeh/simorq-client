import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    zIndex: 10,
  },
  header: {
    borderBottomColor: variable.listBorderColor,
    borderBottomWidth: variable.borderWidth,
  },
  arrowIcon: {
    color: '#eee',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  avatarPicker: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: variable.brandPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: -10,
  },
  avatarPickerIcon: {
    color: '#fff',
    fontSize: 20,
  },
  titleInput: {},
  infoInput: {
    flex: 1,
  },
  item: {
    marginLeft: 35,
  },
  icon: {
    marginLeft: -35,
    color: '#767687',
  },
  pubWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  pubText: {
    marginLeft: 15,
  },
  pubItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  usernameInput: {
    paddingLeft: 105,
  },
  usernameHolder: {
    fontSize: 14,
    color: variable.brandPrimary,
    position: 'absolute',
    left: 0,
    top: 14,
  },
});
