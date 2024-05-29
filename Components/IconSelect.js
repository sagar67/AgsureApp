import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export const ICON_TYPE = {
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Octicons: 'Octicons',
};

export default function IconSelector({
  type = ICON_TYPE.AntDesign,
  name,
  size = 20,
  color = 'black',
  onPress,
}) {
  const renderIcon = () => {
    switch (type) {
      case ICON_TYPE.AntDesign:
        return <AntDesign name={name} size={size} color={color} />;
      case ICON_TYPE.Entypo:
        return <Entypo name={name} size={size} color={color} />;
      case ICON_TYPE.EvilIcons:
        return <EvilIcons name={name} size={size} color={color} />;
      case ICON_TYPE.Feather:
        return <Feather name={name} size={size} color={color} />;
      case ICON_TYPE.FontAwesome:
        return <FontAwesome name={name} size={size} color={color} />;
      case ICON_TYPE.FontAwesome5:
        return <FontAwesome5 name={name} size={size} color={color} />;
      case ICON_TYPE.Fontisto:
        return <Fontisto name={name} size={size} color={color} />;
      case ICON_TYPE.Foundation:
        return <Foundation name={name} size={size} color={color} />;
      case ICON_TYPE.Ionicons:
        return <Ionicons name={name} size={size} color={color} />;
      case ICON_TYPE.MaterialCommunityIcons:
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      case ICON_TYPE.MaterialIcons:
        return <MaterialIcons name={name} size={size} color={color} />;
      case ICON_TYPE.Octicons:
        return <Octicons name={name} size={size} color={color} />;
      default:
        return <AntDesign name={name} size={size} color={color} />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
  },
});
