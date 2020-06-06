import React from 'react';
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Label, FormField } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {

}

const TextInput: React.FC<IProps> = ({
                                         input,
                                         width,
                                         placeholder,
                                         type,
                                         meta: {touched, error}

                                     }) => {
    return (
        <FormField error={touched && !!error}>
            <input {...input} width={width} type={type} placeholder={placeholder}/>
            {touched && error &&
            <Label color={"red"}>{error}</Label>
            }

        </FormField>
    );
};

export default TextInput;
