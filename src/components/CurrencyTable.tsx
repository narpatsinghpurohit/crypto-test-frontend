import { Avatar, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { CoinData } from '../types/global';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function CurrencyTable({ currencies, onCoinClick }: { currencies: CoinData[] | null, onCoinClick:(coin:CoinData) => void}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Top Currencies</TableCell>
                        <TableCell align="right">Last Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currencies?.map((currency: CoinData) => (
                        <TableRow key={currency.CoinInfo.Id}>
                            <TableCell align="left" sx={{display:'flex', gap:2, alignItems:'center'}}>
                                <Avatar src={`https://www.cryptocompare.com/${currency.CoinInfo.ImageUrl}`} />
                                <Box>
                                    <Typography>{currency.CoinInfo.FullName}</Typography>
                                    <Typography style={{fontSize:10}}>{currency.CoinInfo.Name}</Typography>
                                </Box>

                                <IconButton onClick={() => onCoinClick(currency)}>
                                   <ShowChartIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                {currency.DISPLAY.USD.PRICE}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CurrencyTable;