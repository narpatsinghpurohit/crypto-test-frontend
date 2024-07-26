import React from 'react';
import { Avatar, Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CoinData } from '../types/global';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const ChartModal = ({ coinData, chartData, showModal, setShowModal }: { coinData: CoinData | null, chartData: any, showModal: boolean, setShowModal: Function }) => {

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Modal open={showModal} onClose={handleCloseModal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'white', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', gap:2}}>
                        <Avatar src={`https://www.cryptocompare.com/${coinData?.CoinInfo.ImageUrl}`} />
                        <Box>
                            <Typography>{coinData?.CoinInfo.FullName}</Typography>
                            <Typography style={{ fontSize: 10 }}>{coinData?.CoinInfo.Name}</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleCloseModal}>
                    <CloseIcon/>
                    </IconButton>
                </Box>
                <Line data={chartData} />
            </Box>

        </Modal>
    );
};

export default ChartModal;