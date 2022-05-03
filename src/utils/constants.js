import { colors } from './styleGuide'

export const leadStatuses = [
  { value: 0, key: 'NEW', content: 'New', color: colors.primary },
  { value: 1, key: 'ATTEMPTED_CONTACT', content: 'Attempted Contact', color: colors.green },
  { value: 2, key: 'FOLLOWED_UP', content: 'Followed Up', color: colors.green },
  { value: 3, key: 'PENDING_SALE', content: 'Pending Sale', color: colors.green },
  { value: 4, key: 'CLOSED_LEADS', content: 'Closed Leads', color: colors.green },
  { value: 5, key: 'REJECTED', content: 'Rejected', color: colors.rejected }
]