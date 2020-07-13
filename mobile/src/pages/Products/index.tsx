import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import api from '../../services/api';
import { logout } from '../../services/auth';

import ListProducts from '../../components/ListProducs';
import Filter from '../../components/Filter';

interface IProducts {
  id: Number,
  name: String,
  price: Number,
  category: {
    name: String
  }
}

interface ICategories {
  id: Number,
  name: String
}

const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [category, setCategory] = useState(0);
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
    if (categories.length === 0) {
      loadCategories();
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [category]);

  function loadProducts() {
    setLoad(true);
    if (category !== 0) {
      api.get(`categories/${category}/products`)
        .then(response => {
          setLoad(false);
          setProducts(response.data);
        })
        .catch(error => {
          setLoad(false);
          setProducts([]);
        });
    } else {
      setLoad(false);
      setProducts([]);
    }
  }

  function loadCategories() {
    api.get('/categories')
      .then(response => {
        const categoriesData = response.data.map((cat: ICategories) => {
          return { label: cat.name, value: cat.id };
        })
        setCategories(categoriesData);
      })
      .catch(error => {
        setCategories([]);
      });
  }

  async function handleNavigateToLogin() {
    logout();
    navigation.goBack();
  }

  return (
    <>
      <View style={style.content}>
        <Text style={style.textTitle}>Produtos</Text>
        <View style={style.menu}>
          <View style={style.back}>
            <TouchableOpacity onPress={handleNavigateToLogin}>
              <Icon style={style.textIcon} name="arrow-left" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <Filter
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        {
          load && (
            <View style={style.loading}>
              <ActivityIndicator
                size="large"
              />
            </View>
          )
        }

        {
          !load && category === 0 && (
            <Text style={{ alignSelf: "center" }}>Selecione uma categoria.</Text>
          )
        }

        {
          products.length === 0 && !load && category !== 0 && (
            <Text style={{ alignSelf: "center" }}>Nenhum produto encontrado.</Text>
          )
        }

        {
          !load && products && (
            <ListProducts
              items={products}
            />
          )
        }
      </View>
    </>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    height: 100,
    padding: 15,
  },

  /** Loading */
  loading: {
    marginTop: 150,
    padding: 15,
    alignSelf: "center",
  },

  loadingText: {
    fontSize: 16,
  },

  textTitle: {
    fontSize: 18,
    textAlign: "center"
  },
  textIcon: {
    width: 25,
  },
  menu: {
    height: 10,
    flexDirection: "column"
  },

  back: {
  },

  filter: {
    marginTop: -22,
    flexDirection: "column",
    alignSelf: "flex-end"
  },
});

export default Products;