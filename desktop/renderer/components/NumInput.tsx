import React from 'react'
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

interface NumInputProps{
    handleChange: (value:number) => void;
    value: number;
    defaultValue: number;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        // marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#10131A',
        border: '1px solid #ced4da',
        fontSize: 16,
        color:'white',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));
const NumInput:React.FC<NumInputProps> = ({handleChange,value,defaultValue}) => {
  return (
      <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel id="demo-customized-select-label">Age</InputLabel>
          <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              defaultValue={defaultValue}
              onChange={()=>handleChange(value)}
              input={<BootstrapInput />}
          >
              <MenuItem value="">
                  <em>{defaultValue}</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
          </Select>
      </FormControl>
  )
}

export default NumInput