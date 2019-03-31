import React, { Component } from "react";
import { FlatList, View } from "react-native";
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
import { BarIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import RegionItem from "../../Components/RegionItem/RegionItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import RegionsActions from "../../Redux/RegionsRedux";

class RegionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateSearch: false
    };
  }

  componentDidMount() {
    const { getRegions } = this.props;
    SplashScreen.hide();
    getRegions();
  }

  componentWillReceiveProps(nextProps) {
    console.log("test", nextProps);
    // console.log(this.props);
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

  renderItem = ({ item, index }) => {
    if (item.name === "kalos" || item.name === "alola") {
      return <View />;
    }
    const { navigation } = this.props;
    return (
      <RegionItem
        id={index}
        onPressItem={() =>
          navigation.navigate("TeamsScreen", { region: item.name })
        }
        selected={false}
        title={item.name}
        image="http://66.media.tumblr.com/ce1f2d50192695b73e99087c415d13f3/tumblr_mtsibjBPPI1rvxzv5o1_500.png"
      />
    );
  };

  render() {
    const { activateSearch } = this.state;
    const { regions } = this.props;
    const IS_LOADING = regions.fetching === true;
    return (
      <Container>
        {this.headerBuilder()}
        <SearchBar
          searching={activateSearch}
          placeholder="Region"
          onChangeText={v => {
            console.log(v);
            this.setState({ activateSearch: !activateSearch });
          }}
        />
        {IS_LOADING && <BarIndicator />}
        <FlatList
          data={regions.regions}
          extraData={this.state}
          keyExtractor={(item, index) => item.name}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    regions: state.regionsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // eslint-disable-next-line import/no-named-as-default-member
    getRegions: () => dispatch(RegionsActions.getRegionsRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionScreen);
