import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default class TeamItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, id } = this.props;
    onPressItem(id);
  };

  render() {
    const { selected, title } = this.props;
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
          <View style={{ padding: 10, backgroundColor: "red" }}>
            <Text style={{ color: textColor }}>{title}</Text>
          </View>
          <View>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 15,
                backgroundColor: "red",
                margin: 10
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
