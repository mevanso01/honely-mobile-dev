import { colors } from './styleGuide'

export const leadStatuses = [
  { value: 0, key: 'NEW', content: 'New', color: colors.primary },
  { value: 1, key: 'ATTEMPTED_CONTACT', content: 'Attempted Contact', color: colors.green },
  { value: 2, key: 'FOLLOWED_UP', content: 'Followed Up', color: colors.green },
  { value: 3, key: 'PENDING_SALE', content: 'Pending Sale', color: colors.green },
  { value: 4, key: 'CLOSED_LEADS', content: 'Closed Leads', color: colors.green },
  { value: 5, key: 'REJECTED', content: 'Rejected', color: colors.rejected }
]

export const URL_PRIVACY_POLICY   = 'https://www.honely.com/privacy.html';
export const URL_TERMS_SERVICE    = 'https://www.honely.com/terms.html';
export const URL_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.honely'
export const URL_APP_STORE = 'https://apps.apple.com/us/app/honely/id1617107784'

export const IOS_VERSION = '1.2'
export const ANDROID_VERSION = '1.2'