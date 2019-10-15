import {connect} from "react-redux";
import React, {Component} from "react";

export default (ChildComponent) => {

    class ComposedComponent extends Component<{}> {

        componentDidMount() {
            this.props.handleEmptyCattleSearch();
        }

        componentWillUnmount() {
            this.props.handleEmptyCattleSearch();
        }

        render() {
            const {language} = this.props
            return (
                <ChildComponent {...this.props} 
                language={language}/>
            );
        }
    }

    const mapStateToProps = state => ({
    language: state.localeReducer.language
    });

    const mapDispatchToProps = dispatch => ({
        handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"})
    });

    return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
