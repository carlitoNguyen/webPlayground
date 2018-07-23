/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LayoutDevelopper extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e) {
		if (e.keyCode === 32) {
			this.props.onSpacePress();
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		return (<div className="layout">{this.props.children}</div>);
	}
}

LayoutDevelopper.propTypes = {
	onSpacePress: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
	onSpacePress: () => dispatch({ type: 'RANDOM_OPERATION_GENERATION'})
});

export default connect(
	mapDispatchToProps
)(LayoutDevelopper)
