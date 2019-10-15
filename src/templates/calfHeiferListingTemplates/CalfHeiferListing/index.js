import React, {Component} from "react";
import {View, ScrollView, FlatList, Text, Image, Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../components/Toolbar";
import Box from "../../../components/Box";
import SubText from "../../../components/SubText";
import Footer from "../../../components/Footer";
import {navigateTo} from "../../../utils/utility";
import {noResultsIcons} from "../../../assets";
import FlatListItem from "../../../components/FlatListItem";
import SearchBar from "../../../components/SearchBar";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    data: PropTypes.any,
    isPaidUser: PropTypes.bool,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    handleResetAllData: PropTypes.func,
    handleSetDataToCalf: PropTypes.func,
    handleSetDataToHeifer: PropTypes.func,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    data: [],
    isPaidUser: false,
    handleSearch: () => {},
    searchList: () => {},
    handleSearchItemPress: () => {},
    handleResetAllData: () => {},
    handleSetDataToCalf: () => {},
    handleSetDataToHeifer: () => {},
    handleViewLayout: () => {},
    handleListScroll: () => {}
};

class CalfHeiferListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    onPressOfflineCalfBirth = (offlinecalfBirthDetails) => {
        navigateTo("calfBirth", {offlinecalfBirthDetails, comingFrom: "calfBirthOfflineList"});
    }

    deleteOfflineRecord = (id)=>{
        Alert.alert(
            '',
            'Do you really want to delete this record ?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.props.handleDeleteOfflineItem(id)},
            ],
            {cancelable: false},
          );
    }

    _renderOfflineItem = ({item}) => {
        return (
            <FlatListItem onPress={() => this.onPressOfflineCalfBirth(item)} onLongPress={()=>{this.deleteOfflineRecord(item._id)}} iconStyle={styles.imageStyle}>
                <View style={styles.flatStyle}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>Registration ID :  </Text>{item.offlineRegId}
                    </Text>
                    <View>
                        <SubText
                            text="Date"
                            value={moment(item.dob).format("DD-MM-YYYY") ? moment(item.dob).format("DD-MM-YYYY") : ""}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                        <SubText
                            text="Type"
                            value={item.pregnancyType ? item.pregnancyType : ""}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                    </View>
                </View>
            </FlatListItem>
        );
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        if (this.props.activeTab === "All" || this.props.activeTab === "Calf" || this.props.activeTab === "Heifer" || this.props.activeTab === item.breedingState) {
            return (
                <FlatListItem onPress={() => navigateTo("calfHeiferDetails", {comingFrom: "calfHeiferListing", item})} iconStyle={styles.imageStyle}>
                    <View style={styles.flatStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text>{item.stellaCode}
                        </Text>
                        <View>
                            <SubText
                               text= {I18n.t('date', {locale:language})}
                                value={moment(item.dob).format("DD-MM-YYYY") ? moment(item.dob).format("DD-MM-YYYY") : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <SubText
                                text= {I18n.t('type', {locale:language})}
                                value={item.breedingState ? item.breedingState : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                        {this.props.isPaidUser &&
                        <View>
                            <SubText
                                text={item.reportingOrg.orgType ? item.reportingOrg.orgType : ""}
                                value={item.reportingOrg.stellaCode ? item.reportingOrg.stellaCode : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <SubText
                                text= {I18n.t('farmer', {locale:language})}
                                value={item.org.stellaCode ? item.org.stellaCode : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                        }
                    </View>
                </FlatListItem>
            );
        }
        return null;
    }

    render() {
        const {data,language} = this.props;
        const {activeTab} = this.props;
        let calf = "";
        let heifer = "";

        if (data && data.length > 0) {
            calf = data.filter((item) => {
                return (item.lactationState && item.breedingState.toLowerCase() === "calf");
            });

            heifer = data.filter((item) => {
                return (item.lactationState && item.breedingState.toLowerCase() === "heifer");
            });
        }
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
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.boxViewContainer}>
                        <Box
                            text= {I18n.t('all', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.handleResetAllData} />
                        <Box
                            text= {I18n.t('calf', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "Calf" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.handleSetDataToCalf} />
                        <Box
                            text= {I18n.t('heifer', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "Heifer" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.handleSetDataToHeifer} />
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.calfBirthOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.data}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.data.length && this.props.isInternetConnected ?
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

CalfHeiferListing.propTypes = propTypes;

CalfHeiferListing.defaultProps = defaultProps;


export default CalfHeiferListing;
