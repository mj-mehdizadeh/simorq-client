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
  loadingWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(66,66,66, 0.4)',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 4,
  },
})
;
