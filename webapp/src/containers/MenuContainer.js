import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { selectors } from '../reducers'
import { fetchOngoingAuctions, openMenu, closeMenu } from '../actions'
import { stateData } from '../lib/propTypes'

import ShowMenu from '../components/ShowMenu'
import Menu from '../components/Menu'

class MenuContainer extends React.Component {
  static propTypes = {
    addressState: stateData(PropTypes.object).isRequired,
    ongoingAuctions: stateData(PropTypes.array),
    fetchOngoingAuctions: PropTypes.func,
    menu: PropTypes.shape({
      open: PropTypes.boolean
    }),
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired
  }

  changeMenuVisibility(menuVisible) {
    if (menuVisible) {
      this.props.openMenu()

      // Wait a bit for the Menu animation to end
      setTimeout(() => this.props.fetchOngoingAuctions(), 500)
    } else {
      this.props.closeMenu()
    }
  }

  render() {
    const { parcelStates, addressState, ongoingAuctions, menu } = this.props
    const isLoading = parcelStates.loading || addressState.loading

    return [
      <ShowMenu
        key="1"
        isLoading={isLoading}
        onShow={() => this.changeMenuVisibility(true)}
      />,
      <Menu
        key="2"
        addressState={addressState}
        visible={menu.open}
        ongoingAuctions={ongoingAuctions}
        onHide={() => this.changeMenuVisibility(false)}
      />
    ]
  }
}

export default connect(
  state => ({
    parcelStates: selectors.getParcelStates(state),
    addressState: selectors.getAddressState(state),
    ongoingAuctions: selectors.getOngoingAuctions(state),
    menu: selectors.getMenu(state)
  }),
  { fetchOngoingAuctions, openMenu, closeMenu }
)(MenuContainer)
