import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const ListProducts = ({ items }) => {
  return (
    <>
      <View style={style.listItems}>
        <ScrollView>
          {items.lenght !== 0 && items.map(item => (
            <ListItem
              key={String(item.id)}
              title={item.name}
              subtitle={
                <View style={style.description}>
                  <Text style={style.textCategory}>{item.category.name}</Text>
                  <Text style={style.textPrice}>R$ {(item.price).toFixed(2).replace(".", ",")}</Text>
                </View>
              }
              bottomDivider
            />
          ))
          }
        </ScrollView>
      </View>
    </>
  )
};

const style = StyleSheet.create({
  listItems: {
    height: "80%"
  },

  item: {
    flexDirection: "row",
    height: "12%",
    backgroundColor: "#c1c1c1",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
  },

  description: {
    flex: 1,
    flexDirection: "column",
    width: "55%",
  },

  textDescription: {
    fontSize: 18,
    color: "#FFF",
  },

  textCategory: {
    fontSize: 14,
    color: "#c1c1c1",
  },

  textPrice: {
    end: "-85%",
    marginTop: -25,
    fontSize: 18,
    color: "red",
    alignSelf: "flex-end"
  },

});

export default ListProducts;