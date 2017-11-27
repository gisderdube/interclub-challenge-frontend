import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter } from 'lodash';
import moment from 'moment';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconButton from 'material-ui/IconButton';
import SwipeableViews from 'react-swipeable-views';

import { getMember } from '../actions/members';
import { getTransactions } from '../actions/transactions';

import MemberInfo from '../components/memberInfo/memberInfo';
import TransactionsChart from '../components/transactionsChart/transactionsChart';
import TransactionTable from '../components/transactionsTable/transactionsTable';

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
            range: 0,
            slideIndex: 0,
            filteredTransactions: [],
            chartData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredTransactions: nextProps.transactions
        })
    }

    componentWillMount() {
        this.props.getMember(this.props.match.params.id);
        this.props.getTransactions(this.props.match.params.id);
    }

    getChartData() {
        return this.state.filteredTransactions.map(item => {
            let amount = item.amount;

            if(item.type === 'expense') {
                amount = -amount;
            }
            return {name: moment(item.date).calendar(), value: amount}
        }).reverse();
    }

    handleChange(event, index, value){
        const range = value >> 0;

        const filteredTransactions = range ? filter(this.props.transactions, item =>
            moment(item.date).isSameOrAfter(moment().subtract(value, 'month'))) : this.props.transactions;

        this.setState({ filteredTransactions, range });
    }

    handleTabChange(index){
        this.setState({ slideIndex: index })
    }

    handleBackIconClick(){
        this.props.history.push('/');
    }

    render() {
        return (<div>
            <Toolbar>
                <ToolbarGroup>
                    <IconButton
                        tooltip="Back to members"
                        onTouchTap={::this.handleBackIconClick}
                    >
                        <BackIcon/>
                    </IconButton>
                    <ToolbarTitle text="Transactions" />
                    <ToolbarSeparator/>
                    <DropDownMenu value={this.state.range} onChange={::this.handleChange}>
                        <MenuItem value={0} primaryText="Overall" />
                        <MenuItem value={1} primaryText="Last 1 month" />
                        <MenuItem value={3} primaryText="Last 3 month" />
                        <MenuItem value={6} primaryText="Last 6 month" />
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
            <MemberInfo {...this.props.activeMember} />
            <Tabs
                onChange={::this.handleTabChange}
                value={this.state.slideIndex}
            >
                <Tab label="History" value={0} />
                <Tab label="Chart" value={1} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={::this.handleTabChange}
            >
                <TransactionTable data={this.state.filteredTransactions}/>
                <TransactionsChart data={::this.getChartData()}/>
            </SwipeableViews>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)