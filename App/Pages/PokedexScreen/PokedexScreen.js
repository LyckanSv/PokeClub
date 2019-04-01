import React, { Component } from "react";
import { FlatList } from "react-native";
import {
  Button,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Container
} from "native-base";
import { connect } from "react-redux";
import { BarIndicator } from "react-native-indicators";
import PokedexItem from "../../Components/PokedexItem/PokedexItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import PokedexActions from "../../Redux/PokedexRedux";

class PokedexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateSearch: false,
      teamActionModalActivate: false,
      index: null,
      selectedPokemon: { id: null }
    };
  }

  componentDidMount() {
    const { navigation, getPokedex } = this.props;
    const region = navigation.getParam("region");
    const index = navigation.getParam("index");
    this.setState({ index });
    getPokedex(this.regionToCode(region));
  }

  regionToCode = region => {
    switch (region) {
      case "kanto":
        return 2;
      case "johto":
        return 3;
      case "hoenn":
        return 4;
      case "sinnoh":
        return 5;
      case "unova":
        return 8;
      default:
        return 0;
    }
  };

  headerBuilder = () => {
    const { activateSearch } = this.state;
    const { navigation } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Regions</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.setState({ activateSearch: !activateSearch })}
          >
            <Icon name="search" />
          </Button>
          <Button transparent onPress={() => navigation.navigate("TeamScreen")}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
    );
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const { index } = this.state;
    const id = item.pokemon_species.url.substring(
      42,
      item.pokemon_species.url.length - 1
    );
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
      <PokedexItem
        id={item.entry_number}
        onPressItem={() => {
          navigation.navigate("PokemonDetailScreen", {
            pokemon: {
              id,
              entry_number: item.entry_number,
              name: item.pokemon_species.name,
              image
            },
            index
          });
        }}
        selected={false}
        name={item.pokemon_species.name}
        image={image}
      />
    );
  };

  render() {
    const { activateSearch } = this.state;
    const { pokedex, pokemonDetailData } = this.props;
    const IS_LOADING = pokedex.fetching;
    return (
      <Container>
        {this.headerBuilder()}
        <SearchBar
          searching={activateSearch}
          placeholder="Team name"
          onChangeText={v => {
            console.log(v);
            this.setState({ activateSearch: !activateSearch });
          }}
        />
        {IS_LOADING && <BarIndicator />}
        <FlatList
          data={pokedex.pokemons}
          extraData={this.state}
          keyExtractor={(item, index) => item.pokemon_species.name}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokedex: state.pokedexData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // eslint-disable-next-line import/no-named-as-default-member
    getPokedex: region => dispatch(PokedexActions.getPokedexRequest(region))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokedexScreen);
