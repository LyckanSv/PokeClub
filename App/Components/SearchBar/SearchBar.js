import React from "react";
import { View, Item, Input, Button, Text } from "native-base";

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    const { searching, onChangeText } = this.props;
    const { value } = this.state;

    if (!searching) {
      return <View />;
    }
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: "#222f3e",
          flexDirection: "row"
        }}
      >
        <Item rounded style={{ backgroundColor: "#fff", flex: 1 }}>
          <Input
            placeholder="Region"
            value={value}
            onChangeText={v => this.setState({ value: v })}
          />
        </Item>
        <Button
          transparent
          onPress={() => {
            onChangeText(value);
          }}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </Button>
      </View>
    );
  }
}
