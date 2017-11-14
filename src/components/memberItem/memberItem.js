import React from 'react';
import PropTypes from 'prop-types';

import styles from './memberItem.less';

const MemberItem = ({ member, selectCallback }) => (
    <div className={styles.memberItem} onClick={() => selectCallback(member.id)}>
        <h2 className={styles.memberName}>
            {member.first_name}&nbsp;{member.last_name}
        </h2>
    </div>
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
