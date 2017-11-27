import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './transactionsTable.less';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class TransactionsTable extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array
    };

    static defaultProps = {
        data: []
    };

    render() {
        return (
            <Table className={styles.transactionsTable}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Type</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.data.map(transaction => (
                        <TableRow key={transaction.id}>
                            <TableRowColumn>{moment(transaction.date).calendar()}</TableRowColumn>
                            <TableRowColumn>{transaction.type}</TableRowColumn>
                            <TableRowColumn>{transaction.amount}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}