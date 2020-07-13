import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';


const Filter = ({ categories, category, setCategory }) => {

  return (
    <>
      <View style={style.content}>
        {categories && (
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            value={category}
            style={style.filterInput}
            placeholder={{ label: 'Selecione uma Categoria', value: 0 }}
            items={categories}
          />
        )}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  content: {
    margin: 20,
  },

  textTitleModal: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 25
  },

  filterInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },

  headerModal: {
    paddingBottom: 10,
    marginLeft: 300,
  },

  btnFilter: {
    width: "100%",
    backgroundColor: "#c1c1c1",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }

});

export default Filter;