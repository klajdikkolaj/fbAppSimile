import React from 'react';
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Label, FormField } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets'


interface IProps extends FieldRenderProps<any>, FormFieldProps {

}

const DateInput: React.FC<IProps> = ({
                                         input,
                                         id = null,
                                         date = false,
                                         time = false,
                                         width,
                                         placeholder,
                                         meta: {touched, error},
                                         ...rest

                                     }) => {
    return (
        <FormField error={touched && !!error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                value={input.value || null}
                onChange={input.onChange}
                onKeyDown={e => e.preventDefault()}
                {...rest}
                date={date}
                time={time}
                onBlur={input.onBlur}
            />
            {touched && error &&
            <Label color={"red"}>{error}</Label>
            }

        </FormField>
    );
};

export default DateInput;
