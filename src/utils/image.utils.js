import ImagePicker from 'react-native-image-picker';
import {imageUploadIcons} from "../assets";
import ImageResizer from 'react-native-image-resizer';
import fileType from 'react-native-file-type';

export const selectImage = (passedThis) => {
    ImagePicker.showImagePicker({
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'mooOn'
    },
    // quality: 1,
    // maxWidth: 1000,
    // maxHeight: 1000,
    allowsEditing: true
  }, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
            if(response.fileSize > 1048576){
                let quality = 100;
                let compressFormat = "JPEG";
                if(response.type.includes("png")){
                    compressFormat = "PNG"
                }
                if (response.fileSize > 1048576 && response.fileSize < 2097152 ) {
                    quality = 80;
                } else if (response.fileSize > 2097152 && response.fileSize < 4194304 ) {
                    quality = 40;
                } else if (response.fileSize > 4194304 && response.fileSize < 6291456 ){
                    quality = 30;
                } else if (response.fileSize > 6291456 ){
                    quality = 20;
                }
                ImageResizer.createResizedImage(response.path, response.width, response.height, compressFormat, quality, response.rotation, "/storage/emulated/0/Pictures/mooOn").then((resizerRresponse) => {
                    const image = {
                        source: { uri: resizerRresponse.uri },
                        fileName: resizerRresponse.name,
                        type: `image/${compressFormat}`
                    };
                    console.log(resizerRresponse, image);
                    if(!image.type){
                        fileType(response.uri).then((type) => {
                            image.type = type.mime;
                            passedThis.setState({...image});
                            passedThis.props.onChange(image);
                            passedThis.props.handleUploadSingleImage(passedThis.props.token, image, passedThis.props.dataObject, passedThis.props.extraData, passedThis.progress)
                            .then((data)=>{
                                if(data.status === 500){
                                    passedThis.setState({source: imageUploadIcons.iconCamera});
                                }
                            })
                        });
                    } else {
                        passedThis.setState({...image});
                        passedThis.props.onChange(image);
                        passedThis.props.handleUploadSingleImage(passedThis.props.token, image, passedThis.props.dataObject, passedThis.props.extraData, passedThis.progress)
                        .then((data)=>{
                            if(data.status === 500){
                                passedThis.setState({source: imageUploadIcons.iconCamera});
                            }
                        });
                    }
                  }).catch((err) => {
                    console.log(err);
                  });
            } else {
                image = {
                    source: { uri: response.uri },
                    fileName: response.fileName,
                    type: response.type
                };
                if(!image.type){
                    fileType(response.uri).then((type) => {
                        image.type = type.mime;
                        passedThis.setState({...image});
                        passedThis.props.onChange(image);
                        passedThis.props.handleUploadSingleImage(passedThis.props.token, image, passedThis.props.dataObject, passedThis.props.extraData, passedThis.progress)
                        .then((data)=>{
                            if(data.status === 500){
                                passedThis.setState({source: imageUploadIcons.iconCamera});
                            }
                        })
                    });
                } else {
                    passedThis.setState({...image});
                    passedThis.props.onChange(image);
                    passedThis.props.handleUploadSingleImage(passedThis.props.token, image, passedThis.props.dataObject, passedThis.props.extraData, passedThis.progress)
                    .then((data)=>{
                        if(data.status === 500){
                            passedThis.setState({source: imageUploadIcons.iconCamera});
                        }
                    });
                }
            }
        }
    });
};