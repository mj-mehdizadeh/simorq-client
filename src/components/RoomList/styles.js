import {StyleSheet} from 'react-native';
import variable from './../../theme/variables/material';

export default StyleSheet.create({
  content: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
  },
  itemDivider: {
    marginTop: -1,
    marginBottom: 7,
    marginLeft: -1,
    marginRight: -1,
    shadowColor: '#dadada',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
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
    fontSize: 17,
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
    maxWidth: 35,
    fontSize: 12,
    color: '#838c96',
  },
  note: {
    fontSize: 14,
    color: '#838c96',
    flex: 1,
    paddingRight: 5,
  },
  noteWrap: {
    flexDirection: 'row',
  },
});
