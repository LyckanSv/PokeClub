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
import RegionItem from "../../Components/RegionItem/RegionItem";
import SearchBar from "../../Components/SearchBar/SearchBar";

export default class RegionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateSearch: false,
      regions: [
        {
          id: 1,
          text: "Jeoto",
          image:
            "http://66.media.tumblr.com/8796a0180dbcd92c42b735712001b2df/tumblr_niczi1uL2v1qiemkoo4_1280.png"
        },
        {
          id: 2,
          text: "Canto",
          image:
            "http://images.fanpop.com/images/image_uploads/Kanto-Towns-pok-C3-A9mon-124041_290_242.jpg"
        },
        {
          id: 3,
          text: "Hoen",
          image:
            "https://i.kym-cdn.com/photos/images/original/000/911/062/0ae.png"
        }
      ]
    };
  }

  headerBuilder = () => {
    const { activateSearch } = this.state;
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
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
        </Right>
      </Header>
    );
  };

  renderItem = ({ item }) => (
    <RegionItem
      id={item.id}
      onPressItem={v => console.log(v)}
      selected={false}
      title={item.text}
      image={item.image}
    />
  );

  render() {
    const { regions, activateSearch } = this.state;
    return (
      <Container>
        {this.headerBuilder()}
        <SearchBar
          searching={activateSearch}
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
      </Container>
    );
  }
}
