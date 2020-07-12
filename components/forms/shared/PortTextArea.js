import {FormGroup, Label} from 'reactstrap';

const PortTextArea = ({
    label,
    type,
    field,
    form : {touched, errors},
    ...props
}) => (
    <FormGroup className={`form-group ${props.groupstyle}`}>
        <Label>{label}</Label>
        <textarea type={type} {...field} {...props} />
        {
            touched[field.name]&&errors[field.name]&&
            <div className="error form-error">{errors[field.name]}</div>}
    </FormGroup>
        )

export default PortTextArea;