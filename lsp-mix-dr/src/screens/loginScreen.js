import React, { Component } from 'react';
import $ from 'jquery';

//Style sheed
import './mainScreen.css';
 
class LoginScreen extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      UserName: "",
      password: "",
      canLogin: false
    };
  }

  componentDidMount() {
      // Jquery Code Section Animations
      $('.containerLogin').css({ opacity: 0, visibility: "visible"}).animate({transform: 'scale(4)',opacity: 1}, 1500);
      //$('.userlable').animate({ marginTop: "80px" }, 1500 ).animate({ marginTop: "0" }, 800 );
 }

  inputhandler = (e) => {
    if (e.target.type === "password") { this.setState({ password: e.target.value}); }
    else { this.setState({ UserName: e.target.value}); }
  }


  checkCredentials = () => {
    const { UserName, password, canLogin } = this.state;
    let dataToSend = { name: UserName, password: password}
    fetch(`http://localhost:4000/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    }).then(data => {
        if (data.status === 200 ) { this.setState({ canLogin: !canLogin })
            this.props.history.push('/main', {logedIn: true})
        }
    })
  }




    render() {

        const { UserName, password } = this.state;


        return (
            <div className='containerLogin'>

                {/* Search Box */}

                <form className='loginFormGrp'>
                    <div className="form-group">
                        <label className="userlable">Notandi</label>
                        <input type="text" className="form-control"
                                            value={UserName} 
                                            onChange={e => this.inputhandler(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Lykilorð</label>
                        <input type="password" className="form-control" 
                                               value={password} 
                                               onChange={e => this.inputhandler(e)}
                        />
                    </div>
                </form>
                <button className="btn btn-primary loginbtn" onClick={() => this.checkCredentials()}>Innskrá</button>
            </div>
        )
    }
}
 
export default LoginScreen;
