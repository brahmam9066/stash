import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import FlatListItem from "../../../../components/FlatListItem";
import Toolbar from "../../../../components/Toolbar";
import Footer from "../../../../components/Footer";
import Box from "../../../../components/Box";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    treatmentList: PropTypes.array,
    handlePressBcs: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    bcsList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    isPaidUser: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    treatmentList: [],
    handlePressBcs: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    bcsList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    isPaidUser: false
};

class BodyConditionScoreListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        if (this.props.activeTab === "Score 1 - 2" || this.props.activeTab === "Score 3 - 4") {
            return (
                <FlatListItem
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressBcs(item)}>
                    <View style={styles.flatStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text> {item.cattle.stellaCode}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('dateTimeColonbar', {locale:language})}
                            </Text> {moment(item.measurementDate).format("DD-MM-YYYY")}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('bcsScore', {locale:language})}
                            </Text> {item.score}
                        </Text>
                        {this.props.isPaidUser &&
                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titleStyle}>
                                    <Text style={styles.headingStyle}>{item.cattle.reportingOrg.orgType} :  </Text> {item.cattle.reportingOrg.stellaCode}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titleStyle}>
                                    <Text style={styles.headingStyle}>
                                    {I18n.t('farmerAnimalListing', {locale:language})}
                                    </Text>{item.cattle.org.stellaCode}
                                </Text>
                            </View>
                        }
                    </View>
                </FlatListItem>
            );
        }
        return null;
    }

    render() {
        const {activeTab,language} = this.props;
        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    comingFromForScan="bcsListingScreen" 
                    handleSearchItemPress={this.props.handleSearchItemPress} 
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.linkView}>
                        <TouchableOpacity disabled={!this.props.permissionsToCreate} onPress={this.props.handleCreateNew} style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                            <Text style={styles.linkTextStyle}><Text>+</Text> 
                            {I18n.t('createNew', {locale:language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.boxViewContainer}>
                    <Box
                        text="Score 1 - 2"
                        textStyle={styles.boxTextStyle}
                        boxStyle={[styles.boxStyle, activeTab === "Score 1 - 2" ? styles.backgroundGrey : styles.backgroundWhite]}
                        onPress={this.props.resetAllData} />
                    <Box
                        text="Score 3 - 4"
                        textStyle={styles.boxTextStyle}
                        boxStyle={[styles.boxStyle, activeTab === "Score 3 - 4" ? styles.backgroundGrey : styles.backgroundWhite]}
                        onPress={this.props.setDataToRaksha} />
                    <Box
                        text="Score 5 - 6"
                        textStyle={styles.boxTextStyle}
                        boxStyle={[styles.boxStyle, activeTab === "Score 5 - 6" ? styles.backgroundGrey : styles.backgroundWhite]}
                        onPress={this.props.setDataToGovt} />
                </View> */}
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.bcsList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.bcsList.length && this.props.isInternetConnected ?
                                <Image source={noResultsIcons.iconNoResults} style={styles.emptyMessageStyle} resizeMode="center" />
                                : null)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footerViewStyle}>
                    <Footer 
                    language={language}/>
                </View>
            </View>
        );
    }
}

BodyConditionScoreListing.propTypes = propTypes;

BodyConditionScoreListing.defaultProps = defaultProps;

export default BodyConditionScoreListing;
