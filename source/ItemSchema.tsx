import Realm, { BSON } from 'realm';

export class ItemEmbedded extends Realm.Object<ItemEmbedded> {
  private _summary: string;

  get summary() {
    return `Get - ${this._summary}`;
  }

  set summary(value: string) {
    this._summary = `Setter - ${value}`;
  }

  static schema: Realm.ObjectSchema = {
    name: 'ItemEmbedded',
    embedded: true,
    properties: {
      _summary: {
        type: 'string',
        mapTo: 'summary',
        optional: true,
      },
    },
  };
}

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  isComplete!: boolean;
  summary!: string;
  owner_id!: string;
  itemEmbeddedList: Realm.List<ItemEmbedded>;

  static schema: Realm.ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      // All todo items will default to incomplete
      isComplete: { type: 'bool', default: false },
      summary: 'string',
      owner_id: 'string',
      itemEmbeddedList: {
        type: 'list',
        objectType: 'ItemEmbedded',
        default: () => {
          return [];
        },
      },
    },
  };
}
