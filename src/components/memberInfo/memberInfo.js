import React from 'react';
import PropTypes from 'prop-types';

import styles from './memberInfo.less';

export default class MemberInfo extends React.PureComponent {
    static propTypes = {
        first_name: PropTypes.string,
        last_name: PropTypes.string,
    };

    static defaultTypes = {
        first_mame: '',
        last_name: '',
    };

    render() {
        const { first_name, last_name } = this.props;

        return (<h1 className={styles.fullName}>{first_name} {last_name}</h1>)
    }
}