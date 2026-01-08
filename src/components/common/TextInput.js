import React from 'react';

const TextInput = ({ id, label, value, onChange, type = "text", required = false }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}: </label>
            <input
                type={type}
                id={id}
                className="form-control"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default TextInput;
