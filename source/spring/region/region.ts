import Realm, { ObjectSchema } from 'realm';

export class Region extends Realm.Object<Region, '_id' | 'cdRegion' | 'dsRegion' | 'idRegionPath'> {
  _id: Realm.Types.Int;
  cdRegion: Realm.Types.String;
  dsRegion: Realm.Types.String;
  idRegionPath: Realm.Types.String;

  static schema: ObjectSchema = {
    name: 'Region',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      cdRegion: 'string',
      dsRegion: 'string',
      idRegionPath: 'string',
    },
  };
}
