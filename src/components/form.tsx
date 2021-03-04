import * as React from 'react';
import TelephoneInput from './maskedInput';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import axios from 'axios';


export default class Form extends React.Component<any, any>{

    constructor (props:any){
        super(props);

        this.state = {
            "change":"0"

        }
    }
    
    chequearEstad(estado:any){

        if(estado === "Activo"){
            return true;
        }else{
            return false;
        }

    }

    handleInput = (e:any)=>{
        this.setState({[e.target.name]:e.target.value});
        this.setState({"change":"1"});
        this.props.checkChange("1");
        console.log(this.state)
    }

    handleswicth = (e:any)=>{
        if(!e.target.checked){
            this.setState({[e.target.name]:"Inactivo"});
        }else{
            this.setState({[e.target.name]:"Activo"});
        }
        console.log(this.state)
    }

    convert(){
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
      }

    makeJson = (data:any)=>{
        var dataJson={
            "usuario_id":data.usuario_id,
            "nombres":data.nombres,
            "primer_apellido":data.primer_apellido,
            "segundo_apellido":data.segundo_apellido,
            "email_laboral":data.email_laboral,
            "telefono_laboral":data.telefono_laboral,
            "usuario_login":data.usuario_login,
            "fecha_actualizacion":this.convert().split(" ")[0],
            "extension_asterisk":data.extension_asterisk,
            "password_asterisk":data.password_asterisk,
            "descripcion_estado":data.descripcion_estado,
            "accion":"Actualizar"
        }

        return dataJson
    }

    sendData=(e:any)=>{
        var userOld = this.props.user;
        var userUp = this.state;

        if(userOld!==null){
            Object.entries(userOld).forEach(([key, value])  => {
                if(userUp[key]!==undefined){
                    userOld[key] = userUp[key] 
                }
            });
        }
        
        axios.post("https://app.crmetric.com/srv-crmetric-web/rest/usuario/registrarUsuario",this.makeJson(userOld))
            .then(response=>{
                console.log(response);
            })

        console.log(userUp);
        console.log(this.makeJson(userOld));
    }

    public render() {
        
        return <div className="container mt-5 mb-5">
                <div className = "row">
                    <div className = "card">
                    <div className="row mt-3">
                    <div className="col-6">
                        <div className = "row">
                                <div className="col-4">
                                    <h5>Id</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name = "usuario_id" type="text" defaultValue={this.props.user.usuario_id}  readOnly= {true} />
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Nombres</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name = "nombres" type="text" defaultValue={this.props.user.nombres}  onChange={this.handleInput} maxLength={50}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Segundo apellido</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name="segundo_apellido"type="text" defaultValue={this.props.user.segundo_apellido} onChange={this.handleInput} maxLength={50}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Telefono laboral</h5>
                                </div>
                                <div className="col-6">
                                    <TelephoneInput value={this.props.user.telefono_laboral} handleInput={this.handleInput} />
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Contrasenia</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" type="password" name="password_asterisk" defaultValue={this.props.user.password_asterisk} onChange={this.handleInput} maxLength={30} pattern={"[0-9a-zA-Z]"}/>
                                </div>
                            </div>
                    </div>
                    <div className="col-6">
                        <div className="container">
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Login</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input"  name="usuario_login" type="text" defaultValue="" value={this.props.user.usuario_login} readOnly= {true}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Primer apellido</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name="primer_apellido" type="text" defaultValue={this.props.user.primer_apellido} onChange={this.handleInput} maxLength={50}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>eMail laboral</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name="email_laboral" type="email" defaultValue={this.props.user.email_laboral} onChange={this.handleInput}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Extension</h5>
                                </div>
                                <div className="col-6">
                                    <input className="e-input" name="extension_asterisk" type="number"  min="100" max="999"  defaultValue={this.props.user.extension_asterisk} onChange={this.handleInput}/>
                                </div>
                            </div>
                            <div className = "row">
                                <div className="col-4">
                                    <h5>Estado</h5>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <SwitchComponent name="descripcion_estado" checked={this.chequearEstad(this.props.user.descripcion_estado)} onChange={this.handleswicth}/>
                                        </div>
                                        <div className="col-6">
                                            <ButtonComponent cssClass='e-info'onClick={this.sendData}>Actualizar</ButtonComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
        </div>;
    }
    
};