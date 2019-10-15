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
    handlePressBwm: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    bwmList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    isPaidUser: PropTypes.bool,
    permissionsToCreate: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    treatmentList: [],
    handlePressBwm: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    bwmList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    isPaidUser: false,
    permissionsToCreate: false
};

class BodyWeightMgmtListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        console.log("measure",item.measurementMethod);
        if (this.props.activeTab === "Direct") {
            return (
                <FlatListItem
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressBwm(item)}>
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
                            {I18n.t('measurementTypeColon', {locale:language})}                            
                            </Text> {item.measurementMethod}
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
        return null
    }

    render() {
        console.log("bwmlist",this.props.bwmList);
        const {activeTab,bwmDetails,language} = this.props;
        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    comingFromForScan="bwmListingScreen"
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
                        text="Direct"
                        textStyle={styles.boxTextStyle}
                        boxStyle={[styles.boxStyle, activeTab === "Direct" ? styles.backgroundGrey : styles.backgroundWhite]}
                        onPress={this.props.resetAllData} />
                    <Box
                        text="Indirect"
                        textStyle={styles.boxTextStyle}
                        boxStyle={[styles.boxStyle, activeTab === "Indirect" ? styles.backgroundGrey : styles.backgroundWhite]}
                        onPress={this.props.setDataToRaksha} />
                </View> */}
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.bwmList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.bwmList.length && this.props.isInternetConnected ?
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

BodyWeightMgmtListing.propTypes = propTypes;

BodyWeightMgmtListing.defaultProps = defaultProps;

export default BodyWeightMgmtListing;
