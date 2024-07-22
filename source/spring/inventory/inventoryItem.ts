import Realm, { ObjectSchema } from 'realm';

export class InventoryItem extends Realm.Object<InventoryItem, 'idProduct' | 'idPrimaryUnit'> {
  /**
   * Internal id of inventory item.
   */
  _id: Realm.Types.ObjectId;

  /**
   * Internal id of the product assigned to the inventory item.
   * Will be replaced by the product reference when product is migrated to mongodb.
   */
  idProduct: Realm.Types.Int;

  /**
   * Internal id of primary inventory unit of the product.
   * Will be replaced by the unit reference when unit is migrated to mongodb.
   */
  idPrimaryUnit: Realm.Types.Int;

  /**
   * Internal id of secondary inventory unit of the product.
   * Will be replaced by the unit reference when unit is migrated to mongodb.
   */
  idSecondaryUnit?: Realm.Types.Int | null;

  /**
   * Primary sellable quantity available for the product in the inventory.
   */
  nrPrimarySellableQty: Realm.Types.Counter;

  /**
   * Primary reserved quantity for the product in the inventory.
   */
  nrPrimaryReservedQty: Realm.Types.Counter;

  /**
   * Primary non-selable quantity available for the product in the inventory.
   */
  nrPrimaryNonSellableQty: Realm.Types.Counter;

  /**
   * Secondary sellable quantity available for the product in the inventory.
   */
  nrSecondarySellableQty: Realm.Types.Counter;

  /**
   * Secondary reserved quantity for the product in the inventory.
   */
  nrSecondaryReservedQty: Realm.Types.Counter;

  /**
   * Secondary non-selable quantity available for the product in the inventory.
   */
  nrSecondaryNonSellableQty: Realm.Types.Counter;

  /**
   * Extension field.
   */
  Flexi1?: Realm.Types.String | null;

  /**
   * Extension field.
   */
  Flexi2?: Realm.Types.String | null;

  /**
   * Extension field.
   */
  Flexi3?: Realm.Types.String | null;

  /**
   * Extension field.
   */
  Flexi4?: Realm.Types.String | null;

  /**
   * Extension field.
   */
  Flexi5?: Realm.Types.String | null;

  /**
   * Object schema.
   */
  static schema: ObjectSchema = {
    name: 'InventoryItem',
    embedded: true,
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      idProduct: 'int',
      idPrimaryUnit: 'int',
      idSecondaryUnit: 'int?',
      nrPrimarySellableQty: 'counter',
      nrPrimaryReservedQty: 'counter',
      nrPrimaryNonSellableQty: 'counter',
      nrSecondarySellableQty: 'counter',
      nrSecondaryReservedQty: 'counter',
      nrSecondaryNonSellableQty: 'counter',
      Flexi1: 'string?',
      Flexi2: 'string?',
      Flexi3: 'string?',
      Flexi4: 'string?',
      Flexi5: 'string?',
    },
  };
}
