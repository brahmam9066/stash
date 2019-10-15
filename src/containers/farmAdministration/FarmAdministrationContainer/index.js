import PropTypes from "prop-types";
import {connect} from "react-redux";
import React, {Component} from "react";
import {View} from "react-native";
import {farmAdminIcons} from "../../../assets";

import authenticatedLayer from "../../authenticatedLayer";
import FarmAdministration from "../../../templates/farmAdministration/FarmAdministrationTemplate";
import ListItem from "../../../components/ListItem";
import Footer from "../../../components/Footer";
import {navigateBack, navigateTo} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class FarmAdministrationContainer extends Component<{}> {

    onRenderContent = () => {
        const {language} = this.props
        return (<ListItem
            title= {I18n.t('myAccount', {locale:language})}
            onPress={() => navigateTo("myAccount")}
            profileIcon={farmAdminIcons.iconFarmAdmin} />);
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.appContainer}>
                <FarmAdministration
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('farmAdministration', {locale:language})}
                    renderContent={this.onRenderContent()}
                    language={language}
                />
                <Footer 
                 language={language}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(FarmAdministrationContainer));
