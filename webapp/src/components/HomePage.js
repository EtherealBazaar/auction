import React from 'react'
import PropTypes from 'prop-types'

import MenuContainer from '../containers/MenuContainer'
import SearchContainer from '../containers/SearchContainer'
import PendingConfirmationBidsContainer from '../containers/PendingConfirmationBidsContainer'
import ParcelsMapContainer from '../containers/ParcelsMapContainer'
import ModalContainer from '../containers/modals/ModalContainer'
import ShiftNotificationContainer from '../containers/ShiftNotificationContainer'
import MinimapContainer from '../containers/MinimapContainer'

import './HomePage.css'

export default function HomePage({ requiredDataReady }) {
  return (
    <div className="HomePage">
      {requiredDataReady && (
        <div className="controls">
          <MenuContainer />
          <SearchContainer />
          <PendingConfirmationBidsContainer />
          <ShiftNotificationContainer />
        </div>
      )}
      <ParcelsMapContainer requiredDataReady={requiredDataReady} />
      <MinimapContainer />
      <ModalContainer />
    </div>
  )
}

HomePage.propTypes = {
  requiredDataReady: PropTypes.bool
}
