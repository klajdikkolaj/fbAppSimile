import React from 'react';
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Label, FormField, Select } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string>, FormFieldProps {

}

const SelectInput: React.FC<IProps> = ({
                                         options,
                                         width,
                                         placeholder,
                                         input,
                                         meta: {touched, error}

                                     }) => {
    return (
        <FormField error={touched && !!error} width={width}>
            <Select options={options}
                    value={input.value}
                    placeholder={placeholder}
                    onChange={(e,data)=>input.onChange(data.value)}

            />
            {touched && error &&
            <Label color={"red"}>{error}</Label>
            }

        </FormField>
    );
};

export default SelectInput;
