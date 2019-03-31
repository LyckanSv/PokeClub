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
import firebase from "react-native-firebase";
import TeamItem from "../../Components/TeamItem/TeamItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TeamActionModal from "../../Components/TeamActionsModal/TeamActionModal";
import PokemonTeamActions from "../../Redux/PokemonTeamRedux";

class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      activateSearch: false,
      teamActionModalActivate: false,
      teams: [],
      regions: [
        {
          id: 1,
          text: "Fuego"
        },
        {
          id: 2,
          text: "Basicos"
        },
        {
          id: 3,
          text: "Hadas"
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({ region: this.props.navigation.getParam("region") });
    firebase
      .database()
      .ref("/Teams/")
      .on("value", snapshot => {
        const items = [];
        snapshot.forEach(child => {
          items.push({
            key: child.key,
            region: child.val().region,
            team: child.val().team,
            user: child.val().user
          });
        });
        console.log("Items", items);
        this.setState({ teams: items });
      });
  }

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
          <Title>Teams</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.setState({ activateSearch: !activateSearch })}
          >
            <Icon name="search" />
          </Button>
          <Button
            transparent
            onPress={() =>
              navigation.navigate("TeamScreen", { region: this.state.region })
            }
          >
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
    );
  };

  renderItem = ({ item }) => {
    const { teamActionModalActivate } = this.state;
    return (
      <TeamItem
        id={item.key}
        onPressItem={v => {
          this.setState({ teamActionModalActivate: !teamActionModalActivate });
        }}
        selected={false}
        title={item.region}
        times={item.team.length}
      />
    );
  };

  render() {
    const { teams, activateSearch, teamActionModalActivate } = this.state;
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
        <FlatList
          data={teams}
          extraData={this.state}
          keyExtractor={(item, index) => item.key}
          renderItem={this.renderItem}
        />
        <TeamActionModal
          active={teamActionModalActivate}
          onRequestClose={() => {
            this.setState({
              teamActionModalActivate: !teamActionModalActivate
            });
          }}
        />
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
)(TeamsScreen);
