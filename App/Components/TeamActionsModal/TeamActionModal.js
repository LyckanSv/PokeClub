import React from "react";
import { Modal, View } from "react-native";
import { Button, Text, Icon } from "native-base";

export default class TeamActionModal extends React.PureComponent {
  render() {
    const { active, onRequestClose } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={active}
        onRequestClose={onRequestClose}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 5,
              borderColor: "#000",
              borderWidth: 2,
              width: "100%"
            }}
          >
            <Button
              iconLeft
              rounded
              block
              style={{ marginHorizontal: 10, marginVertical: 5 }}
            >
              <Icon name="create" />
              <Text>Edit</Text>
            </Button>
            <Button
              rounded
              info
              block
              iconLeft
              style={{ marginHorizontal: 10, marginVertical: 5 }}
            >
              <Icon name="information" />
              <Text>Info</Text>
            </Button>
            <Button
              rounded
              danger
              block
              iconLeft
              style={{ marginHorizontal: 10, marginVertical: 5 }}
            >
              <Icon name="close" />
              <Text>Delete</Text>
            </Button>
            <Button
              rounded
              onPress={onRequestClose}
              block
              style={{ marginHorizontal: 10, marginVertical: 5 }}
            >
              <Text>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
