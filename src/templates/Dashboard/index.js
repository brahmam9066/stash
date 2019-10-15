import React, {Component} from "react";
import {View, ScrollView, Dimensions, Image} from "react-native";
import Config from "react-native-config";
import PropTypes from "prop-types";
import Modal from "../../components/ModalSmall";
import {ProfileIcons} from "../../assets";

import SelectedTabList from "../../components/SelectedTabList";
import {redirectTo} from "../../utils/utility";
import Toolbar from "../../components/Toolbar";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import { sliderList } from '../../containers/DashboardContainer/tabConfig.js';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')


import styles from "./styles";

const propTypes = {
    handlePressLeftIcon: PropTypes.func,
    alertTitle: PropTypes.any,
    onPressAlert: PropTypes.func,
    showAlert: PropTypes.bool,
    tabList: PropTypes.array,
    handleTabPress: PropTypes.func,
    tabContentList: PropTypes.array,
    defaultTab: PropTypes.string,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    showModal: PropTypes.bool,
    onPressOk: PropTypes.func,
    sliderList: PropTypes.array,
    onPressCancel: PropTypes.func,
    footerActive: PropTypes.bool,
    activeTab: PropTypes.string

};

const defaultProps = {
    handlePressLeftIcon: () => { },
    alertTitle: "",
    onPressAlert: () => {},
    showAlert: false,
    tabList: [],
    handleTabPress: () => {},
    tabContentList: [],
    defaultTab: "",
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    showModal: false,
    onPressOk: () => {},
    sliderList: [],
    onPressCancel: () => {},
    footerActive: true,
    activeTab: ""
};

class Dashboard extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            imgArray: sliderList, 
        };
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    leftIconName="menu"
                    leftIconId="dashboard-drawer-left-icon"
                    onPressLeftIcon={this.props.handlePressLeftIcon}
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn}
                    showAlert={this.props.showAlert}
                    onPressAlert={this.props.onPressAlert}
                    alertTitle={this.props.alertTitle} />
                <View style={styles.flex_1}>
                    <View style={styles.pageHeaderStyle}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Tabs
                                tabList={this.props.tabList}
                                activeTab={this.props.activeTab}
                                handleTabPress={this.props.handleTabPress}
                                activeTabStyle={styles.activeTabStyle}
                                tabIconStyle={styles.tabIconStyle}
                                tabStyle={styles.tabStyle} />
                        </ScrollView>
                    </View>
                    <ScrollView>
                        <SearchBar
                            handleSearch={this.props.handleSearch}
                            searchList={this.props.searchList}
                            handleSearchItemPress={this.props.handleSearchItemPress}
                            searchBarStyle={styles.searchbarBackground}
                            containerStyle={styles.searchBarContStyle} 
                            language={language}/>
                        <View style={styles.pageContentStyle}>
                            <SelectedTabList tabContentList={this.props.tabContentList} />
                            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Tabs
                                    tabList={this.props.sliderList}
                                    tabIconStyle={styles.sliderStyle}
                                    tabStyle={styles.sliderViewStyle}
                                />
                            </ScrollView> */}
                            <View>
                            <Swiper  
                                autoplay = {true}  height = {100} 
                                paginationStyle={styles.paginationStyle} loop
                                dot={<View style={styles.dotColor} />}
                                activeDot={<View style={styles.activeDotColor} />}>
                                {
                                    this.state.imgArray.map((item, index) => (
                                        <View style={styles.appContainerImage}>
                                            <Image resizeMode='contain' style={styles.imageStyle} source={item.tabIcon} />
                                        </View>
                                    ))
                                }
                            </Swiper>
                            </View>
                        </View>
                    </ScrollView>
                    <Modal
                        showModal={this.props.showModal}
                        onPressOk={this.props.onPressOk}
                        onPressCancel={this.props.onPressCancel}
                        title="Exit App"
                        content="Are you sure you want to exit the app?"
                    />
                    <View style={styles.footerStyle}>
                        <Footer 
                        isActive={this.props.footerActive} 
                        language={language}/>
                    </View>
                </View>
            </View>
        );
    }
}

Dashboard.defaultProps = defaultProps;

Dashboard.propTypes = propTypes;

export default Dashboard;
