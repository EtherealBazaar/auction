import { Model } from 'decentraland-commons'
import BidGroup from './BidGroup'

class AddressState extends Model {
  static tableName = 'address_states'
  static columnNames = ['address', 'balance', 'latestBidGroupId', 'email']

  static async findByAddress(address) {
    return this.findOne({ address })
  }

  static async findByEmail(email) {
    return this.findOne({ email })
  }

  static async findByAddressWithLastBidGroup(address) {
    const rows = await this.db.query(
      `SELECT "address_states".*, row_to_json(bid_groups.*) as "bidGroup" FROM address_states
        LEFT JOIN bid_groups ON address_states."latestBidGroupId" = bid_groups."id"
        WHERE address_states."address" = $1
        LIMIT 1`,
      [address]
    )

    if (rows.length > 0) {
      const { bidGroup, ...addressState } = rows[0]

      if (bidGroup) {
        // We need to deserialize the stringified version of each BYTEA row generated by `row_to_json`
        addressState.bidGroup = BidGroup.deserialize(bidGroup, 'bytea')
      }
      delete addressState.email

      return addressState
    }
  }

  static async findByAddressWithBidGroups(address) {
    const rows = await this.db.query(
      `SELECT "address_states".*, row_to_json(bid_groups.*) as "bidGroup" FROM address_states
        LEFT JOIN bid_groups ON bid_groups."address" = $1
        WHERE address_states."address" = $1`,
      [address]
    )

    if (rows.length > 0) {
      const addressState = rows[0]

      addressState.bidGroups = BidGroup.deserializeJoinedRows(rows)
      delete addressState.bidGroup
      delete addressState.email

      return addressState
    }
  }

  static summary() {
    return this.db
      .query(
        `SELECT COUNT(*), MAX(balance::int), SUM(balance::int) FROM ${AddressState.tableName}`
      )
      .then(r => r[0])
  }

  static countWithEmail() {
    return this.db
      .query(
        `SELECT COUNT(*) FROM ${AddressState.tableName} WHERE email IS NOT NULL`
      )
      .then(r => r[0].count)
  }
}

export default AddressState
