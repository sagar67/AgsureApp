import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function CustomButton({children, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}
      onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    color: '#5956e9',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
