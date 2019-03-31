import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "native-base";

const ball = require("../../Assets/Images/ball.png");

export default class TeamItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, id } = this.props;
    onPressItem(id);
  };

  ballBuilder = time => {
    const balls = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < time; index++) {
      balls.push(
        <Image
          style={{
            height: 20,
            width: 20,
            marginLeft: 5,
            marginTop: 10,
            marginBottom: 10
          }}
          source={ball}
          resizeMode="contain"
        />
      );
    }
    return balls;
  };

  render() {
    const { selected, title, times } = this.props;
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
          <View style={{ padding: 10, backgroundColor: "#C32F2F" }}>
            <Text style={{ color: "#fff" }}>{title}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {this.ballBuilder(times)}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
