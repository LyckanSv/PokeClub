import React from "react";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";

export default class RegionItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, id } = this.props;
    onPressItem(id);
  };

  render() {
    const { selected, title, image } = this.props;
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
        <ImageBackground
          source={{
            uri: image
          }}
          style={{
            width: "100%",
            height: 80,
            alignItems: "center",
            justifyContent: "center"
          }}
          resizeMode="cover"
        >
          <Text
            style={{
              color: textColor,
              alignSelf: "center",
              fontFamily: "Montserrat-Regular",
              fontSize: 20
            }}
          >
            {title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
