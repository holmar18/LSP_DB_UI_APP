import React, { Component } from 'react';
import './mainScreen.css';
import AddScreen from './addScreen'
import {Link} from 'react-router-dom';
import { ChevronDown } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Description from '../components/description';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
      orderedData: [],
      orderedDataLength: 0,
      search: '',
      addNew: false,
      logedIn: false,
      accordiumDown: 0,
      elementStorage: [],
      print: false
    };
  }
 
  componentDidMount() {
    fetch('http://localhost:4000/mix')
      .then(response => response.json())
      .then(Fetchdata => {
        var autlstCmpl = []
        this.setState({ data: Fetchdata});
        const ordered = Fetchdata.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({ orderedData: ordered});
        this.setState({ orderedDataLength: ordered.length});

        // STORED FOR LATER FEATURE: DYNAMIC SEARCH SUGESTIONS
        for (var i=0; i < ordered.length; i++) {
            autlstCmpl.push(ordered[i].name.toLowerCase())
        }
        this.setState({ autoComplete: autlstCmpl})
      })
  }

  backFromNew = () => {
      this.setState({ addNew: false })
  }

  /* Filter the search result*/
  filterFromSearch = (value) => {
    const { orderedData, data } = this.state;
    if (value.target.value.length === 0) {
        const ordered = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({ orderedData: ordered });
    }

    this.setState({ search: value.target.value });
    try {
      for (let i = 0; i < value.target.value.length; i++) {
        let reducedArray = orderedData.filter((contact) => contact.name[i].toLowerCase() === value.target.value[i].toLowerCase() || contact.name.indexOf(value) !== -1)
        this.setState({ orderedData: reducedArray });
      }
    } catch(err) {  }
  }

  // FUNCTION er notað i login til að fá Staðfestingu og breyta STATE 
  checkLoginValidation = () => {
    this.setState({ logedIn: !this.state.logedIn})
  }

  backFromNew = () => {
      this.setState({ logedIn: true})
      this.setState({ addNew: false})
  }

  fixDate = (date) => {
    var createdDate = new Date(date);
    return createdDate.getDate() + '/' + createdDate.getMonth() + '/' + createdDate.getFullYear();
  }


  accordArrowChange = (e) => {
    // Animation for the arrows if the accordium is clicked rotates 180 degrees "Bugged ATM"
    const { accordiumDown } = this.state;
    var { elementStorage } = this.state;

    if (e.target.childNodes[1] !== undefined) {
      if (accordiumDown === 0 ) {
        // Add Rotation to arrow if closed
        e.target.childNodes[1].classList.add('ArrowRotationIn');
        this.setState({ accordiumDown: 1 })

        // Add it to Array if user clicks another Accordion link
        //elementStorage.push(e.target.childNodes[1])

        // That Element contains the previous rotation remove it
        for (var i=0; i < elementStorage.length; i++ ) {
          if (!elementStorage[i].classList.contains('ArrowRotationout') && !elementStorage[i].classList.contains('ArrowRotationIn')) {
            elementStorage.splice(i, 1);
          }
          if (elementStorage[i].classList.contains('ArrowRotationout')) {
            elementStorage[i].classList.remove('ArrowRotationout')
          }
        }
      
      } else {
        e.target.childNodes[1].classList.add('ArrowRotationout');
        this.setState({ accordiumDown: 0 })

        // Add it to Array if user clicks another Accordion link
        //elementStorage.push(e.target.childNodes[1])

        for (var n=0; n < elementStorage.length; i++ ) {
          if (elementStorage[n].classList.contains('ArrowRotationIn')) {
            elementStorage[n].classList.remove('ArrowRotationIn')
          }
          if (!elementStorage[n].classList.contains('ArrowRotationout') && !elementStorage[n].classList.contains('ArrowRotationIn')) {
            elementStorage.splice(n, 1);
          }
        }
      }
      elementStorage.push(e.target.childNodes[1])
    }
  }

  render() {

    const { orderedData, addNew, orderedDataLength } = this.state;

    if (this.props.location.state === undefined) {
      this.props.history.goBack()
    }


    if (orderedData && !addNew) {
        return (
            <div className='container'>

                {/* Search Box */}

                <form className="form-inline active-pink-3 active-pink-4 searchBox">
                    <input className="form-control form-control-sm ml-3 w-50 searchForm" type="text" placeholder="Leita" aria-label="Search" onChange={(search) => this.filterFromSearch(search)} />
                    <Link to={{ pathname: '/new', 
                                logedIn: true,
                                dataLength: orderedDataLength
                              }}className="btn btn-danger addBtn">Bæta við</Link>
                    <Link to='/' className="btn btn-danger addBtn logout">Útskrá</Link>
                </form>
                    


                {/* Item Container */}
                <Accordion defaultActiveKey='0'>
                    { orderedData.map((item, index) => {
                        return (
                              <Card key={item.id}>
                                <Card.Header>
                                  <Accordion.Toggle as={Button} variant="link" eventKey={index + 1} className="dropDownLink">
                                    {item.name}
                                    <ChevronDown color="#8c8c8c" size={20}  className="accordiumArrowDown" /> 
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index + 1}>
                                  <Card.Body>
                                    <p><b>Uppfært: {this.fixDate(item.date)}</b></p>
                                    <Description data={item} />
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                        )
                    }) }
                    </Accordion>
            </div>
        )
    } 
    else if (addNew) {
        return (
            <div className='container'>
                <AddScreen backFromNew={this.backFromNew}  dataLength={orderedDataLength}/>
            </div>
        )
    }
    else {
        return (
            <h1>Loading</h1>
        )
    }
 }
}