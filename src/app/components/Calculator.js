/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<label className="content-header-label">Calculation</label>
				<div className="content-header info">{this.props.operation}</div>
				<label className="content-header-label">Result</label>
				<div className="content-header success">{this.props.result}</div>
				<div className="content">
					<div className="content-center">
						<div>
							<button onClick={() => this.props.onUpdate('1')}>1</button>
							<button onClick={() => this.props.onUpdate('2')}>2</button>
							<button onClick={() => this.props.onUpdate('3')}>3</button>
						</div>
						<div>
							<button onClick={() => this.props.onUpdate('4')}>4</button>
							<button onClick={() => this.props.onUpdate('5')}>5</button>
							<button onClick={() => this.props.onUpdate('6')}>6</button>
						</div>
						<div>
							<button onClick={() => this.props.onUpdate('7')}>7</button>
							<button onClick={() => this.props.onUpdate('8')}>8</button>
							<button onClick={() => this.props.onUpdate('9')}>9</button>
						</div>
						<div>
							<button className="clear" onClick={this.props.onReset}>C</button>
							<button onClick={() => this.props.onUpdate('0')}>0</button>
							<button onClick={() => this.props.onUpdate('.')}>.</button>
						</div>
					</div>
					<div className="content-left">
						<button onClick={() => this.props.onUpdate('+')}>+</button>
						<button onClick={() => this.props.onUpdate('-')}>-</button>
						<button onClick={() => this.props.onUpdate('/')}>/</button>
						<button onClick={() => this.props.onUpdate('*')}>x</button>
					</div>
				</div>
				<div className="content-footer">
					<button onClick={this.props.onSubmit}>=</button>
				</div>
			</div>
		);
	}
}

Calculator.propTypes = {
	onSubmit: PropTypes.func,
	onReset: PropTypes.func,
	onUpdate: PropTypes.func,
	operation: PropTypes.string,
};

const mapStateToProps = state => ({
	operation: state.operation,
	result: state.result,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: () => dispatch({ type: 'SUBMIT'}),
	onReset: () => dispatch({ type: 'RESET'}),
	onUpdate: (data) => dispatch({ type: 'UPDATE', data}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Calculator)
