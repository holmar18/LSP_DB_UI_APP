import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import './mainScreen.css';

 
class AddScreen extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      name: "",
      description: undefined,
      update: false,
      updateId: undefined,
    };
  }

  componentDidMount() {
    // Ef það er update en ekki nýtt þá setja props með description og name sem state svo það hlaðist i input
      if (this.props.itemId !== undefined) { 
        if(this.props.itemId.location.data !== undefined) {
          this.setState({ name: this.props.itemId.location.data.name})
          this.setState({ updateId: this.props.itemId.location.data.id})
          this.setState({ description: this.props.itemId.location.data.description})
          this.setState({ update: !this.state.update })
        } else { this.props.itemId.history.goBack() }
      }

 }

  saveNewToServer = () => {
    const { name, description, update, updateId } = this.state;
    var id = (update !== false ? updateId : this.props.location.dataLength)
    var currentDate = new Date();
    let data = { id: id , date: currentDate, name: name, description: description}
    if (data.id !== undefined && data.name !== undefined && data.description !== undefined) {
      fetch((update ?  `http://localhost:4000/mix/new/${updateId}` : `http://localhost:4000/mix/new`), {
          method: (update ? 'PATCH' : 'POST'),
          headers: { 'Content-Type': 'application/json', 'Access-Control-Request-Method' : 'PATCH' },
          body: JSON.stringify(data)
      }).then(data => {
          if (data.status === 200 ) { 
            this.props.alert.show(`${name} hefur verið vistað`, { type: 'success'})
          } else {
            this.props.alert.show(`Villa kom upp`, { type: 'error'})
          }
      })
    } else {
      this.props.alert.show(`Villa kom upp nafn/lýsingu vantar`, { type: 'error'})
    }
    this.setState({ name: "" });
    this.setState({ description: "" });
    this.setState({ updateId: undefined });
  }

  inputhandler = (e) => {
    if (e.target.placeholder === "Lýsing") { this.setState({ description: e.target.value}); }
    else { this.setState({ name: e.target.value}); }
  }

  back = () => {
    if (this.props.itemId !== undefined) { this.props.itemId.history.push('/main', { logedIn: true })}
    else { this.props.history.push('/main', {logedIn: true}) }
  }


    render() {
      const { name, description, update } = this.state;


        if (this.props.itemId === undefined && this.props.history.location.logedIn === undefined) { 
          this.props.history.push('/');
        }




        return (
            <div className='container'>

                {/* Search Box */}

                <form className="form-inline active-pink-3 active-pink-4 searchBoxNew">
                    <div className="nameAddnew">
                        <input className="form-control form-control-sm ml-3 w-50 searchForm nameaddInput" type="text" 
                               placeholder="Nafn"
                               value={name}
                               onChange={e => this.inputhandler(e)}
                        />
                    </div>
                    <div className="AddnewTextAreaContainer">
                        <textarea className="form-control col-xs-12 textArea" 
                                  placeholder='Lýsing'
                                  value={description}
                                  onChange={e => this.inputhandler(e)}>
                        </textarea>
                    </div>
                    <div className='btn-new'>
                        <button type="button" className="btn btn-danger addBtn newbtn" 
                                              onClick={(e) => this.saveNewToServer(e.target.value)}>
                                              {(update ? 'Uppfæra' : 'Skrá')}
                        </button>
                        <div className="btn btn-danger addBtn newbtn newbtnBack" onClick={ this.back }>Hætta</div>
                    </div>
                </form>
            </div>
        )
    }
}
 
export default withAlert()(AddScreen);