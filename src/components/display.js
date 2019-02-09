import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Display = (props) => {
    return (<>
                <div className="row">
                    <input className="col-12 display" value={props.value} readOnly/>
                </div>
            </>)
}

export default Display;