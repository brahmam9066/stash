import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image, Alert} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {Icon} from "react-native-elements";

import FlatListItem from "../../../../components/FlatListItem";
import Toolbar from "../../../../components/Toolbar";
import Footer from "../../../../components/Footer";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons,offlineIcons} from "../../../../assets";
import {navigateTo} from "../../../../utils/utility";
import I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    AIList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    handlePressAI: PropTypes.func,
    isPaidUser: PropTypes.bool,
    permissionsToModify: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleCreateNew: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    AIList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    handlePressAI: () => {},
    isPaidUser: false,
    permissionsToModify: false
};


class ArtificialInseminationListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    onPressOfflineAI = (offlineAIDetails) => {
        navigateTo("recordAI", {offlineAIDetails, comingFrom: "aiOfflineList"});
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
        return(
        <FlatListItem
            onLongPress={()=>{this.deleteOfflineRecord(item._id)}}
            iconStyle={styles.imageStyle}
            onPress={() => this.onPressOfflineAI(item)}>
            <View style={styles.flatStyle}>
                <View style={{flexDirection:'row'}}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                        </Text>{item.cattle.stellaCode}
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
                    {I18n.t('aiDateListing', {locale:language})}
                    </Text>{item.inseminationDate && moment(item.inseminationDate).format("DD-MM-YYYY")}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.titleStyle}>
                    <Text style={styles.headingStyle}>
                    {I18n.t('typeAIListing', {locale:language})}
                    </Text>{item.inseminationType}
                </Text>
                {/* {this.props.isPaidUser &&
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
                            <Text style={styles.headingStyle}>Farmer :  </Text>{item.cattle.org.stellaCode}
                        </Text>
                    </View>
                } */}
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
        )
            }

    _renderItem = ({item}) => {
        const {language} = this.props
       console.log("renderITEMAI", language);
return(
        <FlatListItem
            iconStyle={styles.imageStyle}
            onPress={() => this.props.handlePressAI(item)}>
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
                    {I18n.t('aiDateListing', {locale:language})}
                    </Text>{item.inseminationDate && moment(item.inseminationDate).format("DD-MM-YYYY")}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.titleStyle}>
                    <Text style={styles.headingStyle}>
                    {I18n.t('typeAIListing', {locale:language})}
                    </Text>{item.inseminationType}
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
    };

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
                    comingFromForScan="aiListingScreen" 
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
                            data={this.props.aiOfflineList}
                            renderItem={this._renderOfflineItem}
                            keyExtractor={this._keyExtractor}
                            extraData={this.props.isInternetConnected}
                        />
                    </View>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.AIList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!this.props.AIList.length && this.props.isInternetConnected ?
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

ArtificialInseminationListing.propTypes = propTypes;

ArtificialInseminationListing.defaultProps = defaultProps;

export default ArtificialInseminationListing;
