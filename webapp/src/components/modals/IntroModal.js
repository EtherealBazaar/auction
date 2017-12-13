import React from 'react'

import Modal from './Modal'
import Icon from '../Icon'
import Button from '../Button'

import './IntroModal.css'

export default class IntroModal extends React.Component {
  static propTypes = {
    ...Modal.propTypes
  }

  render() {
    const { onClose, ...props } = this.props

    return (
      <Modal className="IntroModal modal-lg" onClose={onClose} {...props}>
        <div className="banner">
          <h2><Icon name="decentraland" /> Welcome to the Terraform Auction Beta</h2>
        </div>

        <div className="modal-body">
          <h3 className="text">
            The Decentraland community will begin shaping a new world on
            December 15th.
          </h3>
          <div className="text">
            <h4>Parcels</h4>
            <p>
              90,000 parcels of land are initially available in Decentraland’s
              Genesis City. About 1/3rd of these have been allocated to
              community districts placed throughout the city, while the
              remainder will be auctioned through this web app.
            </p>
          </div>

          <div className="text">
            <h4>Minimum Bids</h4>
            <p>
              Each parcel of land has a minimum bid amount 25% higher than the
              previous bid.
            </p>
          </div>

          <div className="text">
            <h4>Timeline</h4>
            <p>
              The auction will last seven days, starting at 10PM GMT on December
              15th.
            </p>
            <p>
              To prevent last-minute takeovers, the bidding window will be
              extended for parcels with bids made within the final 30 hours.
              This extension is equal to n, where n = 30 - hours_remaining.
            </p>
            <p>
              Once all active bids have finished, unused MANA will be returned
              to users’ wallets.
            </p>
            <p>
              For testing purposes, please report bugs and errors you encounter
              in the <a href="https://chat.decentraland.org/channels/test/auction" target="_blank" rel="noopener noreferrer">#test_auction</a> channel in RocketChat.
            </p>
          </div>

          <div className="land-color-keys">
            <h3>Land Color Key</h3>

            <div className="left">
              <div className="lands">
                <div className="land">
                  <div className="key">
                    <div className="key active little-value" />
                    <div className="key active big-value" />
                  </div>
                  <div className="text">ACTIVE</div>
                </div>
                <div className="land">
                  <div className="key won" />
                  <div className="text">WON</div>
                </div>
                <div className="land">
                  <div className="key lost" />
                  <div className="text">LOST</div>
                </div>
              </div>

              <div className="lands">
                <div className="land">
                  <div className="key outbid" />
                  <div className="text">OUTBID</div>
                </div>
                <div className="land">
                  <div className="key winning" />
                  <div className="text">WINNING</div>
                </div>
                <div className="land">
                  <div className="key pending" />
                  <div className="text">PENDING</div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="lands">
                <div className="land">
                  <div className="key reserved" />
                  <div className="text">RESERVED</div>
                </div>
                <div className="land">
                  <div className="key taken" />
                  <div className="text">TAKEN</div>
                </div>
              </div>

              <div className="lands">
                <div className="land">
                  <div className="key default" />
                  <div className="text">EMPTY</div>
                </div>
                <div className="land">
                  <div className="key loading" />
                  <div className="text">LOADING</div>
                </div>
              </div>
            </div>
          </div>

          <div className="get-started">
            <Button type="primary" onClick={onClose}>
              Get Started
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
}
