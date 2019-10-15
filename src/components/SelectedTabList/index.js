import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

import {arrayChunking, navigateTo} from "../../utils/utility";
import styles from "./styles";

const propTypes = {
    tabContentList: PropTypes.array
};

const defaultProps = {
    tabContentList: []
};

class SelectedTabList extends Component<{}> {

    navigateToScene = (scene) => {
        if (scene) {
            navigateTo(scene);
        }
    }

    renderTabContentList = () => {
        return arrayChunking(2, this.props.tabContentList).map((tabContent, index) => {
            return (
                <View style={[styles.row, styles.spaceBetween, styles.paddingHorizontal]} key={index}>
                    {
                        tabContent.map((content, i) => {
                            return (
                                <>
                                    {
                                        content.isShow ? <TouchableOpacity key={i} onPress={() => this.navigateToScene(content.sceneName)}>
                                            <View style={styles.tabContentStyle}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={styles.tabContentIconStyle}
                                                    source={content.tabContentIcon} />
                                                <Text style={styles.tabContentTextStyle}>{content.tabContentName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        : null
                                    }
                                </>
                            );
                        })
                    }
                </View>
            );
        });
    }

    render() {
        return (
            <View>
                {this.renderTabContentList()}
            </View>
        );
    }
}

SelectedTabList.defaultProps = defaultProps;

SelectedTabList.propTypes = propTypes;

export default SelectedTabList;
