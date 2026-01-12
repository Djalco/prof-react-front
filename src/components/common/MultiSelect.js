import React, { Component } from 'react';

class MultiSelect extends Component {
    handleChange = (evt) => {
        const options = evt.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(parseInt(options[i].value));
            }
        }
        this.props.onChange(selectedValues);
    }

    render() {
        const { label, options, selected, idKey, labelKey, labelFormatter, disabled } = this.props;

        return (
            <div className="mb-3">
                <label className="form-label">{label}</label>
                <select
                    multiple
                    className="form-select"
                    value={selected}
                    onChange={this.handleChange}
                    disabled={disabled}
                    style={{ height: '150px' }}
                >
                    {options.map(option => (
                        <option key={option[idKey]} value={option[idKey]}>
                            {labelFormatter ? labelFormatter(option) : option[labelKey]}
                        </option>
                    ))}
                </select>
                <small className="form-text text-muted">
                    Maintenez Ctrl (Cmd sur Mac) pour sélectionner plusieurs éléments
                </small>
            </div>
        );
    }
}

export default MultiSelect;
