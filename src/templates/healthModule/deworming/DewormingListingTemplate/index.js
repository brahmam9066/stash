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
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons, offlineIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleCreateNew: PropTypes.func,
    dewormingList: PropTypes.array,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    changeActiveTab: PropTypes.func,
    activeTab: PropTypes.string,
    handleListScroll: PropTypes.func,
    handleViewLayout: PropTypes.func,
    isPaidUser: PropTypes.bool,
    permissionsToCreate: PropTypes.bool,
    dewormingOfflineList: PropTypes.array,
    handlePressOfflineDeworming: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    handleCreateNew: () => { },
    dewormingList: [],
    handleSearch: () => { },
    searchList: [],
    handleSearchItemPress: () => { },
    activeTab: "Endo",
    changeActiveTab: () => { },
    handleListScroll: () => {},
    handleViewLayout: () => {},
    isPaidUser: false,
    permissionsToCreate: false,
    dewormingOfflineList: [],
    handlePressOfflineDeworming: () => {}
};

class DewormingListing extends Component {

    state = {
        data: []
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.dewormingList
        });
    }

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

    _getNameFromId = (id) => {
        const medicine = this.props.medicineList.filter((item) => {
            return item.id === id;
        });
        if (medicine && medicine.length > 0) {
            return medicine[0].medicineName;
        }
        return undefined;
    }

    _renderOfflineItem = ({item}) => {
        const {language} = this.props
        const date = item.treatmentDate;
        const treatmentDate = moment(date).format("DD-MM-YYYY");
        return (
            <FlatListItem
                onLongPress={()=>{this.deleteOfflineRecord(item._id)}}
                id="deworming-offline-list-item-button"
                iconStyle={styles.imageStyle}
                onPress={() => this.props.handlePressOfflineDeworming(item)}>
                <View style={styles.flatStyle}>
                    <View style={{flexDirection: "row"}}>
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
                        {I18n.t('dateObservationListing', {locale:language})}
                        </Text>{treatmentDate}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('wormDewormingListing', {locale:language})}
                        </Text>{item.worm}
                        {/* {(item.prescriptions && item.prescriptions.length > 0 && item.prescriptions[0].medicine) ? this._getNameFromId(item.prescriptions[0].medicine.id) : ""} */}
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
          const {language} = this.props
          const date = item.treatmentDate;
          const treatmentDate = moment(date).format("DD-MM-YYYY");
          if (this.props.activeTab === "All" || this.props.activeTab === item.worm) {
              return (
                  <FlatListItem
                      id="deworming-offline-list-item-button"
                      iconStyle={styles.imageStyle}
                      onPress={() => { this.props.handlePressDeworming(item); }}>
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
                              {I18n.t('dateObservationListing', {locale:language})}
                              </Text>{treatmentDate}
                          </Text>
                          <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={styles.titleStyle}>
                              <Text style={styles.headingStyle}>
                              {I18n.t('wormDewormingListing', {locale:language})}
                              </Text>{item.worm}
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
                      handleSearchItemPress={this.props.handleSearchItemPress} 
                      comingFromForScan="dewormingListingScreen" 
                      language={language}/>
                  <View style={[styles.filterViewContainer]}>
                      <View style={styles.linkView}>
                          <TouchableOpacity disabled={!this.props.permissionsToCreate} onPress={this.props.handleCreateNew} style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}>
                              <Text style={styles.linkTextStyle}><Text>+</Text> Create New</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.filterBoxStyle}>
                          <Filter
                              text="All"
                              textStyle={styles.textStyle}
                            //  boxStyle={[styles.boxStyle, styles.boxBorderNoRight, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}
                              boxStyle={[styles.boxStyle, activeTab === "All" ? styles.backgroundGrey : styles.backgroundWhite]}                            
                            //   onPress={() => this.props.changeActiveTab("All")} />
                                onPress={this.props.resetAllData} />
                          <Filter
                              text="Endo"
                              textStyle={styles.textStyle}
                            //  boxStyle={[styles.boxStyle, activeTab === "Endo" ? styles.backgroundGrey : styles.backgroundWhite]}
                            boxStyle={[styles.boxStyle, activeTab === "Endo" ? styles.backgroundGrey : styles.backgroundWhite]}
                              onPress={() => this.props.changeActiveTab("Endo")} />
                          <Filter
                              text="Ecto"
                              textStyle={styles.textStyle}
                              boxStyle={[styles.boxStyle, activeTab === "Ecto" ? styles.backgroundGrey : styles.backgroundWhite]}
                             // boxStyle={[styles.boxStyle, styles.boxBorderNoLeft, activeTab === "Ecto" ? styles.backgroundGrey : styles.backgroundWhite]}
                              onPress={() => this.props.changeActiveTab("Ecto")} />
                      </View>
                  </View>
                  <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                      <View style={styles.listViewContainer}>
                          <FlatList
                              data={this.props.dewormingOfflineList}
                              renderItem={this._renderOfflineItem}
                              keyExtractor={this._keyExtractor}
                              extraData={this.props.isInternetConnected}
                          />
                      </View>
                      <View style={[styles.listViewContainer, styles.marginTop20]}>
                          <FlatList
                              data={this.props.dewormingList}
                              renderItem={this._renderItem}
                              keyExtractor={this._keyExtractor}
                              ListEmptyComponent={() => (!this.props.dewormingList.length && this.props.isInternetConnected ?
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

DewormingListing.propTypes = propTypes;

DewormingListing.defaultProps = defaultProps;


export default DewormingListing;
