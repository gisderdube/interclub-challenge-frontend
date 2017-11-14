import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MembersActions from '../actions/members';
import MemberItem from '../components/memberItem/MemberItem';

const mapStateToProps = state => ({
    members: state.members
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MembersActions, dispatch)
});

class MemberList extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            getMembersList: PropTypes.func.isRequired
        }),
        members: PropTypes.shape({
            list: PropTypes.array.isRequired
        })
    };

    componentWillMount() {
        this.props.actions.getMembersList();
    }

    onMemberSelected(memberId) {
        this.props.history.push(memberId);
    }

    render() {
        const mappedMembers = this.props.members.list.map(member =>
            <MemberItem
                member={member}
                key={member.id}
                selectCallback={::this.onMemberSelected}
            />);

        return (
            <div className='membersWrapper'>
                {mappedMembers}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)
