import React from "react";
import {connect} from "react-redux";
import {View, TouchableOpacity, Image, ImageBackground, CameraRoll, ScrollView, PermissionsAndroid} from "react-native";
import {imageUploadIcons} from "../../assets";
import styles from "./styles"
import ImagePicker from 'react-native-image-picker';
import {uploadImagesAction} from "../../actions/imageUpload.action";
import ProgressiveLoader from "../../components/ProgressiveLoader";
import SubTitle from "../SubTitle";

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidUpdate(prevProps){
        if(prevProps.images.length !== this.props.images.length){
            setState({images: this.props.images});
        }
    }

    options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    deleteImage = (index) => {
        const images = [...this.state.images];
        images.splice(index, 1);
        this.setState({images});
        this.props.onChange(images);
    }

    addImage = () => {
        const images = [...this.state.images];
        images.push({source: null});
        this.setState({images});
        this.openGallery(images.length - 1);
        this.props.onChange(images);
    }

    progress = (progress, index) => {
        images = [...this.state.images];
        if(progress !== 1) {
            images[index].progress = progress;
            this.setState({images});
        } else {
            delete images[index].progress
            this.setState({images});
            setTimeout(()=>{console.log(this.state)}, 100)
        }
    }

    openGallery = (index) => {
        ImagePicker.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
              if(this.state.images[index].source === null){
                this.deleteImage(index);
              }
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              if(this.state.images[index].source === null){
                this.deleteImage(index);
              }
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              const images = [...this.state.images];
              const image = {
                source: { uri: response.uri },
                fileName: response.fileName,
                type: response.type
            };
              images[index] = image;
              this.setState({images});
              this.props.onChange(images);
              this.props.handleUploadImage(this.props.token, image, this.props.dataObject, this.props.extraData, this.progress, index);
            }
          });
        };

    render() {
        return (
            <View>
                <View style={[styles.titleContainer, this.props.titleContainer]}>
                    <SubTitle
                        heading={this.props.title}
                        subTitleStyle={[styles.subTitleStyle, this.props.subTitleStyle]}
                        titleStyle={[styles.titlestyle, this.props.titlestyle]}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.images.map((image, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.imagesWrapper}
                                    key={`image-upload-${index}`}
                                    onPress={() => {console.log('upload image triggered'); this.openGallery(index);}}
                                >
                                    { image.progress ?
                                        <ProgressiveLoader
                                            containerStyle={[styles.image, styles.progressiveLoaderContainer]}
                                            progress={image.progress}
                                        />
                                        : null
                                    }
                                    <Image
                                        style={styles.image}
                                        source={image.source ? image.source : imageUploadIcons.iconCamera}
                                    />
                                    <TouchableOpacity
                                            style={styles.iconXContainer}
                                            onPress={() => {console.log('delete image triggered'); this.deleteImage(index);}}
                                    >
                                        <Image
                                            style={styles.flex1}
                                            source={imageUploadIcons.iconX}
                                            onPress={() => {this.deleteImage(index)}}
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity
                        style={styles.imagesWrapper}
                        onPress={() => {console.log('add image triggered'); this.addImage();}}
                    >
                        <Image
                            style={styles.image}
                            source={imageUploadIcons.iconCamera}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    token: state.authReducer.token,
    userDetails: state.farmAdminReducer.userDetails,
    images: state.imageReducer.images
});

const mapDispatchToProps = dispatch => ({
    handleUploadImage: (token, image, dataObject, extraData, progress) => dispatch(uploadImagesAction(token, image, dataObject, extraData, progress))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);