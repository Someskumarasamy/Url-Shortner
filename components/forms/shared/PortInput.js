import {FormGroup, Label} from 'reactstrap';

const PortInput = ({
    label,
    type,
    field,
    note,
    form : {touched, errors},
    ...props
}) => (
    <div className={`form-group`}>
        {!!label && <label htmlFor={field.name}>{label}</label>}
        {!! note &&<small id="ogtitleerr" class="form-text">{note}</small>}
        <input type={type} className={`form-control ${errors[field.name]!=null ? "input-error" : ""}`} {...field} {...props} />
       
        {
            touched[field.name]&&errors[field.name]&&
            <div className="error form-error">{errors[field.name]}</div>}
    </div>
        )

export default PortInput;