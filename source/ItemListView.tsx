import React, { useEffect } from 'react';
import { useRealm, useQuery } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from './Colors';
import { Region } from './spring/region/region';
import { Inventory } from './spring/inventory/inventory';
import { Switch } from '@rneui/themed';
import { User } from './spring/user/user';

const userHierarchy = '/1/2/83/63/24/';

export function ItemListView() {
  const [myRegionOnly, setMyRegionOnly] = React.useState(true);
  const realm = useRealm();
  const regions = useQuery(Region).sorted('_id');
  const users = useQuery(User);
  const inventories = useQuery(Inventory).sorted('_id');

  // This effect will initialize the subscription to the items collection
  // By default it will filter out all items that do not belong to the current user
  // If the user toggles the switch to show all items, the subscription will be updated to show all items
  // The old subscription will be removed and the new subscription will be added
  // This allows for tracking the state of the toggle switch by the name of the subscription
  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll();
      if (myRegionOnly) {
        const regionsQueryable = regions.slice();
        mutableSubs.add(
          realm.objects(Region).filtered('idRegionPath BEGINSWITH $0', userHierarchy),
          {
            name: 'region',
          },
        );
        mutableSubs.add(realm.objects(Inventory).filtered('region IN $0', regionsQueryable), {
          name: 'inventories',
        });
        mutableSubs.add(realm.objects(User).filtered('region IN $0', regionsQueryable), {
          name: 'users',
        });
      } else {
        mutableSubs.add(realm.objects(Region), { name: 'regions_full' });
        mutableSubs.add(realm.objects(Inventory), { name: 'inventories_full' });
        mutableSubs.add(realm.objects(User), { name: 'users_full' });
      }
    });
  }, [realm, regions, myRegionOnly]);

  return (
    <SafeAreaProvider>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>My Region Only</Text>
        <Switch
          trackColor={{ true: '#00ED64' }}
          onValueChange={() => {
            setMyRegionOnly((previous) => !previous);
          }}
          value={myRegionOnly}
        />
      </View>
      <View style={styles.viewWrapper}>
        <Text>Regions: {regions.length}</Text>
        <Text>Inventories: {inventories.length}</Text>
        <Text>Users: {users.length}</Text>
        {/* <FlatList
          keyExtractor={(item) => item._id.toString()}
          data={regions}
          renderItem={({ item }) => (
            <ListItem key={`${item._id}`} bottomDivider topDivider>
              <ListItem.Title style={styles.itemTitle}>{item.cdRegion}</ListItem.Title>
              <ListItem.Subtitle style={styles.itemSubtitle}>
                <Text>{item.dsRegion}</Text>
              </ListItem.Subtitle>
            </ListItem>
          )}
        /> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  addToDoButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    margin: 5,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    margin: 5,
  },
  showCompletedButton: {
    borderRadius: 4,
    margin: 5,
  },
  showCompletedIcon: {
    marginRight: 5,
  },
  itemTitle: {
    flex: 1,
  },
  itemSubtitle: {
    color: '#979797',
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  toggleText: {
    flex: 1,
    fontSize: 16,
  },
  overlay: {
    backgroundColor: 'white',
  },
});
