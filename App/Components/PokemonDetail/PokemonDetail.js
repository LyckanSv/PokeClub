/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Modal, Image, ScrollView } from "react-native";
import { View, Text } from "native-base";
import { connect } from "react-redux";
import PokemonDetailActions from "../../Redux/PokemonDetailRedux";

class PokemonDetailScreen extends React.PureComponent {
  render() {
    const { pokemon } = this.props;

    return (
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Image />
            <View>
              <Text>{`Id ${pokemon.id}`} </Text>
              <Text>{`Name ${pokemon.name}`} </Text>
              <Text>Type</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontFamily: "PlayfairDisplay-Regular" }}>
              {" "}
              Description
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokedex: state.pokedexData,
    pokemonTeamData: state.pokemonTeamData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPokemonDetail: id =>
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(PokemonDetailActions.getPokemonDetailRequest(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetailScreen);
