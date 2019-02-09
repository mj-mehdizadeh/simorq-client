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
});
