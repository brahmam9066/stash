import React, {Component} from "react";
import {View, ScrollView, TouchableOpacity, Text, FlatList, Image} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import FlatListItem from "../../../../components/FlatListItem";
import Toolbar from "../../../../components/Toolbar";
import Footer from "../../../../components/Footer";
import SearchBar from "../../../../components/SearchBar";
import {noResultsIcons} from "../../../../assets";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    calfBirthList: PropTypes.array,
    handleViewLayout: PropTypes.func,
    handleListScroll: PropTypes.func,
    handlePressCalfBirth: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    calfBirthList: [],
    handleViewLayout: () => {},
    handleListScroll: () => {},
    handlePressCalfBirth: () => {}
};

class CalfBirthListing extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        return(
        <FlatListItem
            iconStyle={styles.imageStyle}
            onPress={() => this.props.handlePressCalfBirth(item)}>
            <View style={styles.flatStyle}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.titleStyle}>
                    <Text style={styles.headingStyle}>
                    {I18n.t('damIDCalfBirthListing', {locale:language})}
                    </Text>{item.mother ? item.mother.stellaCode : ""}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.titleStyle}>
                    <Text style={styles.headingStyle}>
                    {I18n.t('deliveryDateListing', {locale:language})}
                    </Text>{moment(item.dob).format("DD-MM-YYYY")}
                </Text>
            </View>
        </FlatListItem>
        );
    };

    render() {
        const {calfBirthList,language} = this.props;
        return (
            <View style={styles.mainContainer}>
                <View onLayout={this.props.handleViewLayout} style={styles.layoutView}>
                    <Toolbar
                        leftIconName="arrow-left"
                        onPressLeftIcon={this.props.onbackPress}
                        title={this.props.toolbarTitle} />
                    <SearchBar
                        handleSearch={this.props.handleSearch}
                        searchList={this.props.searchList}
                        handleSearchItemPress={this.props.handleSearchItemPress} 
                        language={language}/>
                    {/* <View style={styles.filterViewContainer}>
                        <View style={styles.linkView}>
                            <TouchableOpacity onPress={this.props.handleCreateNew} style={styles.linkStyle}>
                                <Text style={styles.linkTextStyle}><Text>+</Text> Create New</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </View>
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={calfBirthList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!calfBirthList.length ?
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

CalfBirthListing.propTypes = propTypes;

CalfBirthListing.defaultProps = defaultProps;

export default CalfBirthListing;
