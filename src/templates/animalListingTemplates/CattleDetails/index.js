import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import PropTypes from "prop-types";

import Toolbar from "../../../components/Toolbar";
import AnimalProfile from "../../../components/AnimalProfile";
import Summary from "../../../components/Summary";
import Tabs from "../../../components/Tabs";
import SearchBar from "../../../components/SearchBar";
import {navigateTo} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    selectedAnimalDetails: PropTypes.object,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    tabList: PropTypes.array,
    defaultTab: PropTypes.string,
    handleTabPress: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    selectedAnimalDetails: {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    handleTabPress: () => {},
    tabList: [],
    defaultTab: ""
};

class CattleDetails extends Component {
    render() {
        const {selectedAnimalDetails, language} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.props.handleSearchItemPress}
                    searchBarStyle={styles.searchbarBackground}
                    language={language}
                />
                <ScrollView>
                    <View style={styles.filterViewContainer}>
                        <AnimalProfile>
                            <View style={styles.infoContainer}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.labelstyle}>
                                    {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {selectedAnimalDetails.stellaCode ? selectedAnimalDetails.stellaCode : ""}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.profileTextStyle}>
                                    <Text style={styles.labelstyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text>{selectedAnimalDetails.lactationState ? selectedAnimalDetails.lactationState : ""}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.profileTextStyle}>
                                    <Text style={styles.labelstyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text>{selectedAnimalDetails.breedingState ? selectedAnimalDetails.breedingState : ""}
                                </Text>
                            </View>
                        </AnimalProfile>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Tabs
                                tabList={this.props.tabList}
                                defaultTab={this.props.defaultTab}
                                handleTabPress={this.props.handleTabPress}
                                tabIconStyle={styles.tabIconStyle}
                                tabStyle={styles.tabStyle} />
                        </ScrollView>
                    </View>
                    <View style={styles.listViewContainer}>
                        <View style={styles.summaryViewstyle}>
                            <Summary
                                selectedAnimalDetails={selectedAnimalDetails}
                                language={language}
                                onPressEvent={() => navigateTo("animalDetails", {comingFrom: this.props.comingFrom === "dashboard" ? "dashboard" : "cattleDetails", selectedAnimalDetails})} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

CattleDetails.propTypes = propTypes;

CattleDetails.defaultProps = defaultProps;


export default CattleDetails;
