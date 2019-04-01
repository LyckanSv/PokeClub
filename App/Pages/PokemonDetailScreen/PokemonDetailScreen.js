import React, { Component } from "react";
import { Image, ScrollView } from "react-native";

import {
  Button,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Container,
  View,
  Text,
  Content
} from "native-base";
import { connect } from "react-redux";
import { BarIndicator } from "react-native-indicators";
import PokemonSpeciesActions from "../../Redux/PokemonSpeciesRedux";
import PokemonDetailActions from "../../Redux/PokemonDetailRedux";
import PokemonTeamActions from "../../Redux/PokemonTeamRedux";

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      index: null
    };
  }

  componentWillMount() {
    const { getPokemonDetail, getPokemonSpecies, navigation } = this.props;
    const pokemon = navigation.getParam("pokemon");
    const index = navigation.getParam("index");
    this.setState({ pokemon, index });
    getPokemonDetail(pokemon.name);
    getPokemonSpecies(pokemon.name);
  }

  addPokemonInTeam = (pokemon, index) => {
    console.log("index", index);
    const { navigation } = this.props;
    const { addPokemonTeam, pokemonTeamData } = this.props;
    const team = [...pokemonTeamData.pokemonTeam];
    if (team.length < 6) {
      for (let index = 0; index <= 6 - team.length; index++) {
        team.push(null);
      }
    }
    team[index] = pokemon;
    addPokemonTeam(team);
    navigation.pop(2);
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
          <Title>Pokemon</Title>
        </Body>
        <Right />
      </Header>
    );
  };

  render() {
    const { pokemonDetailData, pokemonSpeciesData } = this.props;
    const { pokemon, index } = this.state;
    const IS_FETCHING =
      pokemonDetailData.fetching || pokemonSpeciesData.fetching;
    return (
      <Container>
        {this.headerBuilder()}
        <Content>
          {IS_FETCHING && <BarIndicator />}
          {!IS_FETCHING &&
            pokemonDetailData.pokemon &&
            pokemonSpeciesData.pokemon && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#2d3436",
                    padding: 10
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri: pokemonDetailData.pokemon.sprites.front_default
                    }}
                  />
                  <View>
                    <Text style={{ color: "#fff" }}>
                      {`ID: ${pokemonDetailData.pokemon.id}`}
                    </Text>
                    <Text style={{ color: "#fff" }}>
                      {`Name: ${pokemonDetailData.pokemon.name}`}
                    </Text>
                    <Text style={{ color: "#fff" }}>Type</Text>
                  </View>
                </View>
                <View padder>
                  <Text style={{ fontFamily: "PlayfairDisplay-Regular" }}>
                    {
                      pokemonSpeciesData.pokemon.flavor_text_entries[1]
                        .flavor_text
                    }
                  </Text>
                </View>
                <Button
                  block
                  rounded
                  style={{ margin: 10 }}
                  onPress={() => {
                    this.addPokemonInTeam(pokemon, index);
                  }}
                >
                  <Text>Select</Text>
                </Button>
              </View>
            )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokedex: state.pokedexData,
    pokemonTeamData: state.pokemonTeamData,
    pokemonDetailData: state.pokemonDetailData,
    pokemonSpeciesData: state.pokemonSpeciesData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPokemonDetail: id =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonDetailActions.getPokemonDetailRequest(id)),
    getPokemonSpecies: id =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonSpeciesActions.getPokemonSpeciesRequest(id)),
    addPokemonTeam: pokemonTeam =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonTeamActions.addPokemonTeam(pokemonTeam))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
