import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../../components/Toolbar";
import {arrayChunking} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    prescriptionForm: PropTypes.element,
    handleSavePress: PropTypes.func,
    handleAddMorePress: PropTypes.func,
    prescriptionList: PropTypes.array,
    medicineList: PropTypes.array,
    handleRemovePrescription: PropTypes.func,
    handleEditPrescription: PropTypes.func,
    handleUpdatePress: PropTypes.func,
    handleCancelPress: PropTypes.func,
    isEditPrescriptionDetails: PropTypes.bool,
    isInventory: PropTypes.bool
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    prescriptionForm: <Text>Breed Form</Text>,
    handleSavePress: () => {},
    handleAddMorePress: () => {},
    prescriptionList: [],
    medicineList: [],
    handleRemovePrescription: () => {},
    handleEditPrescription: () => {},
    handleUpdatePress: () => {},
    handleCancelPress: () => {},
    isEditPrescriptionDetails: false,
    isInventory: false
};

class Prescription extends Component<{}> {

    renderTabsForPrescriptions = (isEdit) => {
        const {prescriptionList, medicineList} = this.props;
        return arrayChunking(2, prescriptionList).map((prescripList, i) => {
            return (
                <View key={i} style={styles.row}>
                    {
                        prescripList.map((item, index) => {
                            if (this.props.isInventory && item && item.medicine && item.medicine.id) {
                                const medicine = medicineList.filter(med => (med.id === item.medicine.id));
                                return (
                                    <View style={styles.tabStyles} key={index}>
                                        <TouchableOpacity onPress={() => this.props.handleEditPrescription(item)} disabled={isEdit}>
                                            <Text style={styles.tabTextStyle}>{this.props.isMedicineSearch ? item.medicine ? item.medicine.medicineName : "" : medicine.length > 0 ? medicine[0].medicineName : ""}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cancelIconStyle} onPress={() => this.props.handleRemovePrescription(item.uniqueId)} disabled={isEdit}>
                                            <Text style={styles.cancelIcon}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                            return (
                                <View style={styles.tabStyles} key={index}>
                                    <TouchableOpacity onPress={() => this.props.handleEditPrescription(item)} disabled={isEdit}>
                                        <Text style={styles.tabTextStyle}>{item.medicineName ? item.medicineName : ""}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelIconStyle} onPress={() => this.props.handleRemovePrescription(item.uniqueId)} disabled={isEdit}>
                                        <Text style={styles.cancelIcon}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </View>
            );
        });
    }

    renderTabsForOfflinePrescriptions = (offlinePrescriptions,isEdit) => {
        const {prescriptionList, medicineList} = this.props;
        return arrayChunking(2, prescriptionList).map((prescripList, i) => {
            return (
                <View key={i} style={styles.row}>
                    {
                        prescripList.map((item, index) => {
                            if (this.props.isInventory && item && item.medicine && item.medicine.id) {
                                const medicine = this.props.medicineList.filter(med => (med.id === item.medicine.id));
                                return (
                                    <View style={styles.tabStyles} key={index}>
                                        <TouchableOpacity onPress={() => this.props.handleEditPrescription(item)} disabled={isEdit}>
                                            <Text style={styles.tabTextStyle}>{medicine.length > 0 ? item.offlineDisplayMedicineName : item.offlineDisplayMedicineName}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cancelIconStyle} onPress={() => this.props.handleRemovePrescription(item.uniqueId)} disabled={isEdit}>
                                            <Text style={styles.cancelIcon}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                            return (
                                <View style={styles.tabStyles} key={index}>
                                    <TouchableOpacity onPress={() => this.props.handleEditPrescription(item)} disabled={isEdit}>
                                        <Text style={styles.tabTextStyle}>{item.medicineName ? item.medicineName : ""}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelIconStyle} onPress={() => this.props.handleRemovePrescription(item.uniqueId)} disabled={isEdit}>
                                        <Text style={styles.cancelIcon}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </View>
            );
        });
    }

    render() {
        const {isEditPrescriptionDetails, language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        <Text style={[styles.h6, styles.paddingHorizontal16]}>Prescription</Text>
                        {this.props.prescriptionForm}
                        <View style={styles.tabcontainer}>
                        {this.props.comingFrom === "observationOfflineList" ? this.renderTabsForOfflinePrescriptions(this.props.offlinePrescriptions,isEditPrescriptionDetails) 
                                : this.renderTabsForPrescriptions(isEditPrescriptionDetails)}
                        </View>
                        {!isEditPrescriptionDetails ?
                            <View>
                                <Button
                                    raised
                                    title="Add More"
                                    backgroundColor="#ffffff"
                                    borderRadius={4}
                                    containerViewStyle={styles.addbuttonStyle}
                                    textStyle={styles.addButtonTextStyle}
                                    onPress={this.props.handleAddMorePress} />
                                <Button
                                    raised
                                    title={I18n.t('save', {locale:language})}                 
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleSavePress} />
                            </View>
                            :
                            <View>
                                <Button
                                    raised
                                    title="Update"
                                    backgroundColor="#ffffff"
                                    borderRadius={4}
                                    containerViewStyle={styles.addbuttonStyle}
                                    textStyle={styles.addButtonTextStyle}
                                    onPress={this.props.handleUpdatePress} />
                                <Button
                                    raised
                                    title="Cancel"
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleCancelPress} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

Prescription.defaultProps = defaultProps;

Prescription.propTypes = propTypes;

export default Prescription;
