import Realm, { ObjectSchema } from 'realm';
import { Region } from '../region/region';

export class User extends Realm.Object<User, '_id' | 'cdUser' | 'login' | 'region'> {
  _id: Realm.Types.Int;
  cdUser: Realm.Types.String;
  login: Realm.Types.String;
  nmDisplay: Realm.Types.String;
  vlTimezoneInMinute?: Realm.Types.Int | null;
  email?: Realm.Types.String | null;
  region?: Region | null;
  attributes: Realm.Types.Dictionary<string>;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      cdUser: 'string',
      login: 'string',
      nmDisplay: 'string?',
      vlTimezoneInMinute: 'int?',
      email: 'string?',
      region: {
        type: 'object',
        objectType: 'Region',
        optional: true,
      },
      attributes: {
        type: 'dictionary',
        objectType: 'string',
      },
    },
  };
}
