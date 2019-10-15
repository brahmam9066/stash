import React, {Component} from "react";
import {View, ScrollView, FlatList, Text, Image, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {animalListIcons, noResultsIcons} from "../../../../assets";

import Toolbar from "../../../../components/Toolbar";
import PageLoadError from "../../../../components/PageLoadError";
import Footer from "../../../../components/Footer";
import FlatListItem from "../../../../components/FlatListItem";
import SearchBar from "../../../../components/SearchBar";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    morphologicalList: PropTypes.any,
    onbackPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    handleListScroll: PropTypes.func,
    onPressMorphology: PropTypes.func,
    permissionsToCreate: PropTypes.bool,
    handleCreateNew: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    morphologicalList: [],
    onbackPress: () => {},
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    handleListScroll: () => {},
    onPressMorphology: () => {},
    permissionsToCreate: false,
    handleCreateNew: () => {}
};

class MorphologicalDetails extends Component {

    _keyExtractor = (p) => {
        return `${p.id}`;
    }

    _renderImage = (item) => {
        let component = <View />;
        if (item.lactationState && item.lactationState.toLowerCase() === "milking") {
            component = <Image style={styles.flatRowImageStyle} source={animalListIcons.iconMilking} />;
        } else if (item.lactationState && item.lactationState.toLowerCase() === "dry off") {
            component = <Image style={styles.flatRowImageStyle} source={animalListIcons.iconDryoff} />;
        }
        return component;
    }

    _renderItem = ({item}) => {
        const {language} = this.props
        return (
            <FlatListItem onPress={() => { this.props.onPressMorphology(item); }} iconStyle={styles.imageStyle}>
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.titleStyle}>
                        <Text style={styles.headingStyle}>
                        {I18n.t('registrationIdAnimalListing', {locale:language})} 
                        </Text>{item.cattle.stellaCode ? item.cattle.stellaCode : "none"}
                    </Text>
                    <View style={styles.flatRowStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.titleStyle}>
                            <Text style={styles.headingStyle}>
                            {I18n.t('lactationAnimalListing', {locale:language})}
                            </Text>{item.cattle.lactationState}
                        </Text>
                        {this._renderImage(item)}
                    </View>
                </View>
            </FlatListItem>
        );
    }

    render() {
        const {morphologicalList,language} = this.props;

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
                    <View style={styles.linkView}>
                        <TouchableOpacity
                            disabled={!this.props.permissionsToCreate}
                            onPress={this.props.handleCreateNew}
                            style={[styles.linkStyle, this.props.permissionsToCreate ? styles.enableBackgroundColor : styles.disableBackgroundColor]}
                        >
                            <Text style={styles.linkTextStyle}><Text>+</Text> 
                            {I18n.t('createNew', {locale:language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!morphologicalList && <PageLoadError errorText="Error ! Page loading from server" />}
                <ScrollView style={styles.container} onScroll={this.props.handleListScroll}>
                    <View style={styles.listViewContainer}>
                        <FlatList
                            data={this.props.morphologicalList}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListEmptyComponent={() => (!morphologicalList.length ?
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

MorphologicalDetails.propTypes = propTypes;

MorphologicalDetails.defaultProps = defaultProps;

export default MorphologicalDetails;
