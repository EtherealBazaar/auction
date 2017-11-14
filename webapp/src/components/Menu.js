import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { distanceInWordsToNow } from "../lib/dateUtils";
import { buildCoordinate } from "../lib/util";
import shortenAddress from "../lib/shortenAddress";
import { stateData } from "../lib/propTypes";

import locations from "../locations";

import Loading from "./Loading";
import Icon from "./Icon";

import "./Menu.css";

export default class Menu extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    addressState: stateData(PropTypes.object).isRequired,
    ongoingAuctions: stateData(PropTypes.array).isRequired,
    onHide: PropTypes.func.isRequired
  };

  static defaultProps = {
    visible: false
  };

  getClassName() {
    const visibleClass = this.props.visible ? "in" : "";
    return `Menu ${visibleClass}`;
  }

  render() {
    const { addressState, onHide, ongoingAuctions } = this.props;

    return (
      <div className={this.getClassName()}>
        <header>
          <Icon name="decentraland" />
          <h1 className="menu-title">Decentraland</h1>

          <div onClick={onHide}>
            <Icon name="laquo" />
          </div>
        </header>

        <div className="your-balance">
          <h2>Your Balance</h2>
          {addressState.loading ? (
            <Loading />
          ) : (
            <div className="mana-value">{addressState.data.balance} MANA</div>
          )}
        </div>

        <div className="ongoing-auctions">
          <h3>Ongoing auctions</h3>
          {ongoingAuctions.loading ? (
            <Loading />
          ) : (
            <AuctionTable auctions={ongoingAuctions.data} onHide={onHide} />
          )}
        </div>
      </div>
    );
  }
}

function AuctionTable({ auctions, onHide }) {
  if (auctions.length) {
    return (
      <div className="table">
        <div className="table-row table-header">
          <div className="col-land">Land</div>
          <div className="col-status">Status</div>
          <div className="col-amount">Amount</div>
          <div className="col-time-left">Time left</div>
          <div className="col-address" />
        </div>

        {auctions.map((auction, index) => (
          <AuctionTableRow
            key={index}
            auction={auction}
            onLandClick={onHide}
            className={index % 2 === 0 ? "gray" : ""}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="table-row-empty">
        You have no ongoing auctions yet.
        <br />
        You can click on any parcel you like to bid on it!
      </div>
    );
  }
}

function AuctionTableRow({ auction, className, onLandClick }) {
  const land = buildCoordinate(auction.x, auction.y);
  const statusClass = auction.status.toLowerCase();
  const timeLeft = distanceInWordsToNow(auction.endsAt);

  return (
    <div className={`table-row ${className}`}>
      <div className="col-land">
        <Link
          to={locations.parcelDetail(auction.x, auction.y)}
          onClick={onLandClick}
        >
          {land}
        </Link>
      </div>
      <div className={`col-status ${statusClass}`}>{auction.status}</div>
      <div className="col-amount">{auction.amount} MANA</div>
      <div className="col-time-left">{timeLeft}</div>
      <div className="col-address">{shortenAddress(auction.address)}</div>
    </div>
  );
}

AuctionTableRow.propTypes = {
  auction: PropTypes.object,
  className: PropTypes.string
};

AuctionTableRow.defaultProps = {
  className: ""
};