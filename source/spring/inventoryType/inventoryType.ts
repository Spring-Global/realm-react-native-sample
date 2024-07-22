import Realm, { ObjectSchema } from 'realm';

const inventoryTypeCodeToNumber = new Map<string, number>();

export class InventoryType extends Realm.Object<InventoryType, '_id' | 'nmInventoryType'> {
  /**
   * Integration code of the inventory type and unique identifier.
   */
  _id: Realm.Types.String;

  /**
   * Name of the inventory type.
   */
  nmInventoryType: Realm.Types.String;

  /**
   * Description of the inventory type.
   */
  dsInventoryType?: Realm.Types.String | null;

  /**
   * Behaviors for the inventory that has the inventory type.
   */
  behaviors?: Realm.Types.Dictionary<string>;

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

  get idInventoryType() {
    if (!inventoryTypeCodeToNumber.has(this._id)) {
      inventoryTypeCodeToNumber.set(this._id, inventoryTypeCodeToNumber.size + 1);
    }
    return inventoryTypeCodeToNumber.get(this._id)!;
  }

  static schema: ObjectSchema = {
    name: 'InventoryType',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      nmInventoryType: 'string',
      dsInventoryType: 'string?',
      behaviors: {
        type: 'dictionary',
        objectType: 'string',
      },
      Flexi1: 'string?',
      Flexi2: 'string?',
      Flexi3: 'string?',
    },
  };
}
