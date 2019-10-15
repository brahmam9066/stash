import React from "react";
import {View, ScrollView, Image, Dimensions} from "react-native";
import Toolbar from "../Toolbar";
import PropTypes from "prop-types";
import {navigateBack} from "../../utils/utility"

import styles from "./styles";

const {height, width} = Dimensions.get("window");

const propTypes = {
    images: PropTypes.array,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    images: [],
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

export default class ImageViewer extends React.Component {

    componentDidMount(){
        this.props.deactivateBackButton();
    }

    componentWillUnmount(){
        this.props.activateBackButton();
    }

    render(){
        return(
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={navigateBack}
                    toolbarContainer={{
                        backgroundColor: "rgba(0, 0, 0, 0)"
                    }}
                    title="Image Viewer" />
                <View style={styles.flex1}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        contentContainerStyle={[styles.imagesContainer, {width: this.props.images.length * width, height: "100%"}]}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            this.props.images.map((image, index)=>
                                <Image
                                    key={`image-viewer-${index}`}
                                    style={styles.image}
                                    source={{uri: image.url}}
                                    resizeMode="contain"
                                />
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ImageViewer.propTypes = propTypes;

ImageViewer.defaultProps = defaultProps;