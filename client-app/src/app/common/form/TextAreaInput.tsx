import React from 'react';
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Label, FormField } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {

}

const TextAreaInput: React.FC<IProps> = ({
                                             input,
                                             width,
                                             placeholder,
                                             rows,
                                             meta: {touched, error}

                                         }) => {
    return (
        <FormField error={touched && !!error} width={width}>
            <textarea {...input}  rows={rows} placeholder={placeholder}/>
            {touched && error &&
            <Label color={"red"}>{error}</Label>
            }

        </FormField>
    );
};

export default TextAreaInput;
