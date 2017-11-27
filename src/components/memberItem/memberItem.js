import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import UserAvatar from 'material-ui/svg-icons/social/person';

import styles from './memberItem.less';

const MemberItem = ({ member, selectCallback }) => (
    <Card className={styles.memberItem}>
        <CardHeader
            title={`${member.first_name} ${member.last_name}`}
            subtitle={`${member.email || '******************'}`}
            avatar={<Avatar icon={<UserAvatar/>}/>}
        />
        <CardActions>
            <FlatButton label="See transactions" onTouchTap={() => selectCallback(member.id)}/>
        </CardActions>
    </Card>
);

MemberItem.propTypes = {
    member: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string
    }),
    selectCallback: PropTypes.func.isRequired
};
MemberItem.defaultProps = {
    member: {
        first_name: '',
        last_name: ''
    }
};

export default MemberItem;
