import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33,
    color: colors.text01
  },
  subTitle: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    color: colors.text02,
    marginBottom: 32
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.primaryContrast,
  },
  photoWrapper: {
    width: 153,
    height: 153,
    borderRadius: 80,
    backgroundColor: colors.text05
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 80
  },
  userName: {
    marginTop: 32
  },
  nameDetail: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 14,
    color: colors.text02, 
    lineHeight: 21,
  }
})
