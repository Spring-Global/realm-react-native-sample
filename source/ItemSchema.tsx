import Realm, { BSON } from 'realm';

export class ItemEmbeddedReview extends Realm.Object<ItemEmbedded> {
  value: string;

  static schema: Realm.ObjectSchema = {
    name: 'ItemEmbeddedReview',
    embedded: true,
    properties: {
      value: 'string?',
    },
  };
}

export class ItemEmbedded extends Realm.Object<ItemEmbedded> {
  summary: string;
  review: ItemEmbeddedReview | null;

  static schema: Realm.ObjectSchema = {
    name: 'ItemEmbedded',
    embedded: true,
    properties: {
      summary: 'string?',
      review: 'ItemEmbeddedReview?',
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
