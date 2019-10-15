import React, {Component} from "react";
import {View, ScrollView, FlatList, Text, Image, Alert} from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";

import {animalListIcons, noResultsIcons, offlineIcons} from "../../../assets";
import Toolbar from "../../../components/Toolbar";
import Filter from "../../../components/Filter";
import PageLoadError from "../../../components/PageLoadError";
import Footer from "../../../components/Footer";
import FlatListItem from "../../../components/FlatListItem";
import SearchBar from "../../../components/SearchBar";
import {navigateTo} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

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
    isPaidUser: PropTypes.bool
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
    isPaidUser: false
};

class AnimalListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderImage = (item) => {
        let component = <View />;
        if (item.lactationState && item.lactationState.toLowerCase() === "milking") {
            component = <Image style={styles.flatRowImageStyle} source={animalListIcons.iconMilking} resizeMode="contain"/>;
        } else if (item.lactationState && item.lactationState.toLowerCase() === "dry off") {
            component = <Image style={styles.flatRowImageStyle} source={animalListIcons.iconDryoff} resizeMode="contain"/>;
        }
        return component;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        if (this.props.activeTab === "All" || this.props.activeTab === "Milking" || this.props.activeTab === "Dryoff" || this.props.activeTab === item.Lactation) {
            return (
                <FlatListItem onPress={() => navigateTo("cattleDetails", {selectedAnimalDetails: item})} iconStyle={styles.imageStyle}>
                    <View>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text>{item.stellaCode}
                        </Text>
                        <View style={styles.flatRowStyle}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.titleStyle}>
                                <Text style={styles.headingStyle}>
                            {I18n.t('lactationAnimalListing', {locale:language})}
                                </Text>{item.lactationState}
                            </Text>
                            {this._renderImage(item)}
                        </View>
                        {this.props.isPaidUser &&
                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titleOrgStyle}>
                                    <Text style={styles.headingStyle}>{item.reportingOrg.orgType} :  </Text> {item.reportingOrg.stellaCode}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titleOrgStyle}>
                                    <Text style={styles.headingStyle}>
                                   {I18n.t('farmerAnimalListing', {locale:language})}
                                    </Text> {item.org.stellaCode}
                                </Text>
                            </View>
                        }
                    </View>
                </FlatListItem>
            );
        }
        return null;
    }

    handlePressOfflineList = (item)=>{
        navigateTo("profileInformation",{comingFromOffline:"cattleRegistrationOfflineList",item})
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
        console.log("item",item);
        const {language} = this.props
            return (
                <FlatListItem onPress={() => {this.handlePressOfflineList(item)}} onLongPress={()=>{this.deleteOfflineRecord(item._id)}} iconStyle={styles.imageStyle}>
                    <View>
                    <View style={styles.flatRowStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            </Text>{item.stellaCode}
                        </Text>
                        {
                            !this.props.isInternetConnected &&
                            <View>
                                <Image source={offlineIcons.iconOffline} style={{height: 19, width: 30}} />
                            </View>
                        }
                        </View>
                        <View style={styles.flatRowStyle}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.titleStyle}>
                                <Text style={styles.headingStyle}>
                            {I18n.t('lactationAnimalListing', {locale:language})}
                                </Text>{item.lactationState}
                            </Text>
                            {this._renderImage(item)}
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
                </FlatListItem>
            );
    }

    render() {
        const {data} = this.props;
        const {language} = this.props;
        const {activeTab} = this.props;
        let dry = "";
        let milking = "";

        if (data && data.length > 0) {
            dry = data.filter((item) => {
                return (item.lactationState && item.lactationState.toLowerCase() === "dry off");
            });

            milking = data.filter((item) => {
                return (item.lactationState && item.lactationState.toLowerCase() === "milking");
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
                    language={language}
                />
                <View style={styles.filterViewContainer}>
                    {!data && <PageLoadError errorText="Error ! Page loading from server" />}
                    <View style={styles.filterBoxStyle}>
                        <Filter
                            iconUsermooOn={animalListIcons.iconTotal}
                            text="All"
                            textStyle={styles.textStyle}
                            boxImageStyle={styles.boxImageStyle}
                            boxStyle={[styles.boxStyle, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.handleSetAllData}
                            ImageStyle={styles.boxContainerImageStyle} />
                        <Filter
                            iconUsermooOn={animalListIcons.iconMilkingFilter}
                            count={milking.length}
                            text="Milking"
                            textStyle={styles.textStyle}
                            boxImageStyle={styles.boxImageStyle}
                            boxStyle={[styles.boxStyle, activeTab === "Milking" ? styles.backgroundGrey : styles.backgroundWhite]}
                            ImageStyle={styles.boxContainerImageStyle}
                            onPress={this.props.handleSetDataToMilking}
                        />
                        <Filter
                            iconUsermooOn={animalListIcons.iconMilkingFilter}
                            count={dry.length}
                            text="Dryoff"
                            textStyle={styles.textStyle}
                            boxImageStyle={styles.boxImageStyle}
                            boxStyle={[styles.boxStyle, activeTab === "Dryoff" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={this.props.handleSetDataToDry}
                            ImageStyle={styles.boxContainerImageStyle} />
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.cattleOfflineRegistration}
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
                            ListEmptyComponent={() => (!this.props.data.length && this.props.isInternetConnected?
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

AnimalListing.propTypes = propTypes;

AnimalListing.defaultProps = defaultProps;

export default AnimalListing;
