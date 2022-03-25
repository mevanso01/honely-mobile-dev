import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 18,
    paddingVertical: 30
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33
  },
  description: {
    fontSize: 14,
    color: colors.text02,
    lineHeight: 21,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center'
  },
  imageWrapper: {
    padding: 15,
    width: deviceWidth * 0.7,
    marginBottom: 17
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  bottomContainer: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40
  }
})
