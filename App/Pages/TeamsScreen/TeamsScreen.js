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
import { BarIndicator } from "react-native-indicators";
import TeamItem from "../../Components/TeamItem/TeamItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TeamActionModal from "../../Components/TeamActionsModal/TeamActionModal";
import PokemonTeamActions from "../../Redux/PokemonTeamRedux";
import TeamsScreenModes from "../../Utils/TeamScreenModes";

class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      activateSearch: false,
      teamActionModalActivate: false,
      teams: [],
      selectedTeam: null,
      isLoading: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const region = navigation.getParam("region");
    this.setState({ region: region });
    this.fetchTeams(region);
  }

  fetchTeams = region => {
    console.log("xxxx", region);

    this.setState({ isLoading: true });
    firebase
      .database()
      .ref("/Teams")
      .orderByChild("user")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        const items = [];
        snapshot.forEach(child => {
          if (child.val().region === region) {
            items.push({
              key: child.key,
              region: child.val().region,
              team: child.val().team,
              user: child.val().user
            });
          }
        });
        console.log("Items", items);
        this.setState({ teams: items, isLoading: false });
      });
  };

  deleteTeam = id => {
    firebase
      .database()
      .ref(`Teams/${id}`)
      .remove();
  };

  headerBuilder = () => {
    const { activateSearch, region } = this.state;
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
            onPress={() =>
              navigation.navigate("TeamScreen", {
                region,
                screenMode: TeamsScreenModes.Create
              })
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
        onPressItem={() => {
          this.setState({
            teamActionModalActivate: !teamActionModalActivate,
            selectedTeam: item
          });
        }}
        selected={false}
        title={item.teamName}
        times={item.team.length}
      />
    );
  };

  render() {
    const {
      teams,
      activateSearch,
      teamActionModalActivate,
      selectedTeam,
      region,
      isLoading
    } = this.state;
    const { addPokemonTeam, navigation } = this.props;
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
        {isLoading && <BarIndicator />}
        {!isLoading && (
          <FlatList
            data={teams}
            extraData={this.state}
            keyExtractor={item => item.key}
            renderItem={this.renderItem}
          />
        )}

        <TeamActionModal
          active={teamActionModalActivate}
          onRequestClose={() => {
            this.setState({
              teamActionModalActivate: !teamActionModalActivate
            });
          }}
          onRequestEdit={() => {
            this.setState({
              teamActionModalActivate: !teamActionModalActivate
            });
            addPokemonTeam(selectedTeam.team);
            navigation.navigate("TeamScreen", {
              region,
              teamId: selectedTeam.key,
              screenMode: TeamsScreenModes.Edit
            });
          }}
          onRequestDelete={() => {
            this.deleteTeam(selectedTeam.key);
          }}
          onRequestInfo={() => {
            this.setState({
              teamActionModalActivate: !teamActionModalActivate
            });
            addPokemonTeam(selectedTeam.team);
            navigation.navigate("TeamScreen", {
              region,
              teamId: selectedTeam.key,
              screenMode: TeamsScreenModes.Info
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
