import React from 'react';


export default class PrintMe extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
        };
      }

      render() {

        return (
            <div>
                <p><u>Nafn</u>:</p>
                <h6>{this.props.data.name}</h6>
                <br />
                <p><u>Aðferð</u>:</p>
                <p>{this.props.data.description}</p><br />
            </div>
        )
      }
}