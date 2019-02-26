import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    transform: [{scaleY: -1}],
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    position: 'absolute',
    zIndex: 15,
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  headerTitleWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  headerThumb: {
    width: 35,
    height: 24,
  },
  headerTitle: {
    fontSize: 16,
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
