import React from 'react';
import PropTypes from 'prop-types';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

export default class TrasactinsChart extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array
    };

    static defaultPtops = {
        data: []
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.data.length) {
            nextProps.data.map(item => {
                item.label = item.value > 0 ? 'income : ' : 'expense : ';
                return item;
            })
        }
    }

    tooltipFormatter(value) {
        if (value > 0) {
            return 'income : ' + value;
        } else {
            return 'expense : ' + value;
        }
    }

    render() {
        return (
            <AreaChart width={600} height={400} data={this.props.data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}
                       style={{margin: '20px auto'}}
            >
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip separator='' formatter={::this.tooltipFormatter} />
                <Area type='monotone' dataKey='value' name=' ' stroke='#8884d8' fill='#8884d8' unit={'$'} />
            </AreaChart>
        );
    }
}