import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useToast } from 'native-base'
import SelectDropdown from 'react-native-select-dropdown'
import { leadStatuses } from '../../utils/constants'
import { colors,  } from '../../utils/styleGuide'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './style'
import { HToast } from '../Shared'
import { useSelector, useDispatch } from 'react-redux'
import { doPatch } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { setUser } from '../../store/action/setUser'

export const StatusSelector = (props) => {
  const {
    defaultLead,
    level
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [statusValue, setStatusValue] = useState(0)

  const [lead, setLead] = useState(defaultLead)
  const [defaultIndex, setDefaultIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getStatusColor = (value) => {
    const found = leadStatuses.find(item => item.value === value)
    return found?.color
  }

  const handleChangeStatus = async (selectedItem) => {
    try {
      setIsLoading(true)
      setStatusValue(selectedItem.value)
      const response = await doPatch(`lookup-test/lead/change-status?lead-id=${lead.lead_id}`, { 'status': selectedItem.key })
      if (response.result !== 'Success') throw response
      setLead({ ...lead, agent_status: selectedItem.key })
      const _updatedLeads = currentUser.leads[level].leads.map(_lead => {
        if (_lead.lead_id === lead.lead_id) {
          _lead.agent_status = selectedItem.key
        }
        return _lead
      })
      const updatedLeads = {
        ...currentUser.leads,
        [level]: {
          total: currentUser.leads[level].total,
          leads: _updatedLeads
        }
      }
      dispatch(setUser({ leads: updatedLeads }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  useEffect(() => {
    const found = leadStatuses.find(option => option.key === lead?.agent_status)
    setDefaultIndex(found?.value?.toString() || '0')
    setStatusValue(found?.value || 0)
  }, [lead?.agent_status])

  return (
    <View style={styles.statusWrapper}>
      <View style={styles.statusDot}>
        <MaterialIcons name='circle' color={getStatusColor(statusValue)} size={8} />
      </View>
      <SelectDropdown
        defaultButtonText='Select an option'
        defaultValueByIndex={defaultIndex}
        data={leadStatuses}
        disabled={isLoading}
        onSelect={handleChangeStatus}
        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.content }}
        rowTextForSelection={(item, index) => { return item.content }}
        buttonStyle={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        buttonTextStyle={{
          color: colors.black,
          fontSize: 14,
          textAlign: 'left'
        }}
        dropdownStyle={{
          borderRadius: 8
        }}
        rowTextStyle={{
          color: colors.text01,
          fontSize: 14,
        }}
      />
    </View>
  )
}
