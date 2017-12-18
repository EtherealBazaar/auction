import React from 'react'

import Navbar from './Navbar'

import './FAQPage.css'

export default function FAQPage() {
  return (
    <div className="FAQPage">
      <Navbar />

      <div className="content">
        <h1>FAQs</h1>

        <div className="questions">
          <div className="question">
            <h3>Does signing a bid cost any gas or ETH?</h3>
            <div className="dash" />
            <p>
              No, the auction is off-chain. Signing does not cost any gas, ETH,
              or MANA.
            </p>
          </div>
          <div className="question">
            <h3>
              I am outbid on a parcel, can I spend that amount on another bid?
            </h3>
            <div className="dash" />
            <p>
              Yes. As soon as you are outbid, the bid amount will be available
              for other bids.
            </p>
          </div>
          <div className="question">
            <h3>Email notifications?</h3>
            <div className="dash" />
            <p>
              Enable email notifications by entering your email in the
              notifications address window in the sidebar and signing your
              wallet address to your email.
            </p>
          </div>
          <div className="question">
            <h3>I can’t zoom out!</h3>
            <div className="dash" />
            <p>
              Because all parcels contain unique information, the zoom is
              restricted to prevent request timeouts when loading large batches
              of land. This is a carefully-considered tradeoff.
            </p>
          </div>
          <div className="question">
            <h3>How do I move?</h3>
            <div className="dash" />
            <p>
              Click and drag on the map to move around, or click on the minimap
              to move across the city. You can also search for districts and
              coordinates in the search bar.
            </p>
          </div>
          <div className="question">
            <h3>A row or column is showing up twice!</h3>
            <div className="dash" />
            <p>This is a known bug which we are actively working on.</p>
          </div>
          <div className="question">
            <h3>When will the auction end?</h3>
            <div className="dash" />
            <p>
              The auction will run for seven days, or until 10PM GMT on Friday,
              December 22.
            </p>
          </div>
          <div className="question">
            <h3>When will MANA be released after the end of the auction?</h3>
            <div className="dash" />
            <p>
              Any unused MANA will be returned to wallets after the last parcel
              has closed.
            </p>
          </div>
          <div className="question">
            <h3>Plazas? Roads?</h3>
            <div className="dash" />
            <p>
              Decentraland has placed infrastructure around the world to provide
              for better development and exploration experiences. Plazas will be
              accessible to all members of the community for various functions.
            </p>
          </div>
          <div className="question">
            <h3>What happens to MANA spent on land?</h3>
            <div className="dash" />
            <p>MANA spent on land is burned when the auction ends.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
