import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TextInput, TouchableOpacity, Image} from "react-native";
import {Icon} from "react-native-elements";

import {navigateTo} from "../../utils/utility";
import  I18n from "../../utils/language.utils";
import {locationIcons} from "../../assets"

import styles from "./styles";

const propTypes = {
    containerStyle: PropTypes.object,
    searchBarStyle: PropTypes.object,
    searchList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    handleOnFocus: PropTypes.func,
    autoFocus: PropTypes.bool,
    onBlur: PropTypes.func
};

const defaultProps = {
    containerStyle: {},
    searchBarStyle: {},
    searchList: [],
    handleSearch: () => {},
    handleSearchItemPress: () => {},
    handleOnFocus: () => {},
    autoFocus: false,
    onBlur: () => {}
};

class SearchBar extends Component<{}> {

    state = {
        value: "",
        isFocused: false
    }

    inputFunc = {
        clear: () => {
            this.setState({
                value: ""
            });
            this.props.handleSearch("");
            this.textInput.blur();
        }
    }

    onChangeText = (value) => {
        this.props.handleSearch(value, this.inputFunc);
        this.setState({
            value
        });
    }

    handleOnlineScan = (data) =>{
        this.props.handleSearchItemPress(data, this.inputFunc);
        this.setState({
            value : data.stellaCode
        });
    }

    renderSearchList = () => {
        const {searchList} = this.props;
        return searchList.map((item, index) => {
            if (item.stellaCode === "Search for farms near you") {
                return (
                    <TouchableOpacity
                        style={styles.nearMeListItemCont}
                        key={index}
                        onPress={() => {
                            this.setState({
                                value: item.stellaCode
                            });
                            this.props.handleSearchItemPress(item, this.inputFunc);
                        }}>
                        <Text style={styles.nearMeListItemText}>{item.stellaCode}</Text>
                        <Image style={styles.locationIcon} source={locationIcons.iconLocation}/>
                    </TouchableOpacity>
                );
            }
            return (
                <TouchableOpacity
                    style={styles.listItemCont}
                    key={index}
                    onPress={() => {
                        this.setState({
                            value: item.stellaCode
                        });
                        this.props.handleSearchItemPress(item, this.inputFunc);
                    }}>
                    <Text>{item.stellaCode}</Text>
                </TouchableOpacity>
            );
        });
    }

    renderIcons = () => {
        if (this.state.value.length > 0) {
            return (
                <TouchableOpacity onPress={this.inputFunc.clear} style={styles.searchIconStyle}>
                    <Icon
                        name="close"
                        type="material-community"
                        size={32}
                        color="#666666" />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={() => {}} style={styles.searchIconStyle}>
                <Icon
                    name="magnify"
                    type="material-community"
                    size={32}
                    color="#666666" />
            </TouchableOpacity>
        );
    }

    render() {
        const {language} = this.props
        return (
            <View>
                <View style={[styles.searchBarCont, this.props.containerStyle]}>
                    <View style={[styles.searchFieldWrapper, this.props.searchBarStyle]}>
                        <TextInput
                            onChangeText={this.onChangeText}
                            value={this.state.value}
                            placeholder = {I18n.t('search', {locale:language})}
                            ref={(input) => {
                                this.textInput = input;
                            }}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            autoFocus={this.props.autoFocus}
                            style={styles.inputboxStyle} />
                        {this.renderIcons()}
                        <TouchableOpacity onPress={() => navigateTo("camera",{comingFrom : this.props.comingFromForScan ? this.props.comingFromForScan : "",handleOnlineScan : this.handleOnlineScan})} style={styles.qrcodeContainer}>
                            <Icon
                                name="qrcode-scan"
                                type="material-community"
                                size={26}
                                iconStyle={[styles.qrcodeStyle]}
                                color="#666666" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.autocompleteListContainer}>
                    <View style={styles.autoCompleteContent}>
                        {this.renderSearchList()}
                    </View>
                </View>
            </View>
        );
    }
}

SearchBar.defaultProps = defaultProps;

SearchBar.propTypes = propTypes;

export default SearchBar;
