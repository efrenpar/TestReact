import * as React from 'react';
import axios from 'axios';

export default class Search extends React.Component<any, any>{
  
    
    constructor (props:any){
        super(props);

        this.state = {
            nombres : '',
            data:[]
        }
    }

    changeHandler = (e:any)=>{
        var key = e.key;
        if(key === "Enter"){
            var value = e.target.value;
            this.setState({[e.target.name]:value});
            
            axios.post("https://app.crmetric.com/srv-crmetric-web/rest/usuario/listarUsuarioxnombre",{[e.target.name]:value})
                 .then(response=>{ 
                     var data = response.data.data;

                     data.forEach((element: any) => {
                          element.fecha_actualizacion = element.fecha_actualizacion.split(" ")[0];
                          element["apellidos"] = element.primer_apellido +" "+ element.segundo_apellido 
                     });

                     this.setState({data:data});
                     this.props.handleSearch(this.state);
                     console.log(this.state)
                 })
                 .catch(error=>{
                    console.log(error)
                 })
        }
    } 

    public render() {

        return <div className="container mt-5 mb-5">
        <div className="row">
          <div className="card">
            <div className="row">
            <div className="col-2">
              <h4>Usuario: </h4>
            </div>
            <div className="col-4 ms-2">
              <div className="e-input-group e-float-icon-left">
                <span className="e-input-group-icon e-input-date" />
                <div className="e-input-in-wrap">
                    <input className="e-input" 
                    name="nombres"
                    type="text" 
                    placeholder = "Buscar" 
                    onKeyPress= {this.changeHandler}/>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    }
};