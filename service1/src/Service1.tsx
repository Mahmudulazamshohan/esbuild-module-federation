import * as React from 'react';
import { Box, Chip, Typography } from '@mui/material';


const Service1 = () => {
    const [items, setItems] = React.useState<string[]>(['React', 'Nestjs', 'AWS', 'Helm']);

    const handleDelete = (index: number) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };
    return (
        <Box padding={"2px"}>
            <Typography>Service 1 content:</Typography>
            {items.map((name, i) => (
                <Chip 
                    key={i} 
                    label={name} 
                    onDelete={() => handleDelete(i)} 
                />
            ))}
                  <Box height={10}/>
        </Box>
    );
};

export default Service1;