import React, { useCallback, useState, useEffect } from 'react';
import { useUser, useRealm, useQuery } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import { Button, Overlay } from '@rneui/base';
import { dataExplorerLink } from '../atlasConfig.json';

import { CreateToDoPrompt } from './CreateToDoPrompt';

import { Item } from './ItemSchema';
import { colors } from './Colors';
import { ItemListViewItem } from './ItemListViewItem';
import { SampleContext } from './SampleContext';

// If you're getting this app code by cloning the repository at
// https://github.com/mongodb/ template-app-react-native-todo,
// it does not contain the data explorer link. Download the
// app template from the Atlas UI to view a link to your data
const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

const itemSubscriptionName = 'items';
const ownItemsSubscriptionName = 'ownItems';

let renderTimes = 0;

export function ItemListView() {
  const realm = useRealm();
  const items = useQuery(Item).sorted('_id');
  const user = useUser();

  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);

  // This state will be used to toggle between showing all items and only showing the current user's items
  // This is initialized based on which subscription is already active
  const [showAllItems, setShowAllItems] = useState(
    !!realm.subscriptions.findByName(itemSubscriptionName),
  );

  // This effect will initialize the subscription to the items collection
  // By default it will filter out all items that do not belong to the current user
  // If the user toggles the switch to show all items, the subscription will be updated to show all items
  // The old subscription will be removed and the new subscription will be added
  // This allows for tracking the state of the toggle switch by the name of the subscription
  useEffect(() => {
    if (showAllItems) {
      realm.subscriptions.update((mutableSubs) => {
        mutableSubs.removeByName(ownItemsSubscriptionName);
        mutableSubs.add(realm.objects(Item), { name: itemSubscriptionName });
      });
    } else {
      realm.subscriptions.update((mutableSubs) => {
        mutableSubs.removeByName(itemSubscriptionName);
        mutableSubs.add(realm.objects(Item).filtered(`owner_id == "${user?.id}"`), {
          name: ownItemsSubscriptionName,
        });
      });
    }
  }, [realm, user, showAllItems]);

  // createItem() takes in a summary and then creates an Item object with that summary
  const createItem = useCallback(
    ({ summary }: { summary: string }) => {
      // if the realm exists, create an Item
      realm.write(() => {
        console.log(dataExplorerMessage);

        const item = new Item(realm, {
          summary,
          owner_id: user?.id,
        });

        item.itemEmbeddedList.push({
          summary: 'Embedded Item',
        });
        item.itemEmbeddedList.push({
          summary: 'To Be Replace',
        });

        return item;
      });
    },
    [realm, user],
  );

  return (
    <SafeAreaProvider>
      <SampleContext.Provider value={{ renderTimes: renderTimes++ }}>
        <View style={styles.viewWrapper}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Show All Tasks</Text>
            <Switch
              trackColor={{ true: '#00ED64' }}
              onValueChange={() => {
                if (realm.syncSession?.state !== 'active') {
                  Alert.alert(
                    'Switching subscriptions does not affect Realm data when the sync is offline.',
                  );
                }
                setShowAllItems(!showAllItems);
              }}
              value={showAllItems}
            />
          </View>
          <Overlay
            isVisible={showNewItemOverlay}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setShowNewItemOverlay(false)}>
            <CreateToDoPrompt
              onSubmit={({ summary }) => {
                setShowNewItemOverlay(false);
                createItem({ summary });
              }}
            />
          </Overlay>
          <FlatList
            keyExtractor={(item) => item._id.toString()}
            data={items}
            renderItem={({ item }) => <ItemListViewItem item={item} />}
          />
          <Button
            title="Add To-Do"
            buttonStyle={styles.addToDoButton}
            onPress={() => setShowNewItemOverlay(true)}
          />
        </View>
      </SampleContext.Provider>
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
