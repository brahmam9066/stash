import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image, Dimensions, Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {Icon} from "react-native-elements";

import FlatListItem from "../../../../components/FlatListItem";
import Filter from "../../../../components/Filter";
import Toolbar from "../../../../components/Toolbar";
import Box from "../../../../components/Box";
import Footer from "../../../../components/Footer";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons,offlineIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    treatmentList: PropTypes.array,
    handlePressTreatment: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    resetAllData: PropTypes.func,
    setDataToFmd: PropTypes.func,
    setDataToMastitis: PropTypes.func,
    handleListScroll: PropTypes.func,
    handleViewLayout: PropTypes.func,
    isPaidUser: PropTypes.bool,
    permissionsToModify: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    treatmentList: [],
    handlePressTreatment: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    resetAllData: () => {},
    setDataToFmd: () => {},
    setDataToMastitis: () => {},
    handleListScroll: () => {},
    handleViewLayout: () => {},
    isPaidUser: false,
    permissionsToModify: false
};

class ObservationListing extends Component {

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

    _renderItem = ({item}) => {
        const {language} = this.props;
        console.log("language observationListing", language);
        const treat = item.treatmentDate;
        const treatmentDate = moment(treat).format("DD-MM-YYYY");
        if (this.props.activeTab === "All" || this.props.activeTab === "FMD" || this.props.activeTab === "Mastitis" || this.props.activeTab === item.breedingState) {
            return (
                <FlatListItem
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressTreatment(item)}>
                    <View>
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
                            {I18n.t('diagnosisObservationListing', {locale:language})}
                            </Text>{item.diagnosis}
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

    _renderOfflineItem = ({item}) => {
        const treat = item.treatmentDate;
        const treatmentDate = moment(treat).format("DD-MM-YYYY");
            return (
                <FlatListItem
                    onLongPress={()=>{this.deleteOfflineRecord(item._id)}}
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressOfflineObservation(item)}>
                    <View>
                        <View style={{flexDirection:'row'}}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Registration ID :  </Text>{item.cattle.stellaCode}
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
                            <Text style={styles.headingStyle}>Date :  </Text>{treatmentDate}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Diagnosis :  </Text>{item.diagnosis}
                        </Text>
                    </View>
                    {
                this.props.isInternetConnected &&
                    <View style={{flexDirection:'row',position:'absolute',right:0,top:10,justifyContent:'flex-start'}}>
                                <Icon
                            name="sync"
                            type="material-community"
                            color='#3EA73A'
                            size={14}
                        />
                        <Text style={{color:'#3EA73A',fontSize:12}}>Sync Error</Text>
                    </View>
                }
                </FlatListItem>
            );
    }

    render() {
        const {data, language} = this.props;
        const {activeTab} = this.props;
        let fmd = "";
        let mastitis = "";

        if (data && data.length > 0) {
            calf = data.filter((item) => {
                return (item.diagnosis && item.diagnosis.toLowerCase() === "fmd");
            });

            heifer = data.filter((item) => {
                return (item.diagnosis && item.diagnosis.toLowerCase() === "mastitis");
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
                    comingFromForScan="observationListingScreen"                    
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.linkView}>
                        <TouchableOpacity disabled={!this.props.permissionsToCreate} onPress={this.props.handleCreateNew} style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                            <Text style={styles.linkTextStyle}><Text>+</Text> Create New</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filterBoxStyle}>
                        <Filter
                            text="All"
                            textStyle={styles.textStyle}
                            //boxStyle={[styles.boxStyle, styles.boxBorderNoRight, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.resetAllData} />
                        <Filter
                            text="FMD"
                            textStyle={styles.textStyle}
                           // boxStyle={[styles.boxStyle, activeTab === "FMD" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "FMD" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.setDataToFmd} />
                        <Filter
                            text="Mastitis"
                            textStyle={styles.textStyle}
                            //boxStyle={[styles.boxStyle, styles.boxBorderNoLeft, activeTab === "Mastitis" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "Mastitis" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.setDataToMastitis} />
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.observationOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.treatmentList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.treatmentList.length && this.props.isInternetConnected ?
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

ObservationListing.propTypes = propTypes;

ObservationListing.defaultProps = defaultProps;

export default ObservationListing;
