import React, { Component } from "react";
import { ImageBackground, TouchableHighlight } from "react-native";
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
      teamId: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      region: navigation.getParam("region"),
      teamId: navigation.getParam("teamId"),
      screenMode: navigation.getParam("screenMode")
    });
    this.setState({ teamId: navigation.getParam("teamId") });
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  handlerCreateTeam = (team, region, user) => {
    firebase
      .database()
      .ref("Teams/")
      .push({
        region,
        team,
        user
      })
      .then(data => {
        // success callback
        console.log("data ", data);
      })
      .catch(error => {
        // error callback
        console.log("error ", error);
      });
  };

  handlerUpdateTeam = (team, region, user, id) => {
    firebase
      .database()
      .ref(`Teams/${id}`)
      .update({
        region,
        team,
        user
      })
      .then(data => {
        // success callback
        console.log("data ", data);
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
    const { region } = this.state;
    if (!item) {
      return (
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate("PokedexScreen", {
              region,
              index
            });
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
      <TouchableHighlight style={{ flex: 1 }}>
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

  render() {
    const { pokemonTeamData } = this.props;
    const { region, currentUser, screenMode, teamId } = this.state;
    return (
      <Container>
        {this.headerBuilder()}
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
        <Button
          style={{ margin: 10 }}
          block
          rounded
          onPress={() => {
            if (screenMode === TeamScreenModes.Create) {
              this.handlerCreateTeam(
                pokemonTeamData.pokemonTeam,
                region,
                currentUser.uid
              );
            } else if (screenMode === TeamScreenModes.Edit) {
              this.handlerUpdateTeam(
                pokemonTeamData.pokemonTeam,
                region,
                currentUser.uid,
                teamId
              );
            }
          }}
        >
          <Text>Save</Text>
        </Button>
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
