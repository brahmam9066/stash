import React, {Component} from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import FlatListItem from "../../../components/FlatListItem";
import Toolbar from "../../../components/Toolbar";
import SearchBar from "../../../components/SearchBar";
import {noResultsIcons} from "../../../assets";
import I18n from "../../../utils/language.utils";
import styles from "./styles";
import Footer from "../../../components/Footer";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onBackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    handleNutritionItemClick: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    nutritionList: PropTypes.array,
    handleListScroll: PropTypes.func,
    permissionsToCreate: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onBackPress: () => {},
    handleCreateNew: () => {},
    handleNutritionItemClick: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    nutritionList: [],
    handleListScroll: () => {},
    permissionsToCreate: false
};

class NutritionListing extends Component {

    _keyExtractor = (p) => {
        return this.createRandomId();
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    _renderItem = ({item}) => {
        const {language} = this.props;
        const nDate = moment(item.nutritionDate).format("DD-MM-YYYY");
        return (
            <FlatListItem
                iconStyle={styles.imageStyle}
                onPress={() => this.props.handleNutritionItemClick(item)}>
                <View style={styles.flatStyle}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{...styles.titleStyle, ...styles.textWidth}}>
                        <Text style={styles.headingStyle}>
                            {I18n.t("registrationIdAnimalListing", {locale: language})}
                        </Text>{item.cattle.stellaCode}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                            {I18n.t("dateObservationListing", {locale: language})}
                        </Text>{nDate}
                    </Text>
                </View>
            </FlatListItem>
        );
    }

    render() {
        const {language} = this.props;
        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onBackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.props.handleSearchItemPress}
                    comingFromForScan="nutritionListing"
                    language={language} />
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.linkView}>
                        <TouchableOpacity
                            disabled={!this.props.permissionsToCreate}
                            onPress={this.props.handleCreateNew}
                            style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                            <Text style={styles.linkTextStyle}><Text>+</Text>
                                {I18n.t("createNew", {locale: language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.nutritionList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.nutritionList.length && this.props.isInternetConnected ?
                                <Image source={noResultsIcons.iconNoResults} style={styles.emptyMessageStyle} resizeMode="center" />
                                : null)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footerViewStyle}>
                    <Footer
                        language={language} />
                </View>
            </View>
        );
    }
}

NutritionListing.propTypes = propTypes;

NutritionListing.defaultProps = defaultProps;

export default NutritionListing;
