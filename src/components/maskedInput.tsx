import * as React from 'react';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';

export default class TelephoneInput extends React.Component<any, any>{
    
    public render() {
        return <div>
        <MaskedTextBoxComponent name="telefono_laboral" value = {this.props.value} mask={'000-000000'} onChange = {this.props.handleInput} />
      </div>
    }
};