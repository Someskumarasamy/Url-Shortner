import {FormGroup, Label} from 'reactstrap';

const PortInput = ({
    label,
    type,
    field,
    form : {touched, errors},
    ...props
}) => (
    <FormGroup className={`form-group ${props.groupstyle}`}>
        {!!label && <Label>{label}</Label>}
        <input type={type} {...field} {...props} />
        {
            touched[field.name]&&errors[field.name]&&
            <div className="error form-error">{errors[field.name]}</div>}
    </FormGroup>
        )

export default PortInput;