import * as React from 'react';
import Grid from './gird'
import Search from './search'
import Form from './form';

export default class SearchContainer extends React.Component<any, any>{
    
    constructor (props:any){
        super(props);

        this.state = {
            data:[],
            "change":""
        }
    }

    handleSearch = (data:any)=>{
        this.setState(data);
    }

    userShow = (user:any)=>{
        this.setState(user);
        
    }

    checkChange(checked:any){
        this.setState({"change":checked});
    }


    public render() {

        return <div>
            <Search handleSearch = {this.handleSearch}/>
            <Grid datita = {this.state.data} userShow = {this.userShow} change = {this.state.change}/>
            <Form user = {this.state} checkChange={this.checkChange}/>
        </div>
    }
};