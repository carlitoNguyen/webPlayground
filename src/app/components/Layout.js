/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import LayoutAdmin from './LayoutAdmin';
import LayoutDevelopper from './LayoutDevelopper';
import { ADMIN, DEVELOPER } from '../constant/role.constant';

class Layout extends React.Component {
	render() {
		switch (this.props.role) {
		case ADMIN:
			return (<LayoutAdmin>{this.props.children}</LayoutAdmin>);
		case DEVELOPER:
			return (<LayoutDevelopper>{this.props.children}</LayoutDevelopper>);
		default:
			return (
				<div className="layout">{this.props.children}</div>
			);
		}
	}
}

Layout.propTypes = {
	role: PropTypes.string,
};

const mapStateToProps = state => ({
	role: state.user,

});

export default connect(
	mapStateToProps
)(Layout)
