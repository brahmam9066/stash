import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, DrawerLayoutAndroid, Dimensions} from "react-native";

const {width} = Dimensions.get("window");

const propTypes = {
    children: PropTypes.element,
    handleNavigationView: PropTypes.element,
    handleMapElement: PropTypes.func
};

const defaultProps = {
    children: <Text>Drawer</Text>,
    handleNavigationView: <Text>Navigation View</Text>,
    handleMapElement: () => {}
};

class DrawerAndroid extends Component<{}> {

    render() {
        return (
            <DrawerLayoutAndroid
                drawerWidth={width - 90}
                onDrawerClose={() => {}}
                ref={node => this.props.handleMapElement(node)}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => this.props.handleNavigationView}>
                {this.props.children}
            </DrawerLayoutAndroid>
        );
    }
}

DrawerAndroid.defaultProps = defaultProps;

DrawerAndroid.propTypes = propTypes;

export default DrawerAndroid;
