import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {first, last} from 'lodash';

import styles from './slider.less';

class Slider extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        sliderPosition: PropTypes.number
    };

    render() {
        return this.props.data.length ? (<div className={styles.sliderWrapper}>
            <span>{moment(last(this.props.data).date).calendar()}</span>
            <input
                type="range"
                list="tickmarks"
                onChange={this.props.onChange}
                disabled={this.props.data.length < 1}
                min="0"
                max={this.props.data.length - 1}
                step="1"
                value={this.props.sliderPosition}
                data-index={this.props.sliderPosition}
            />
            <datalist id="tickmarks">
                {this.props.data.map((item, index) =>
                    <option key={index} value={index} />)}
            </datalist>
            <span>{moment(first(this.props.data).date).calendar()}</span>
        </div>) : null;
    }
}

export default Slider;