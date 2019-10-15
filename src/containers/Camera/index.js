import PropTypes from "prop-types";
import {connect} from "react-redux";
import React, {Component} from "react";
import {View, Vibration, Platform, Image, TouchableOpacity, Dimensions, Alert} from "react-native";
import {RNCamera} from "react-native-camera";

import {navigateBack, navigateTo} from "../../utils/utility";
import Toolbar from "../../components/Toolbar";
import {ProfileIcons, cameraIcons} from "../../assets";
import {handleScanSearch} from "../../actions/search.actions";

import styles from "./styles";

const propTypes = {
    dispatch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleScanSearch: PropTypes.func,
    token: PropTypes.string
};

const defaultProps = {
    dispatch: () => {},
    handleEmptyCattleSearch: () => {},
    handleScanSearch: () => {},
    token: ""
};

const DESIRED_RATIO = "16:9";

class Camera extends Component<{}> {

    state = {
        isTourchOn: false,
        camera: {
            type: RNCamera.Constants.Type.back,
            flashMode: RNCamera.Constants.FlashMode.off,
            barcodeFinderVisible: true,
            autoFocus: RNCamera.Constants.AutoFocus.on,
            ratio: null
        }
    }

    componentWillMount() {
        this.prepareRatio();
    }

    prepareRatio = async () => {
        if (Platform.OS === "android" && this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync();
            const ratio = ratios.find(r => r === DESIRED_RATIO) || ratios[ratios.length - 1];
            this.setState({ratio});
        }
    }

    onBarCodeRead = (scanResult) => {
        Vibration.vibrate();
        if(scanResult && scanResult.data.length > 0){
        if(this.props.comingFrom === "dehorningListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("dehorningListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "bwmListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("bodyWeightMgmtListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "aiListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("artificialInseminationListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "pregnancyDetectionListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("pregnancyDetectionListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "bcsListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("bcsListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "dewormingListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("dewormingListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "vaccinationListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("vaccinationListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "observationListingScreen"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateBack("observationListing");
                    this.props.handleOnlineScan(data[0]);
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }        
        else if(this.props.comingFrom === "bwsOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("bodyWeightMeasurement");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
       else if(this.props.comingFrom === "bcsOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("bodyConditionScore");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "calfBirthOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("calfBirth");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
      else if(this.props.comingFrom === "pdOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordPD");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
       else if(this.props.comingFrom === "aiOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordAI");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "observationOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordObservation");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
       else if(this.props.comingFrom === "vaccinationOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordVaccination");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
       else if(this.props.comingFrom === "dewormingOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordDeworming");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }
        else if(this.props.comingFrom === "dehorningOnlineScanRecord"){
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    this.props.handleOnlineScan(data[0]);
                    navigateBack("recordDehorning");
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
            });
        }else if(this.props.comingFrom === "dehorningOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordDehorning");
        }else if(this.props.comingFrom === "vaccinationOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordVaccination");
        }else if(this.props.comingFrom === "dewormingOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordDeworming");
        }
        else if(this.props.comingFrom === "observationOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordObservation");
        }
        else if(this.props.comingFrom === "aiOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordAI");
        }
        else if(this.props.comingFrom === "pdOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("recordPD");
        }
        else if(this.props.comingFrom === "calfBirthOfflineForm"){
            this.props.handleScan(scanResult.data);
            navigateBack("calfBirth");
        }
        else{
            this.props.handleScanSearch(scanResult.data, this.props.token).then((data) => {
                if (data.length > 0) {
                    navigateTo("cattleDetails", {selectedAnimalDetails: data[0], comingFrom: "dashboard"});
                } else {
                    Alert.alert("", "Sorry No Records Found");
                }
                this.props.handleEmptyCattleSearch();
            });
            navigateBack();
        }
    }
    else {
        Alert.alert("", "Sorry No Records Found");
    }
}

    onPressFlash = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isTourchOn: !prevState.isTourchOn,
                camera: {
                    ...prevState.camera,
                    flashMode: prevState.isTourchOn ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch
                }
            };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    iconmooOn={ProfileIcons.iconMooOn}
                    onPressLeftIcon={navigateBack}
                />
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                    barcodeFinderWidth={50}
                    barcodeFinderHeight={50}
                    barcodeFinderBorderColor="red"
                    barcodeFinderBorderWidth={2}
                    defaultTouchToFocus={this.state.camera.autoFocus}
                    flashMode={this.state.camera.flashMode}
                    mirrorImage={false}
                    ratio={this.state.ratio}
                    onBarCodeRead={this.onBarCodeRead}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    // permissionDialogTitle="Permission to use camera"
                    // permissionDialogMessage="We need your permission to use your camera phone"
                    onGoogleVisionBarcodesDetected={({barcodes}) => {
                        console.log(barcodes);
                    }} />
                <View style={styles.logoViewStyle}>
                    <Image source={cameraIcons.stellaLogo} style={styles.logoStyle} />
                </View>
                <View style={styles.maskOutter}>
                    <View style={[styles.flexRowHeight, styles.maskRow, styles.maskFrame]} />
                    <View style={[styles.flex30, styles.maskCenter]}>
                        <View style={[styles.flexColWidth, styles.maskFrame]} />
                        <View style={styles.maskInner} />
                        <View style={[styles.flexColWidth, styles.maskFrame]} />
                    </View>
                    <View style={[styles.flexRowHeight, styles.maskRow, styles.maskFrame]} />
                </View>
                <View style={styles.torchViewStyle}>
                    <TouchableOpacity onPress={this.onPressFlash}>
                        {(this.state.isTourchOn) ?
                            <Image source={cameraIcons.torchON} style={styles.torchStyle} />
                            :
                            <Image source={cameraIcons.torchOFF} style={styles.torchStyle} />}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

Camera.defaultProps = defaultProps;

Camera.propTypes = propTypes;

const mapStateToProps = state => ({
    token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleScanSearch: (payload, token) => dispatch(handleScanSearch(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"})
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
