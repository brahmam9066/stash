import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image, Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {Icon} from "react-native-elements";

import FlatListItem from "../../../../components/FlatListItem";
import Filter from "../../../../components/Filter";
import Toolbar from "../../../../components/Toolbar";
import Box from "../../../../components/Box";
import Footer from "../../../../components/Footer";
import {navigateTo} from "../../../../utils/utility";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons, offlineIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    handlePressVaccine: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    vaccinationList: PropTypes.array,
    handleListScroll: PropTypes.func,
    handleViewLayout: PropTypes.func,
    resetAllData: PropTypes.func,
    setDataToRaksha: PropTypes.func,
    setDataToGovt: PropTypes.func,
    isPaidUser: PropTypes.bool,
    permissionsToCreate: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    handlePressVaccine: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    vaccinationList: [],
    handleListScroll: () => {},
    handleViewLayout: () => {},
    resetAllData: () => {},
    setDataToRaksha: () => {},
    setDataToGovt: () => {},
    isPaidUser: false,
    permissionsToCreate: false
};

class VaccinationListing extends Component {

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
        const date = item.treatmentDate;
        const treatmentDate = moment(date).format("DD-MM-YYYY");
        const {language}=this.props
        return (
            <FlatListItem
                onLongPress={()=>{this.deleteOfflineRecord(item._id)}}
                iconStyle={styles.imageStyle}
                onPress={() => this.props.onPressOfflineVaccine(item)}>
                <View style={styles.flatStyle}>
                    <View style={{flexDirection: "row"}}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text>{item.cattle ? item.cattle.stellaCode : ""}
                        </Text>
                        {
                            !this.props.isInternetConnected &&
                            <View>
                                <Image source={offlineIcons.iconOffline} style={{height: 19, width: 30}} />
                            </View>
                        }
                    </View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('dateObservationListing', {locale:language})}
                        </Text>{treatmentDate}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('vaccinationListing', {locale:language})}
                        </Text>{item.prescriptions ? item.prescriptions[0].medicine ?item.prescriptions[0].selectedMedicineoffline : item.prescriptions[0].medicineName : ""}
                    </Text>
                </View>
                {
                    this.props.isInternetConnected &&
                    <View style={{flexDirection: "row", position: "absolute", right: 0, top: 10, justifyContent: "flex-start"}}>
                        <Icon
                            name="sync"
                            type="material-community"
                            color="#3EA73A"
                            size={14}
                        />
                        <Text style={{color: "#3EA73A", fontSize: 12}}>Sync Error</Text>
                    </View>
                }
            </FlatListItem>
        );
    };

    _renderItem = ({item}) => {
        const treat = item.treatmentDate;
        const {language} = this.props
        const treatmentDate = moment(treat).format("DD-MM-YYYY");
        if (this.props.activeTab === "All" || this.props.activeTab === "Raksha Biovac" || this.props.activeTab === "Govt. Futvac" || this.props.activeTab === item.breedingState) {
            return (
                <FlatListItem
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressVaccine(item)}>
                    <View style={styles.flatStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text>{item.cattle.stellaCode}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                          <Text style={styles.headingStyle}>
                           {I18n.t('dateObservationListing', {locale:language})}
                         </Text>{treatmentDate}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('vaccinationListing', {locale:language})}
                        </Text>{item.prescriptions ? item.prescriptions[0].medicineName[0].toUpperCase() + item.prescriptions[0].medicineName.slice(1).toLowerCase() : ""}
                        </Text>
                        {this.props.isPaidUser &&
                            <View>
                                {
                                    item.cattle.reportingOrg && item.cattle.reportingOrg.orgType ?
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={styles.titleStyle}>
                                            <Text style={styles.headingStyle}>{item.cattle.reportingOrg.orgType} :  </Text>{item.cattle.reportingOrg.stellaCode}
                                        </Text>
                                        : null
                                }
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titleStyle}>
                                    <Text style={styles.headingStyle}>Farmer :  </Text>{item.cattle.org ? item.cattle.org.stellaCode : ""}
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
        const {activeTab, language} = this.props;
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
                    comingFromForScan="vaccinationListingScreen" 
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.linkView}>
                        <TouchableOpacity disabled={!this.props.permissionsToCreate} onPress={this.props.handleCreateNew} style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                            <Text style={styles.linkTextStyle}><Text>+</Text> 
                            {I18n.t('createNew', {locale:language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filterBoxStyle}>
                        <Filter
                            text= {I18n.t('all', {locale:language})}
                            textStyle={styles.textStyle}
                            // boxStyle={[styles.boxStyle, styles.boxBorderNoRight, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}                            
                            onPress={this.props.resetAllData} />
                        <Filter
                            text= {I18n.t('rakshaBiovac', {locale:language})}
                            textStyle={styles.textStyle}
                            //boxStyle={[styles.boxStyle, activeTab === "Raksha Biovac" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "Raksha Biovac" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.setDataToRaksha} />
                        <Filter
                            text= {I18n.t('rakshaFMD', {locale:language})}
                            textStyle={styles.textStyle}
                            //boxStyle={[styles.boxStyle, styles.boxBorderNoLeft, activeTab === "Govt. Futvac" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "Govt. Futvac" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.setDataToGovt} />
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.vaccinationOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.vaccinationList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.vaccinationList.length && this.props.isInternetConnected ?
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

VaccinationListing.propTypes = propTypes;

VaccinationListing.defaultProps = defaultProps;

export default VaccinationListing;
