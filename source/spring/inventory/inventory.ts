import Realm, { ObjectSchema } from 'realm';
import { Region } from '../region/region';
import { InventoryItem } from './inventoryItem';
import { InventoryType } from '../inventoryType/inventoryType';

export class Inventory extends Realm.Object<
  Inventory,
  '_id' | 'cdInventory' | 'nmInventory' | 'region' | 'flTracked'
> {
  /**
   * Internal id of inventory.
   */
  _id: Realm.Types.ObjectId;

  /**
   * Optional internal id of inventory in mSeries.
   * Just for reference, if necessary. Probably, inventory will be created by integration.
   */
  idInventory?: Realm.Types.Int | null;

  /**
   * Integration code of inventory.
   */
  cdInventory: Realm.Types.String;

  /**
   * Inventory name.
   */
  nmInventory: Realm.Types.String;

  /**
   * Indicates if the inventory is tracked for changes.
   */
  flTracked: Realm.Types.Bool;

  /**
   * Inventory region.
   */
  region: Region;

  /**
   * Inventory items.
   */
  items: Realm.Types.List<InventoryItem>;

  /**
   * Inventory type.
   */
  inventoryType?: InventoryType | null;

  /**
   * Extension field.
   */
  Flexi1?: Realm.Types.String | null;

  /**
   * Extension field.
   */
  Flexi2?: Realm.Types.String | null;

  static schema: ObjectSchema = {
    name: 'Inventory',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      idInventory: 'int?',
      cdInventory: 'string',
      nmInventory: 'string',
      flTracked: { type: 'bool', default: true },
      region: {
        type: 'object',
        objectType: 'Region',
        optional: true,
      },
      items: {
        type: 'list',
        objectType: 'InventoryItem',
        default: [],
      },
      inventoryType: {
        type: 'object',
        objectType: 'InventoryType',
        optional: true,
      },
      Flexi1: 'string?',
      Flexi2: 'string?',
    },
  };
}
