import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqBy, filter, keys } from 'lodash';
import moment from 'moment';

import { getMember } from '../actions/members';
import { getTransactions } from '../actions/transactions';

import Slider from '../components/slider/slider';
import MemberInfo from '../components/memberInfo/memberInfo';
import Transaction from '../components/transaction/transaction';

const mapStateToProps = state => ({
    activeMember: state.members.activeMember,
    transactions: state.transactions.list
});

const mapDispatchToProps = dispatch => ({
    getMember: bindActionCreators(getMember, dispatch),
    getTransactions: bindActionCreators(getTransactions, dispatch)
});

class Member extends React.PureComponent {
    static propTypes = {
        getTransactions:PropTypes.func.isRequired,
        activeMember: PropTypes.object.isRequired,
        transactions: PropTypes.array.isRequired,
        getMember: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    };

    constructor() {
        super();

        this.state = {
            datesMap: {},
            sliderPosition: 0,
            filteredTransactions: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            datesMap: this.getDatesMap(nextProps.transactions),
            sliderPosition: this.prepareDataForSlider(nextProps.transactions).length,
            filteredTransactions: nextProps.transactions
        })
    }

    componentWillMount() {
        this.props.getMember(this.props.match.params.id);
        this.props.getTransactions(this.props.match.params.id);
    }

    getDatesMap(transactions) {
        let map = {};

        this.prepareDataForSlider(transactions).forEach((item, index) => {
            map[index] = item.date;
        });

        return map;
    }

    onSliderChange(event) {
        let sliderPosition = event.target.value >> 0;

        let filteredTransactions = filter(this.props.transactions, item =>
            moment(item.date).isSameOrBefore(this.state.datesMap[keys(this.state.datesMap).length - 1 - sliderPosition]));

        this.setState({ filteredTransactions, sliderPosition });
    }

    prepareDataForSlider(data = this.props.transactions) {
        return uniqBy(data, item => new Date(item.date).toLocaleDateString());
    }

    render() {
        return (<div>
            <MemberInfo {...this.props.activeMember} />
            <Slider
                data={this.prepareDataForSlider()}
                sliderPosition={this.state.sliderPosition}
                onChange={::this.onSliderChange}
            />
            {this.state.filteredTransactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)