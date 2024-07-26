import React from 'react'

import TextField from '@mui/material/TextField';
import { InputField } from '../types/global';
import { Box, FormHelperText } from '@mui/material';

const Input = (props:{field: InputField, onChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) => {
    const {field, onChangeInput} = props;
    return (
        <Box>
            <TextField
                placeholder={`${field.placeholder}`}
                value={field.value}
                type={field.type}
                name={field.name}
                onChange={onChangeInput}
                error={field.error}
                variant='outlined'
            />
            {field.error && (
                <FormHelperText >
                    {field.errorText}
                </FormHelperText>
            )}
        </Box>
    )
}

export default Input