import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, PageSettingsModel, Sort} from '@syncfusion/ej2-react-grids';
import {DataManager} from '@syncfusion/ej2-data';
import * as React from 'react';



export default class Grid extends React.Component<any, any>{
    
    public pageSettings: PageSettingsModel = { pageSize: 6 }

    public handleRow = (e:any)=>{

        if(this.props.change==="0"){

        }
        this.props.userShow(e.data);
    }
    
    public render() {
        return <div className="container">
        <GridComponent dataSource={new DataManager(this.props.datita)} allowPaging={true} pageSettings={ this.pageSettings } rowSelected={this.handleRow}>
        <ColumnsDirective>
            <ColumnDirective field='usuario_id' headerText="Id" width='100' textAlign="Right"/>
            <ColumnDirective field='usuario_login' headerText="Login" width='100'/>
            <ColumnDirective field='nombres' headerText = "Nombres" width='100' textAlign="Right"/>
            <ColumnDirective field='apellidos' headerText= "Apellidos" width='100' textAlign="Right"/>
            <ColumnDirective field='descripcion_estado' headerText="Estado" width='100' textAlign="Right"/>
            <ColumnDirective field='fecha_actualizacion' headerText = "Actualizacion" width='100' textAlign="Right"/>
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group]} />
    </GridComponent>
    </div>
    }
};