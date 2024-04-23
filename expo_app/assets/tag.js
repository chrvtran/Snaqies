import { View, TextInput } from "react-native";

export default function tag() {
  return (
    <View>
      <TextInput
        editable
        numberOfLines={1}
        onChangeText={(text) => setTag(text)}
        value="Hello"
      />
    </View>
  );
}
