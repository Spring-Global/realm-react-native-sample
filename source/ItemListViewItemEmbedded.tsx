import React, { useCallback } from 'react';
import { BSON } from 'realm';
import { useUser, useRealm } from '@realm/react';
import { Alert, StyleSheet } from 'react-native';
import { Button, ListItem } from '@rneui/base';
import { dataExplorerLink } from '../atlasConfig.json';

import { Item } from './ItemSchema';
import { colors } from './Colors';
import { Text } from '@rneui/themed';
import { SampleContext } from './SampleContext';

// If you're getting this app code by cloning the repository at
// https://github.com/mongodb/ template-app-react-native-todo,
// it does not contain the data explorer link. Download the
// app template from the Atlas UI to view a link to your data
const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

export function ItemListViewItemEmbedded({ item }: { item: Item }) {
  const sampleContext = React.useContext(SampleContext);
  const realm = useRealm();
  const user = useUser();

  // deleteItem() deletes an Item with a particular _id
  const deleteItem = useCallback(
    (id: BSON.ObjectId) => {
      // if the realm exists, get the Item with a particular _id and delete it
      const item = realm.objectForPrimaryKey(Item, id); // search for a realm object with a primary key that is an objectId
      if (item) {
        if (item.owner_id !== user?.id) {
          Alert.alert("You can't delete someone else's task!");
        } else {
          realm.write(() => {
            realm.delete(item);
          });
          console.log(dataExplorerMessage);
        }
      }
    },
    [realm, user],
  );
  // toggleItemIsComplete() updates an Item with a particular _id to be 'completed'
  const toggleItemIsComplete = useCallback(
    (id: BSON.ObjectId) => {
      // if the realm exists, get the Item with a particular _id and update it's 'isCompleted' field
      const item = realm.objectForPrimaryKey(Item, id); // search for a realm object with a primary key that is an objectId
      if (item) {
        if (item.owner_id !== user?.id) {
          Alert.alert("You can't modify someone else's task!");
        } else {
          realm.write(() => {
            item.isComplete = !item.isComplete;
          });
          console.log(dataExplorerMessage);
        }
      }
    },
    [realm, user],
  );

  console.log('renderTimes', sampleContext.renderTimes);

  return (
    <ListItem key={`${item._id}`} bottomDivider topDivider>
      <ListItem.Title style={styles.itemTitle}>{item.summary}</ListItem.Title>
      <ListItem.Title style={styles.itemTitle}>
        {item.itemEmbeddedList.map((i) => i.summary).join('\r\n')}
      </ListItem.Title>
      <ListItem.Subtitle style={styles.itemSubtitle}>
        <Text>{item.owner_id === user?.id ? '(mine)' : ''}</Text>
      </ListItem.Subtitle>
      <ListItem.Content>
        {!item.isComplete && (
          <Button title="Mark done" type="clear" onPress={() => toggleItemIsComplete(item._id)} />
        )}
        <Button title="Delete" type="clear" onPress={() => deleteItem(item._id)} />
      </ListItem.Content>
    </ListItem>
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
