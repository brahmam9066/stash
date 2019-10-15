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
    handlePressMilkLog: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    milkLogList: PropTypes.array,
    activeTab: PropTypes.string,
    setSession: PropTypes.func,
    handleListScroll: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    handleCreateNew: () => { },
    handlePressMilkLog: () => { },
    handleSearch: () => { },
    searchList: [],
    handleSearchItemPress: () => { },
    milkLogList: [],
    activeTab: "ALL",
    setSession: () => {},
    handleListScroll: () => {}
};

class MilkLogListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        return (
            <FlatListItem
                iconStyle={styles.imageStyle}
                // leftIconContainer={styles.leftIconContainer}
                onPress={() => this.props.handlePressMilkLog(item)}>
                <View style={styles.flatStyle}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                        </Text> {item.cattle ? item.cattle.stellaCode : null}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('dateTimeColonbar', {locale:language})}
                        </Text> {
                            item.collectedOn ? moment(item.collectedOn).format("DD MMM YYYY") : ""
                        }
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('quantityColon', {locale:language})}
                        </Text> {item.quantity}
                    </Text>
                </View>
            </FlatListItem>
        );
    }

    render() {
        const {activeTab, milkLogList, language} = this.props;
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
                    language={language}/>
                <View style={styles.filterViewContainer}>
                    <View style={styles.linkView}>
                        <TouchableOpacity onPress={this.props.handleCreateNew} style={styles.linkStyle}>
                            <Text style={styles.linkTextStyle}><Text>+</Text> 
                           {I18n.t('createNew', {locale:language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxViewContainer}>
                        <Box
                            text={I18n.t('all', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "ALL" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={() => this.props.setSession("ALL")} />
                        <Box
                            text={I18n.t('morning', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "MORNING" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={() => this.props.setSession("MORNING")} />
                        <Box
                            text={I18n.t('afternoon', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "AFTERNOON" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={() => this.props.setSession("AFTERNOON")} />
                        <Box
                            text={I18n.t('evening', {locale:language})}
                            textStyle={styles.boxTextStyle}
                            boxStyle={[styles.boxStyle, activeTab === "EVENING" ? styles.backgroundGrey : styles.backgroundWhite]}
                            onPress={() => this.props.setSession("EVENING")} />
                    </View>
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={milkLogList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!milkLogList.length ?
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

MilkLogListing.propTypes = propTypes;

MilkLogListing.defaultProps = defaultProps;

export default MilkLogListing;
