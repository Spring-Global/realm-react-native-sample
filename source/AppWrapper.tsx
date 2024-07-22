import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { AppProvider, UserProvider, RealmProvider } from '@realm/react';
import { appId, baseUrl } from '../atlasConfig.json';

import { App } from './App';
import { WelcomeView } from './WelcomeView';

import { Item } from './ItemSchema';
import { Region } from './spring/region/region';
import { Inventory } from './spring/inventory/inventory';
import { InventoryItem } from './spring/inventory/inventoryItem';
import { InventoryType } from './spring/inventoryType/inventoryType';
import { User } from './spring/user/user';
import Realm from 'realm';

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export const AppWrapper = () => {
  Realm.setLogLevel('all');

  // Set logger to log in cmException as a trace with source "Realm".
  Realm.setLogger((entry) => {
    // console.log(entry);
  });

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <RealmProvider
          schema={[Item, Region, Inventory, InventoryItem, InventoryType, User]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              // Show sync errors in the console
              console.error(error);
            },
          }}
          fallback={LoadingIndicator}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
