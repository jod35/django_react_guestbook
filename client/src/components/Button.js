import React from 'react';


const Button = ({ value, onClick }) => {
    return (
        <div className='form-group'>
            <input type='submit' value={value} onClick={onClick} />
        </div>
    )
}


export { Button }