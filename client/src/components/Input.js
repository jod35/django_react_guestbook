import React from 'react';

const Input = ({ label, value, onChange, htmlfor }) => {
    return (
        <div className='input'>
            <label htmlFor={htmlfor} className='label'>{label}</label>
            <input type='text' value={value} onChange={onChange} className='form-control' />
        </div>
    )
}

export { Input }