/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class LayoutAdmin extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: '', filteredHistory: [] };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.filterHistory = this.filterHistory.bind(this);
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

	componentDidUpdate(prevProps) {
		if (this.props.history !== prevProps.history) {
			this.filterHistory();
		}
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		this.filterHistory();
		event.preventDefault();
	}

	filterHistory() {
		this.setState({
			...this.state,
			filteredHistory: this.state.value ? this.props.history.filter(operation => operation.includes(this.state.value)) : this.props.history,
		});
	}

	render() {
		return (
			<div className="layout">
				{this.props.children}
				<div className="container-left">
					<button onClick={() => this.props.toggleHistoryList()}>List</button>
					{this.props.historyVisible &&
					<form onSubmit={this.handleSubmit}>
						<label>
							Search:
							<input type="text" value={this.state.value}
							       onChange={this.handleChange}/>
						</label>
						<ul>
							{this.state.filteredHistory.map((operation, index) => <li
								key={index}>{operation}</li>)}
						</ul>
					</form>
					}
				</div>
			</div>
		);
	}
}

LayoutAdmin.propTypes = {
	history: PropTypes.array,
	historyVisible: PropTypes.bool,
	toggleHistoryList: PropTypes.func,
	onSpacePress: PropTypes.func,
};

const mapStateToProps = state => ({
	history: state.history,
	historyVisible: state.historyVisible,
});

const mapDispatchToProps = dispatch => ({
	toggleHistoryList: () => dispatch({ type: 'TOGGLE_HISTORY_LIST'}),
	onSpacePress: () => dispatch({ type: 'RANDOM_OPERATION_GENERATION'})
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LayoutAdmin)