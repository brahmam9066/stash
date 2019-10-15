import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";

import styles from "./styles";

const propTypes = {
    tabList: PropTypes.array,
    handleTabPress: PropTypes.func,
    activeTab: PropTypes.string
};

const defaultProps = {
    tabList: [],
    handleTabPress: () => {},
    activeTab: ""
};

class Tabs extends Component<{}> {

    renderTabList = () => {

        const {tabList, activeTab} = this.props;

        return tabList.map((tab, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => this.props.handleTabPress(tab.tabUniqueId)}>
                    <View style={[this.props.tabStyle, activeTab === tab.tabUniqueId ? this.props.activeTabStyle : {}]}>
                        <Image
                            resizeMode="contain"
                            style={this.props.tabIconStyle}
                            source={tab.tabIcon} />
                        <Text style={styles.tabTextStyle}>{tab.tabName}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <View style={styles.tabsContainer}>
                {this.renderTabList()}
            </View>
        );
    }
}

Tabs.defaultProps = defaultProps;

Tabs.propTypes = propTypes;

export default Tabs;
