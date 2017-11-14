import React from 'react';
import PropTypes from 'prop-types';

import styles from './transaction.less';

export default class Transaction extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        amount: PropTypes.number,
        type: PropTypes.string,
        member: PropTypes.string,
        date: PropTypes.string
    };

    static defaultTypes = {
        id: '',
        amount: 0,
        type: '',
        member: '',
        date: ''
    };

    render() {
        const { amount, type, date } = this.props;

        return (<div className={styles.transaction}>
            <div className={styles.date}>{new Date(date).toLocaleString()}</div>
            <div className={styles.type}>{type}</div>
            <div className={styles.amount}>{amount}</div>
        </div>)
    }
}