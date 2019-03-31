import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

export default class PokedexItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, id } = this.props;
    onPressItem(id);
  };

  render() {
    const { selected, id, name, image } = this.props;
    const textColor = selected ? "yellow" : "black";
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          backgroundColor: "#c8d6e5",
          margin: 10,
          borderColor: "#000",
          borderWidth: 2,
          borderRadius: 5,
          overflow: "hidden"
        }}
      >
        <View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              style={{ height: 40, width: 40, marginRight: 5 }}
              source={{ uri: image }}
              resizeMode="contain"
            />
            <Text style={{ color: textColor, width: 40 }}>{id}</Text>
            <Text style={{ color: textColor, flex: 1 }}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
