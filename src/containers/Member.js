import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMember } from '../actions/members';
import { getTransactions } from '../actions/transactions';

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

    componentWillMount() {
        this.props.getMember(this.props.match.params.id);
        this.props.getTransactions(this.props.match.params.id);
    }

    render() {
        return (<div>
            <MemberInfo {...this.props.activeMember} />
            {this.props.transactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)