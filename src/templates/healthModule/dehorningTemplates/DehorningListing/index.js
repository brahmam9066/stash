import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image,Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {Icon} from "react-native-elements";

import FlatListItem from "../../../../components/FlatListItem";
import Toolbar from "../../../../components/Toolbar";
import Box from "../../../../components/Box";
import Footer from "../../../../components/Footer";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons,offlineIcons,animalListIcons} from "../../../../assets";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    treatmentList: PropTypes.array,
    handlePressDehorning: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    dehorningList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    changeActiveTab: PropTypes.func,
    activeTab: PropTypes.string,
    isPaidUser:PropTypes.bool,
    permissionsToCreate: PropTypes.bool,
    dehorningOfflineList: PropTypes.array,
    medicineList: PropTypes.array,
    handlePressOfflineDehorning: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    treatmentList: [],
    handlePressDehorning: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    dehorningList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    changeActiveTab: () => {},
    activeTab: "Paste",
    isPaidUser: false,
    permissionsToCreate: false,
    dehorningOfflineList: [],
    medicineList: [],
    handlePressOfflineDehorning: () => {}
};

class DehorningListing extends Component {

    _keyExtractor = () => {
        return this.createRandomId();
    }

    _getNameFromId = (id) => {
        const medicine = this.props.medicineList.filter((item) => {
            return item.id === id;
        });
        if (medicine && medicine.length > 0) {
            return medicine[0].medicineName;
        }
        return undefined;
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
        if (this.props.activeTab === "Paste") {
            return (
                <TouchableOpacity onLongPress={()=>{this.deleteOfflineRecord(item._id)}}  style={{}} onPress={() => this.props.handlePressOfflineDehorning(item)}>
                    <View style={{flexDirection:'row',borderBottomWidth: 1,borderBottomColor: "#cccccc",alignItems: "center",padding: 10,marginHorizontal: 12,}}>
                        <View style={{}}>
                            <Image style={[styles.defaultIconDimensions, { width: 70,height:70}]} source={animalListIcons.iconCattleListing} />
                        </View>
                        <View style={{paddingLeft:30}}>
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
                                    <Image source={offlineIcons.iconOffline} style={{height:19,width:30}}  />
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
                            <Text style={styles.headingStyle}>Medicine :  </Text>
                            {(item.prescriptions && item.prescriptions.length > 0 && item.prescriptions[0].medicine) ? this._getNameFromId(item.prescriptions[0].medicine.id) : item.prescriptions[0].medicineName}
                        </Text>
                        </View>
                        <View style={{position:'absolute',right:0}}>
                            <View style={{}}>
                                <Icon
                                    name="chevron-right"
                                    type="material-community"
                                    color="#f0494f"
                                    size={this.props.rightIconSize}
                                />
                            </View>
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
                        
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    };


    _renderItem = ({item}) => {
        const {language}=this.props
        const date = item.treatmentDate;
        const treatmentDate = moment(date).format("DD-MM-YYYY");
        if (this.props.activeTab === "Paste") {
            return (
                <FlatListItem
                    iconStyle={styles.imageStyle}
                    onPress={() => this.props.handlePressDehorning(item)}>
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
                        {/* <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>Medicine :  </Text>
                            {(item.prescriptions && item.prescriptions.length > 0 && item.prescriptions[0].medicine) ? item.prescriptions[0].medicine.medicineName : ""}
                        </Text> */}
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
    };

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
                    handleSearchItemPress={this.props.handleSearchItemPress}
                    comingFromForScan="dehorningListingScreen" 
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.linkView}>
                        <TouchableOpacity disabled={!this.props.permissionsToCreate} onPress={this.props.handleCreateNew} style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                            <Text style={styles.linkTextStyle}><Text>+</Text> Create New</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.dehorningOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.dehorningList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.dehorningList.length && this.props.isInternetConnected ?
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

DehorningListing.propTypes = propTypes;

DehorningListing.defaultProps = defaultProps;

export default DehorningListing;
