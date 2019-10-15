/**
* @author Vineet Mishra <vineet.m@photoninfotech.net>
* @version 1.0.0
* @summary Main Screen for the application.
* @description This is the Main Screen of the application.
*/

/**
* @import React compoment from "react" for creating custom react component and to use lifecycle
* hooks come along with react.
* @import StatusBar, View from "react-native" for creating our view.
* @import connect from "react-redux" for connecting react compoenent with redux which will convert
* our component as container component.
*/
import {connect} from "react-redux";
import React, {Component} from "react";
import {StatusBar, View, NetInfo, Alert} from "react-native";
// import BackgroundTask from "react-native-background-task";
// import Config from 'react-native-config'

import ErrorModalSmall from "./containers/ErrorModalSmall";
import Routes from "./components/Routes";
import Loaderer from "./components/Loader";

const styles = {
    appContainer: {
        flex: 1
    }
};

/**
* @class Main
* @extends Component
* @summary Represents Main class.
* @description This is a Main class. It extends react Component class for using the functions comes along with it.
*/
class Main extends Component<{}> {


    /**
    * @function render: Its one of the main functions of react component. It renders the JSX on the screen
    * In render() we are showing the Status Bar with backgroundColor as white.
    */
    render() {
        const {isLoggedIn, isServerError} = this.props;
        return (
            <View style={styles.appContainer}>
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <Routes isLoggedin={isLoggedIn} />
                <ErrorModalSmall />
                <Loaderer />
            </View>
        );
    }
}

/**
* Converting redux state to props for the Login component
* @function mapStateToProps: It takes redux state as params and converts it as props for the above component.
* @params {object} state: redux state fetched from store
* @returns {object} props: converted props which can be used in the above component.
*/
const mapStateToProps = state => ({
    isLoggedIn: state.authReducer.isLoggedIn
});

/**
* Converting functions to props for the Login component
* @function mapDispatchToProps: It takes dispatch as params and further pass it to the methods
* with given payloads.
* The methods are converted into props and passed to the Login Component for use
* @params {function} dispatch: It dispatches action to the reducer
* @returns {object} props: Its converted props and have methods.
*/
const mapDispatchToProps = dispatch => ({
    dispatch
});

/**
* @function connect: It takes "mapStateToProps" and "mapDispatchToProps" which converts state and methods
* as props for the component.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Main);
