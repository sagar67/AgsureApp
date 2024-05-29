import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconSelector, {ICON_TYPE} from './IconSelect';
import {Spinner} from './Spinner';

const black = 'black';
const primaryColor = '#f9f9f9';
const white = 'white';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredList(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching products:', error));
    setLoading(false);
  }, []);

  const searchList = text => {
    if (text == '') setFilteredList(products);
    else {
      const arr = products.filter(item => {
        const name = item?.title;
        if (
          name
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(text.replace(/\s/g, '').toLowerCase())
        )
          return true;
        return false;
      });
      setFilteredList(arr);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner loading={loading} />
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <IconSelector
            name="search1"
            size={20}
            color="black"
            type={ICON_TYPE.AntDesign}
          />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor="#868686"
            placeholder="Search"
            onChangeText={text => searchList(text)}
          />
        </View>
      </View>
      <Text style={styles.title}>{`Order online 
collect in store`}</Text>
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productSeries}>{item.category}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '70%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color:black
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 24,
    marginHorizontal: 20,
    color: black,
  },
  // searchInput: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   padding: 10,
  //   borderRadius: 20,
  //   color: black,
  //   marginHorizontal: 20,
  // },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: black,
  },
  productCard: {
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: black,
  },
  productSeries: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 10,
    color: black,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E2CED',
  },
});

export default Product;
