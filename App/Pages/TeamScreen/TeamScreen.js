import React, { Component } from "react";
import { ImageBackground } from "react-native";
import {
  View,
  Container,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class TeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [
        {
          position: 1,
          pokemon: {
            name: "Ditto",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          }
        },
        {
          position: 2,
          pokemon: {
            name: "Pikahu",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          }
        }
      ]
    };
  }

  headerBuilder = () => {
    const { navigation } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Team</Title>
        </Body>
        <Right />
      </Header>
    );
  };

  pokemonTileBuilder = item => {
    if (!item) {
      return (
        <View
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: "#000",
            overflow: "hidden",
            justifyContent: "center",
            backgroundColor: "#c8d6e5",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>Add Pokemon</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          margin: 5,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#000",
          overflow: "hidden"
        }}
      >
        <View style={{ backgroundColor: "red", padding: 10 }}>
          <Text>{item.pokemon.name}</Text>
        </View>
        <ImageBackground
          style={{ backgroundColor: "#c8d6e5", flex: 1 }}
          source={{
            uri: item.pokemon.image
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  render() {
    const { team } = this.state;
    return (
      <Container>
        {this.headerBuilder()}
        <Grid>
          <Row>
            <Col style={{ backgroundColor: "#54a0ff" }}>
              {this.pokemonTileBuilder(team[0])}
            </Col>
            <Col style={{ backgroundColor: "#5f27cd" }}>
              {this.pokemonTileBuilder(team[1])}
            </Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: "#5f27cd" }}>
              {this.pokemonTileBuilder(team[2])}
            </Col>
            <Col style={{ backgroundColor: "#54a0ff" }}>
              {this.pokemonTileBuilder(team[3])}
            </Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: "#54a0ff" }}>
              {this.pokemonTileBuilder(team[4])}
            </Col>
            <Col style={{ backgroundColor: "#5f27cd" }}>
              {this.pokemonTileBuilder(team[5])}
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
