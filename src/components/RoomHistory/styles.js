import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitleWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  headerThumb: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    paddingLeft: 0,
  },
  headerSubTitle: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 7,
    paddingRight: 7,
  },
  footerBtn: {},
  footerIcon: {
    color: '#7d858f',
    marginLeft: 7,
    marginRight: 7,
    fontWeight: 'bold',
  },
});
