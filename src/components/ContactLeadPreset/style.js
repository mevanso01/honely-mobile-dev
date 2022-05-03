import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
  },
  headerContainer: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 33,
    textAlign: 'center',
    color: colors.text01,
    marginBottom: 40
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30
  },
  infoContainer: {
    paddingHorizontal: 18
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: colors.text02,
    marginBottom: 21
  },
  
  shadowContainer: {
    shadowColor: colors.text02,
    backgroundColor: colors.text02,
    width: '100%',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 16,
  },
  contactCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 16
  },
  contactCardInnerContainer: {
    backgroundColor: colors.info100,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain'
  },
  infoText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.text01
  },
  infoDescription: {
    fontSize: 14,
    color: colors.text02,
    lineHeight: 21,
    marginBottom: 4
  },
  accordionHeader: {
    paddingVertical: 24,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  accordionHeaderText: {
    fontSize: 23,
    color: colors.text01,
    marginLeft: 20,
    flex: 1
  },
  arrowRight: {
    tintColor: colors.primary,
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
    paddingHorizontal: 18
  },
  textArearWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8
  },
  textAreaLabel: {
    color: colors.text01,
    fontWeight: '500',
    fontSize: 16
  }
})
