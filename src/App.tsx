/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {TextInput, View, Button} from 'react-native';
import {black_box_curry} from './checker/zz';
import _PhoneNumberTextReplacer from './PhoneNumberTextModule';
const PhoneNumberTextReplacer = black_box_curry(_PhoneNumberTextReplacer);

const App = () => {
  const [value, setValue] = useState('');

  const onChangeText = (text: string) => {
    const nxt = PhoneNumberTextReplacer(value, text);
    setValue(nxt);
  };

  return (
    <View
      style={{
        paddingTop: 120,
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: 'black',
      }}>
      <TextInput
        style={{
          height: 48,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: '#f2f2f212',
          textAlign: 'center',
          fontSize: value === '' ? 16 : 24,
          color: 'white',
        }}
        keyboardType={'number-pad'}
        placeholder={'Type your phone number'}
        placeholderTextColor={'white'}
        value={value}
        onChangeText={onChangeText}
      />
      <Button title={'Retry'} onPress={() => setValue('')} />
    </View>
  );
};

export default App;
