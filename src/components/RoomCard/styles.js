import {StyleSheet} from 'react-native';
import variable from './../../theme/variables/material';

export default StyleSheet.create({
  item: {
    backgroundColor: '#fff',
  },
  itemDivider: {
    marginTop: -1,
    marginBottom: 7,
    marginLeft: -1,
    marginRight: -1,
    elevation: 1,
    backgroundColor: '#fff',
  },
  body: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
  },
  titleWrap: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
  },
  roomTitle: {
    flex: 1,
    fontSize: 13,
    textAlign: 'left',
  },
  iconSeen: {
    maxWidth: 20,
    fontSize: 13,
    marginLeft: 2,
    marginRight: 2,
    color: variable.brandPrimary,
  },
  iconDeliver: {
    maxWidth: 20,
    fontSize: 13,
    marginLeft: 2,
    marginRight: 2,
    color: '#838c96',
  },
  time: {
    maxWidth: 45,
    fontSize: 10,
    color: '#838c96',
  },
  note: {
    fontSize: 14,
    color: '#838c96',
    flex: 1,
    paddingRight: 5,
    textAlign: 'left',
  },
  noteWrap: {
    flexDirection: 'row',
  },
});
