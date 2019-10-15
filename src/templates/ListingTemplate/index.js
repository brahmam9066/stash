import React, {Component} from "react";
import {View, ScrollView, FlatList, Text, Image} from "react-native";
import PropTypes from "prop-types";

import Toolbar from "../../components/Toolbar";
import Box from "../../components/Box";
import SubText from "../../components/SubText";
import Footer from "../../components/Footer";
import {navigateTo} from "../../utils/utility";
import {noResultsIcons} from "../../assets";
import FlatListItem from "../../components/FlatListItem";
import SearchBar from "../../components/SearchBar";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    handleResetAllData: PropTypes.func,
    handleSetDataToCalf: PropTypes.func,
    handleSetDataToHeifer: PropTypes.func,
    handleViewLayout: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handleSearch: () => {},
    searchList: () => {},
    handleSearchItemPress: () => {},
    handleResetAllData: () => {},
    handleSetDataToCalf: () => {},
    handleSetDataToHeifer: () => {},
    handleViewLayout: () => {}
};

class ListingTemplate extends Component {

    renderFilterBox = () => {

    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.mainContainer}>
                <View onLayout={this.props.handleViewLayout}>
                    <Toolbar
                        leftIconName="arrow-left"
                        onPressLeftIcon={this.props.onbackPress}
                        title={this.props.toolbarTitle} />
                    <SearchBar
                        handleSearch={this.props.handleSearch}
                        searchList={this.props.searchList}
                        handleSearchItemPress={this.props.handleSearchItemPress}
                        searchBarStyle={styles.searchbarBackground} 
                        language={language}/>
                    <View style={styles.filterViewContainer}>
                        <View style={styles.boxViewContainer}>
                            <Box
                                text="All"
                                textStyle={styles.boxTextStyle}
                                boxStyle={styles.boxStyle}
                                onPress={this.props.handleResetAllData} />
                            <Box
                                text="Calf"
                                textStyle={styles.boxTextStyle}
                                boxStyle={styles.boxStyle}
                                onPress={this.props.handleSetDataToCalf} />
                            <Box
                                text="Heifer"
                                textStyle={styles.boxTextStyle}
                                boxStyle={styles.boxStyle}
                                onPress={this.props.handleSetDataToHeifer} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

ListingTemplate.propTypes = propTypes;

ListingTemplate.defaultProps = defaultProps;


export default ListingTemplate;
