import { Model } from "decentraland-commons";
import BidGroup from "./BidGroup";

class AddressState extends Model {
  static tableName = "address_states";
  static columnNames = ["address", "balance", "latestBidGroupId"];

  static async findByAddress(address) {
    const rows = await this.db.query(
      `SELECT "address_states".*, row_to_json(bid_groups.*) as "bidGroup" FROM address_states
        LEFT JOIN bid_groups ON address_states."latestBidGroupId" = bid_groups."id"
        WHERE address_states."address" = $1
        LIMIT 1`,
      [address]
    );

    if (rows.length > 0) {
      const { bidGroup, ...addressState } = rows[0];

      if (bidGroup) {
        // We need to deserialize the stringified version of each BYTEA row generated by `row_to_json`
        addressState.bidGroup = BidGroup.deserialize(bidGroup, "bytea");
      }

      return addressState;
    }
  }

  static async findByAddressWithBids(address) {
    const rows = await this.db.query(
      `SELECT "address_states".*, row_to_json(bid_groups.*) as "bidGroup" FROM address_states
        LEFT JOIN bid_groups ON bid_groups."address" = $1
        WHERE address_states."address" = $1`,
      [address]
    );

    if (rows.length > 0) {
      const addressState = rows[0];

      addressState.bidGroups = BidGroup.deserializeJoinedRows(rows);
      delete addressState.bidGroup;

      return addressState;
    }
  }
}

export default AddressState;