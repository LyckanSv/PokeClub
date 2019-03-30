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
import TeamItem from "../../Components/TeamItem/TeamItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TeamActionModal from "../../Components/TeamActionsModal/TeamActionModal";

export default class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateSearch: false,
      teamActionModalActivate: false,
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
    const { teamActionModalActivate } = this.state;
    return (
      <TeamItem
        id={item.id}
        onPressItem={v => {
          this.setState({ teamActionModalActivate: !teamActionModalActivate });
        }}
        selected={false}
        title={item.text}
      />
    );
  };

  render() {
    const { regions, activateSearch, teamActionModalActivate } = this.state;
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
          data={regions}
          extraData={this.state}
          keyExtractor={(item, index) => item.id + index}
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
