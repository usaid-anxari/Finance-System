import React from 'react'
import { getInitials } from '../../utils/helper'

const ChartAvatar = ({fullName,width,hegiht,style}) => {
  return (
    <div className={`${width || 'w-12' } ${hegiht || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInitials(fullName || "")}
    </div>
  )
}

export default ChartAvatar