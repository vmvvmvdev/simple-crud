import React, {Component} from 'react';
import Navbar from './Navbar';
import Pagination from 'react-js-pagination';
import UserAPIService from '../../sevices/UserAPIService';
import './Table.css';


class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0,
            page: 1,
            userDocs: [],
            totalDocs:0,
            thKeys:["email", "firstName", "lastName", "birthdate", "description"],
            currentUser:null
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.expandTable = this.expandTable.bind(this);
        this.selectUserToEdit = this.selectUserToEdit.bind(this);
        this.newUser = this.newUser.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    async componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
        const userData = await UserAPIService.getUsers()
        this.setState({
            userDocs: [...userData.docs],
            totalDocs:userData.totalDocs
        });
    }

    updateDimensions() {
        let windowWidth = typeof window !== "undefined"
            ? window.innerWidth
            : 0;
        let windowHeight = typeof window !== "undefined"
            ? window.innerHeight
            : 0;
        const thKeys = windowWidth > 480?["email", "firstName", "lastName", "birthdate", "description"]:["firstName"];
        this.setState({windowWidth, windowHeight, thKeys});
    }

    async handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        const userData = await UserAPIService.getUsers(pageNumber)
        this.setState({
            userDocs: [...userData.docs],
            totalDocs:userData.totalDocs,
            page: pageNumber
        });
      }

    expandTable() {
        if(this.state.thKeys.length === 1) {
            this.setState({
                thKeys:["email", "firstName", "lastName", "birthdate", "description"]
            });
        }
    }

    selectUserToEdit (docData) {
        return ()=> {
            this.setState({currentUser:{...docData}})}
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    newUser(){
        this.setState({currentUser:{
            _id:'new',
            email:'',
            firstName:'',
            lastName:'',
            birthdate:'',
            description:''
        }})
    }

    async closeEdit() {
        const userData = await UserAPIService.getUsers(this.state.page)
        this.setState({
            userDocs: [...userData.docs],
            totalDocs:userData.totalDocs,
            currentUser:null
        });
    }

    render() {

        const thKeys = this.state.thKeys;

        const rowsData = this.state.userDocs.map(doc=>{
            const rowData = <tr onClick={this.selectUserToEdit(doc)} key={doc._id}>{thKeys.map((key, index)=><td key={index}>{doc[key]}</td>)}</tr>
            return rowData;
        })

        return (
            <div >
                <Navbar/>
                <button onClick={this.newUser}  className="btn" style={{width:'125px', marginLeft:'10%'}}>new user</button>
                {this.state.currentUser==null?<h1 style={{marginLeft:'10%'}}>select user to edit</h1>:<EditForm closeEdit={this.closeEdit} user={this.state.currentUser}/>} <div className='tableContainer'>
                    <table id="users" onClick={this.expandTable}>
                        <tbody>
                            <tr>
                                {thKeys.map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                            {rowsData}
                        </tbody>
                    </table>
                    <Pagination activePage={this.state.page} itemsCountPerPage={20} totalItemsCount={this.state.totalDocs} pageRangeDisplayed={3} onChange={this.handlePageChange} /> 
                </div>
                
            </div>
        );
    }
}

export default Table;

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {...props.user, birthdate:formatDate(props.user.birthdate)} }
        this.handleChange = this.handleChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }
    handleChange(event) {
        console.log(event);
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({ user: {...nextProps.user, birthdate:formatDate(nextProps.user.birthdate)} })
    }

    async deleteUser() {
        await UserAPIService.removeUser(this.state.user._id);
        this.props.closeEdit();
    }

    async saveChanges() {
        if(this.state.user._id !== 'new') {
            await UserAPIService.updateUser({...this.state.user});
        } else {
            const{_id, ...rest} = this.state.user;
            await UserAPIService.createUser(rest);
        }
        this.props.closeEdit();
    }

    render() { 


        const formContent = Object.entries(this.state.user).map(entry=>{
            const key = entry[0];
            const value = entry[1];
            if(key==='_id') return (<h2 key={key}>{value}</h2>);
            return (
            <div key={key}>  
            <label htmlFor={key}>
            <b>{key}</b>
            </label>
            <input
            value={this.state.user[key]}
            onChange={this.handleChange}
            type={key==='birthdate'?'date':'text'}
            placeholder={`Enter ${key}`}
            name={key}
            />
            </div>  
            );
        })

        return ( 
            <div className="container">
                {formContent}
                <button onClick={this.saveChanges}  className="btn">save changes</button>
                <br/>
                <button onClick={this.deleteUser}  className="btn">delete user</button>
            </div>
         );
    }
}
 
