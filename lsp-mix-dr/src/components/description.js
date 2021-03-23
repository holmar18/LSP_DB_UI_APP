import React, { useRef } from 'react';
import '../screens/mainScreen.css';
import {Link} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import PrintMe from './descriptionToPrint';

const Description = (data) => {
    const componentRef = useRef();

    return (
        <div>
            <PrintMe data={data.data} ref={componentRef}/> 
            <ReactToPrint 
                                                  trigger={() => <button className="btn btn-danger print">Prenta</button>} 
                                                  content={() => componentRef.current}
                                    />
                                    <Link to={{
                                        pathname: `/new/${data.data.id}`,
                                        data: data.data,
                                        logedIn: true
                                    }} className="btn btn-danger addBtn changeButton">Breyta</Link>
        </div>
    )
}

export default Description;