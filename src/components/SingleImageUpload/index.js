import React from "react";
import {View, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {imageUploadIcons} from "../../assets";
import styles from "./styles"
import ImagePicker from 'react-native-image-picker';
import ProgressiveLoader from "../../components/ProgressiveLoader";
import SubTitle from "../SubTitle";
import ImageViewer from "../../components/ImageViewer";
import {navigateTo} from "../../utils/utility";
import {selectImage} from "../../utils/image.utils";
import {uploadSingleImageAction} from "../../actions/imageUpload.action"


const propTypes = {
    onChange: PropTypes.func,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    onChange: () => {},
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: null,
            source: imageUploadIcons.iconCamera,
            fileName: null,
            type: null
        };
    }

    componentDidUpdate(prevProps){
        if(this.props.images.length !== prevProps.images.length){
            this.setState({source: {uri: this.props.images[0].url}});
        } else if(this.props.images.length !== 0 && this.props.images[0].id !== prevProps.images[0].id){
            this.setState({source: {uri: this.props.images[0].url}});
        }
    }

    progress = (progress) => {
        if(progress !== 1) {
            this.setState({progress});
        } else {
            this.setState({progress: null});
        }
    }

    render() {
        const {images} = this.props;

        return (
            <View>
                <View style={[styles.titleContainer, this.props.titleContainer]}>
                    <SubTitle
                        heading={this.props.title}
                        subTitleStyle={{...styles.subTitleStyle, ...this.props.subTitleStyle}}
                        titleStyle={{...styles.titlestyle, ...this.props.titlestyle}}
                    />
                </View>
                <View style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={styles.imagesWrapper}
                        onPress={() => {
                            if( images && images.length > 0){
                                navigateTo("imageViewer", {
                                    images: images,
                                    activateBackButton: this.props.activateBackButton,
                                    deactivateBackButton: this.props.deactivateBackButton
                                });
                            } else if(this.state.source.uri){
                                navigateTo("imageViewer", {images: [{url: this.state.source.uri}],
                                activateBackButton: this.props.activateBackButton,
                                deactivateBackButton: this.props.deactivateBackButton
                            });
                            } else {
                                selectImage(this);
                            }
                        }}
                    >
                        { this.state.progress ?
                            <ProgressiveLoader
                                containerStyle={[styles.image, styles.progressiveLoaderContainer]}
                                progress={this.state.progress}
                            />
                            : null
                        }
                        <Image
                            style={styles.image}
                            loadingIndicatorSource={this.state.source}
                            source={images && images[0] ? {uri: images[0].url} :this.state.source}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

ImageUpload.propTypes = propTypes;

ImageUpload.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    userDetails: state.farmAdminReducer.userDetails,
    images: state.imageReducer.imageObjects
});

const mapDispatchToProps = dispatch => ({
    handleUploadSingleImage: (token, image, dataObject, extraData, progress) => dispatch(uploadSingleImageAction(token, image, dataObject, extraData, progress)),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);