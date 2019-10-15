import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import {Icon} from "react-native-elements";
import {navigateTo} from "../../utils/utility";


import styles from "./styles";

const propTypes = {
    iconUsermooOn: PropTypes.any,
    titleStyle: PropTypes.object,
    listImage: PropTypes.object,
    headingStyle: PropTypes.object,
    RegisterationId: PropTypes.string,
    lactation: PropTypes.string,
    Organisation: PropTypes.string,
    rightIconColor: PropTypes.string,
    rightIconSize: PropTypes.number,
    onPress: PropTypes.func,
    id: PropTypes.string
};

const defaultProps = {
    iconUsermooOn: "",
    titleStyle: {},
    listImage: {},
    headingStyle: {},
    RegisterationId: "",
    lactation: "",
    Organisation: "",
    rightIconColor: "#517fa4",
    rightIconSize: 28,
    onPress: () => {},
    id: ""

};

class ListFlat extends Component<{}> {

  _renderItem = ({item}) => (
      <TouchableOpacity accessibilityLabel={this.props.id} testID={this.props.id} onPress={this.props.onPress}>
          <View style={styles.listItemContainer}>
              <View style={styles.leftIconContainer}>
                  <Image
                      style={this.props.listImage}
                      source={this.props.iconUsermooOn}
                  />
              </View>
              <View style={styles.listStyle}>
                  <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={this.props.titleStyle}>
                      <Text style={this.props.headingStyle}>RegistrationID :  </Text>{item.stellaCode}
                  </Text>
                  <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={this.props.titleStyle}>
                      <Text style={this.props.headingStyle}> Lactation : </Text> {item.lactationState}
                  </Text>
              </View>
              <View style={styles.rightIconContainer}>
                  <Icon
                      name="chevron-right"
                      type="material-community"
                      color={this.props.rightIconColor}
                      size={this.props.rightIconSize}
                  />
              </View>
          </View>
      </TouchableOpacity>
  );

  _keyExtractor(p) {
      return `${p.id}`;
  }

  render() {
      return (
          <View style={styles.container}>
              <FlatList
                  data={this.props.data}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
              />
          </View>
      );
  }
}

ListFlat.defaultProps = defaultProps;

ListFlat.propTypes = propTypes;

export default ListFlat;
