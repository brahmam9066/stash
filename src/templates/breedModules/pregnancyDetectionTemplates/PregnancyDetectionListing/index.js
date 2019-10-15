import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image, Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {Icon} from "react-native-elements";

import FlatListItem from "../../../../components/FlatListItem";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import Toolbar from "../../../../components/Toolbar";
import Footer from "../../../../components/Footer";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons, offlineIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    handlePressPd: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    PDList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    isPaidUser: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    handlePressPd: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    PDList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    isPaidUser: false
};

class PregnancyDetectionListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    onPressOfflinePD = (offlinePDDetails) => {
        navigateTo("recordPD", {offlinePDDetails, comingFrom: "pdOfflineList"});
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
        const {language} = this.props
        console.log("item in pdlisting",item);
        return (
            <FlatListItem
                onLongPress={()=>{this.deleteOfflineRecord(item._id)}}
                iconStyle={styles.imageStyle}
                onPress={() => this.onPressOfflinePD(item)}>
                <View style={styles.flatStyle}>
                <View style={{flexDirection:'row'}}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                        </Text>{item.insemination.cattle.stellaCode}
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
                        {I18n.t('pdCheckDatePDListing', {locale:language})}
                        </Text>{item.actualDate && moment(item.actualDate.slice(0, 10)).format("DD-MM-YYYY")}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                       {I18n.t('resultPDListing', {locale:language})}
                        </Text>{item.result}
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
                        <Text style={{color:'#3EA73A',fontSize:12}}>
                        {I18n.t('syncError', {locale:language})}
                        </Text>
                    </View>
                }
            </FlatListItem>
        );
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        return (
            <FlatListItem
                iconStyle={styles.imageStyle}
                onPress={() => this.props.handlePressPd(item)}>
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
                        {I18n.t('pdCheckDatePDListing', {locale:language})}
                        </Text>{item.actualDate && moment(item.actualDate.slice(0, 10)).format("DD-MM-YYYY")}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                       {I18n.t('resultPDListing', {locale:language})}
                        </Text>{item.result}
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

    render() {
        const {language} = this.props
        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    comingFromForScan="pregnancyDetectionListingScreen" 
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
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.pdOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>    
                        <FlatList
                            data={this.props.PDList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.PDList.length && this.props.isInternetConnected ?
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

PregnancyDetectionListing.propTypes = propTypes;

PregnancyDetectionListing.defaultProps = defaultProps;

export default PregnancyDetectionListing;
