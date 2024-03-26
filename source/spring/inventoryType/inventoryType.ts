import Realm, { ObjectSchema } from 'realm';

export class InventoryType extends Realm.Object<
  InventoryType,
  '_id' | 'cdInventoryType' | 'nmInventoryType'
> {
  /**
   * Internal id of the inventory type.
   */
  _id: Realm.Types.ObjectId;

  /**
   * Integration code of the inventory type.
   */
  cdInventoryType: Realm.Types.String;

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

  static schema: ObjectSchema = {
    name: 'InventoryType',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      cdInventoryType: 'string',
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
