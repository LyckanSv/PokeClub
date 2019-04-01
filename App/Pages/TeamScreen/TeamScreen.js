import React, { Component } from "react";
import { ImageBackground, TouchableHighlight, Alert } from "react-native";
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
  Right,
  Item,
  Input
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import PokemonTeamActions from "../../Redux/PokemonTeamRedux";
import TeamScreenModes from "../../Utils/TeamScreenModes";

class TeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      currentUser: null,
      screenMode: TeamScreenModes.Info,
      teamId: null,
      nameValue: ""
    };
  }

  componentDidMount() {
    const { navigation, pokemonTeamData } = this.props;
    this.setState({
      region: navigation.getParam("region"),
      teamId: navigation.getParam("teamId"),
      screenMode: navigation.getParam("screenMode")
        ? navigation.getParam("screenMode")
        : TeamScreenModes.Info
    });
    const { currentUser } = firebase.auth();
    this.setState({
      currentUser,
      nameValue: pokemonTeamData.pokemonTeam.teamName
        ? pokemonTeamData.pokemonTeam.teamName
        : ""
    });
  }

  handlerCreateTeam = (team, region, user, teamName) => {
    const { navigation } = this.props;
    firebase
      .database()
      .ref("Teams/")
      .push({
        region,
        team,
        user,
        teamName
      })
      .then(data => {
        navigation.goBack();
      })
      .catch(error => {
        // error callback
        console.log("error ", error);
      });
  };

  handlerUpdateTeam = (team, region, user, id, teamName) => {
    const { navigation } = this.props;
    firebase
      .database()
      .ref(`Teams/${id}`)
      .update({
        region,
        team,
        user,
        teamName
      })
      .then(data => {
        // success callback
        navigation.goBack();
      })
      .catch(error => {
        // error callback
        console.log("error ", error);
      });
  };

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

  pokemonTileBuilder = (item, index) => {
    const { navigation } = this.props;
    const { region, screenMode } = this.state;
    if (!item) {
      return (
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => {
            if (screenMode !== TeamScreenModes.Info) {
              navigation.navigate("PokedexScreen", {
                region,
                index
              });
            }
          }}
        >
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
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        onPress={() => {
          if (screenMode !== TeamScreenModes.Info) {
            navigation.navigate("PokedexScreen", {
              region,
              index
            });
          }
        }}
      >
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
          <View style={{ backgroundColor: "#C32F2F", padding: 10 }}>
            <Text>{item.name}</Text>
          </View>
          <ImageBackground
            style={{ backgroundColor: "#c8d6e5", flex: 1 }}
            source={{
              uri: item.image
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableHighlight>
    );
  };

  validateData = (
    screenMode,
    pokemonTeam,
    region,
    currentUser,
    teamId,
    teamName
  ) => {
    if (teamName.length < 3) {
      Alert.alert(
        "Team Name",
        "The name must be greater than 3 characters.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    if (pokemonTeam.length < 3) {
      Alert.alert(
        "Team Name",
        "The team have at least 3 pokemons",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    if (screenMode === TeamScreenModes.Create) {
      this.handlerCreateTeam(pokemonTeam, region, currentUser, teamName);
    } else if (screenMode === TeamScreenModes.Edit) {
      this.handlerUpdateTeam(
        pokemonTeam,
        region,
        currentUser,
        teamId,
        teamName
      );
    }
  };

  render() {
    const { pokemonTeamData } = this.props;
    const { region, currentUser, screenMode, teamId, nameValue } = this.state;
    return (
      <Container>
        {this.headerBuilder()}
        {screenMode !== TeamScreenModes.Info && (
          <View style={{ padding: 10 }}>
            <Item rounded>
              <Input
                placeholder="Name"
                value={nameValue}
                onChangeText={value => {
                  this.setState({ nameValue: value });
                }}
              />
            </Item>
          </View>
        )}

        <Grid>
          <Row>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[0], 0)}
            </Col>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[1], 1)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[2], 2)}
            </Col>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[3], 3)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[4], 4)}
            </Col>
            <Col>
              {this.pokemonTileBuilder(pokemonTeamData.pokemonTeam[5], 5)}
            </Col>
          </Row>
        </Grid>
        {screenMode !== TeamScreenModes.Info && (
          <Button
            style={{ margin: 10 }}
            block
            rounded
            onPress={() => {
              this.validateData(
                screenMode,
                pokemonTeamData.pokemonTeam,
                region,
                currentUser.uid,
                teamId,
                nameValue
              );
            }}
          >
            <Text>Save</Text>
          </Button>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemonTeamData: state.pokemonTeamData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPokemonTeam: pokemonTeam =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonTeamActions.addPokemonTeam(pokemonTeam)),
    getPokemonTeam: () =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonTeamActions.getPokemonTeam()),
    deletePokemonTeam: () =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonTeamActions.deletePokemonTeam())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamScreen);
