import React from "react";
import {View, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import  I18n from "../../../../utils/language.utils";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import Footer from "../../../../components/Footer";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    pregnancyDetails: PropTypes.object,
    animalDetails: PropTypes.object
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    pregnancyDetails: {},
    animalDetails: {}
};

class PregnancyHistoryDetails extends React.Component {
    render() {
        const {language } = this.props;
        let sortedInseminations;
        let insemination;
        let wetdays;
        let drydays;

        if (this.props.pregnancyDetails.inseminations) {
            const {inseminations} = this.props.pregnancyDetails;
            sortedInseminations = inseminations.sort((a, b) => { return new Date(b.inseminationDate - a.inseminationDate); });
            insemination = sortedInseminations[sortedInseminations.length - 1];

            if (this.props.pregnancyDetails.pregnancyParity && this.props.pregnancyDetails.pregnancyParity > 1) {
              let fromDate = moment(this.props.pregnancyDetails.fromDate);
              let deliveryDate = this.props.pregnancyDetails.deliveryDate ?
                                    moment(this.props.pregnancyDetails.deliveryDate) : null;
              let dryOffDate = this.props.pregnancyDetails.dryOffDate ?
                                    moment(this.props.pregnancyDetails.dryOffDate) : null;
              wetdays = dryOffDate ? dryOffDate.diff(fromDate, 'days') : moment().diff(fromDate, 'days');
              console.log("wetdays : ", wetdays);
              drydays = deliveryDate ? deliveryDate.diff(fromDate, 'days') - wetdays : moment().diff(fromDate, 'days') - wetdays;
            }
        }


        return (
            <View style={styles.mainContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />

                <ScrollView style={styles.container}>
                    <View style={[styles.backgroundWhite]}>
                        <View style={styles.animalProfileView}>
                            <View style={styles.cattleDetailsConteiner}>
                                <SubText
                                    text="Registration ID"
                                    value={this.props.animalDetails.stellaCode ? this.props.animalDetails.stellaCode : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text="Lactation"
                                    value={this.props.animalDetails.lactationState ? this.props.animalDetails.lactationState : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text="Breeding"
                                    value={this.props.animalDetails.breedingState ? this.props.animalDetails.breedingState : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.informationViewStyle}>
                                <View style={styles.profileViewStyle}>
                                    <SubTitle
                                        heading= {I18n.t('summary', {locale:language})}
                                        eventTextStyle={styles.eventTextStyle}
                                        titleStyle={styles.titlestyle}
                                        subTitleStyle={styles.subTitleStyle}
                                    />

                                    <View style={styles.subTitleStyle}>
                                      <SubText
                                          text="Parity"
                                          value={this.props.pregnancyDetails.pregnancyParity ? this.props.pregnancyDetails.pregnancyParity : ""}
                                          textStyle={styles.textstyle}
                                          labelStyle={styles.labelstyle}
                                      />
                                      <SubText
                                          text="Status"
                                          value={this.props.pregnancyDetails.result ? this.props.pregnancyDetails.result : ""}
                                          textStyle={styles.textstyle}
                                          labelStyle={styles.labelstyle}
                                      />
                                    </View>

                                    <View style={styles.subTitleStyle}>
                                        <SubText
                                            text="From"
                                            value={this.props.pregnancyDetails.fromDate ? moment(this.props.pregnancyDetails.fromDate).format("DD-MMM-YYYY") : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />

                                        <SubText
                                            text="To"
                                            value={this.props.pregnancyDetails.toDate ? moment(this.props.pregnancyDetails.toDate).format("DD-MMM-YYYY") : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.subTitleStyle}>
                                        <SubText
                                            text="Pregnancy Type"
                                            value={this.props.pregnancyDetails.pregnancyType ? this.props.pregnancyDetails.pregnancyType : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />

                                        <SubText
                                            text="No. of Calves"
                                            value={this.props.pregnancyDetails.children ? this.props.pregnancyDetails.children.length : "0"}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={styles.informationViewStyle}>
                                <View style={styles.profileViewStyle}>
                                    <SubTitle
                                        heading="Details"
                                        eventTextStyle={styles.eventTextStyle}
                                        titleStyle={styles.titlestyle}
                                        subTitleStyle={styles.subTitleStyle}
                                    />
                                    <View style={{}}>
                                        <SubText
                                            text="AI Date"
                                            value={insemination ? moment(insemination.inseminationDate).format("DD-MMM-YYYY") : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.subTitleStyle}>
                                        <SubText
                                            text="Service Type"
                                            value={insemination ? insemination.inseminationType : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                        <SubText
                                            text="Dry Off Date"
                                            value={this.props.pregnancyDetails.dryOffDate ? moment(this.props.pregnancyDetails.dryOffDate).format("DD-MMM-YYYY") : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.subTitleStyle}>
                                        <SubText
                                            text="Semen Code"
                                            value={insemination ? insemination.semenCode : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />

                                        <SubText
                                            text="Done By"
                                            value={insemination ? insemination.performedBy : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.subTitleStyle}>
                                        <SubText
                                            text="Wet Days"
                                            value={wetdays}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                        <SubText
                                            text="Dry Days"
                                            value={drydays}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerViewStyle}>
                    <Footer 
                     language={language}/>
                </View>
            </View>
        );
    }
}

PregnancyHistoryDetails.propTypes = propTypes;

PregnancyHistoryDetails.defaultProps = defaultProps;


export default PregnancyHistoryDetails;
