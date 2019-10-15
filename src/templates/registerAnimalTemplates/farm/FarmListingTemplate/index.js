import React, {Component} from "react";
import {View, ScrollView, FlatList, Text, Image, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {animalListIcons, noResultsIcons} from "../../../../assets";

import Toolbar from "../../../../components/Toolbar";
import Filter from "../../../../components/Filter";
import PageLoadError from "../../../../components/PageLoadError";
import Footer from "../../../../components/Footer";
import FlatListItem from "../../../../components/FlatListItem";
import SearchBar from "../../../../components/SearchBar";
import {navigateTo} from "../../../../utils/utility";
import {locationIcons} from "../../../../assets"

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    data: PropTypes.any,
    onbackPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    handleListScroll: PropTypes.func,
    handleViewLayout: PropTypes.func,
    handleSetAllData: PropTypes.func,
    handleSetDataToMilking: PropTypes.func,
    handleSetDataToDry: PropTypes.func,
    isPaidUser: PropTypes.bool,
    onFocusSearchBar: PropTypes.func,
    isNearMe: PropTypes.bool,
    isLocationSearching: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    data: [],
    onbackPress: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    handleListScroll: () => {},
    handleViewLayout: () => {},
    handleSetAllData: () => {},
    handleSetDataToMilking: () => {},
    handleSetDataToDry: () => {},
    isPaidUser: false,
    onFocusSearchBar: () => {},
    isNearMe: false,
    isLocationSearching: false
};

class FarmListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderItem = ({item}) => {
        if (this.props.activeTab === "All" || this.props.activeTab === "Milking" || this.props.activeTab === "Dryoff" || this.props.activeTab === item.Lactation) {
            return (
                <FlatListItem onPress={() => navigateTo("farmDetails", {item})} iconStyle={styles.imageStyle}>
                    <View>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Farm ID :  </Text>{item.stellaCode}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Farm Name :  </Text>{item.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Contact No :  </Text>{item.phone ? item.phone : "not available"}
                        </Text>
                    </View>
                </FlatListItem>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.props.handleSearchItemPress}
                    searchBarStyle={styles.searchbarBackground}
                    onFocus={this.props.onFocusSearchBar}
                    onBlur={this.props.onBlurSearchBar}
                />
                {
                    this.props.isNearMe && this.props.isLocationSearching ?
                        <TouchableOpacity style={styles.nearMeContainer} onPress={this.props.nearMe}>
                            <Text style={styles.nearMeText}>{this.props.nearMeText}</Text>
                            <Image style={styles.locationIcon} source={locationIcons.iconLocation}/>
                        </TouchableOpacity>
                    : null
                }
                <View style={styles.linkView}>
                    {this.props.isCreatePermission ?
                        <TouchableOpacity
                            disabled={!this.props.permissionsToCreate}
                            onPress={this.props.handleCreateNew}
                            style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}
                        >
                            <Text style={styles.linkTextStyle}><Text>+</Text> Create New</Text>
                        </TouchableOpacity>
                        : null
                    }
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.data}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.data.length ?
                                <Image source={noResultsIcons.iconNoResults} style={styles.emptyMessageStyle} resizeMode="center" />
                                : null)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footerViewStyle}>
                    <Footer />
                </View>
            </View>
        );
    }
}

FarmListing.propTypes = propTypes;

FarmListing.defaultProps = defaultProps;

export default FarmListing;
