import React from "react";
import {View, Text, ScrollView, FlatList, TouchableOpacity,Image} from "react-native";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SearchBar from "../../../../components/SearchBar";
// import Box from "../../../../components/Box";
import Footer from "../../../../components/Footer";
import SubText from "../../../../components/SubText";
import {noResultsIcons, offlineIcons} from "../../../../assets";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    animalDetails: PropTypes.object,
    handleSearch: PropTypes.func,
    rightIconSize: PropTypes.number,
    handlePressList: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    pregnancyList: PropTypes.array
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    animalDetails: {},
    handleSearch: () => {},
    rightIconSize: 28,
    handlePressList: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    pregnancyList: []
};

class PregnancyHistoryList extends React.Component {

    handlePressList = (item) => {
        console.log("item in list", item);
        this.props.handlePressList(item);
    }

    _renderSeperator = () => {
        return (
            <View style={styles.itemseperator} />
        );
    }

    _renderItem = ({item}) => {

        return (
            <TouchableOpacity onPress={() => { this.handlePressList(item); }}>
                <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                        <SubText
                            text="Parity"
                            value={item.pregnancyParity ? item.pregnancyParity : ""}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                        <SubText
                            text="Duration"
                            value={(item.fromDate ? moment(item.fromDate).format("DD-MMM-YYYY") : "")
                                      + " to " + (item.toDate ? moment(item.toDate).format("DD-MMM-YYYY") : "")}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                        <SubText
                            text="No. of Calves"
                            value={item.children ? item.children.length : "0"}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                        <SubText
                            text="Status"
                            value={item.result ? item.result : ""}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelstyle}
                        />
                    </View>
                    <View style={styles.itemRightIconContainer}>
                        <Icon
                            name="chevron-right"
                            type="material-community"
                            color="#f0494f"
                            size={this.props.rightIconSize}
                        />
                    </View>
                </View>
            </TouchableOpacity>
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
                {/* <SearchBar
                    handleSearch={this.props.handleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.props.handleSearchItemPress} 
                    language={language}/> */}
                <View style={styles.filterViewContainer}>
                    <Text style={styles.padding10}>Registration ID : {this.props.animalDetails.stellaCode ? this.props.animalDetails.stellaCode : "" }</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.pregnancyList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}

                            ItemSeparatorComponent={this._renderSeperator}
                            ListEmptyComponent={() => (!this.props.pregnancyList.length ?
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

PregnancyHistoryList.propTypes = propTypes;

PregnancyHistoryList.defaultProps = defaultProps;


export default PregnancyHistoryList;
