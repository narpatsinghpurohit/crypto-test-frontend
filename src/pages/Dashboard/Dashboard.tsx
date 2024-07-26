import React from 'react';
// Custom Imports Start
import { Box, Button, Typography } from '@mui/material'
import withLayout from '../../utils/withLayout';
import AuthLayout from '../../Layouts/AuthLayout';
import useDashboard from './useDashboard';
import CurrencyTable from '../../components/CurrencyTable';
import ChartModal from '../../components/ChartModal';
// Custom Imports End

// UI
const Dashboard = () => {
  const { auth,account,netWorth,topCurrencies,chartData,showModal, coinData, connect, onCoinClick, setShowModal } = useDashboard()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 2 }}>Welcome {auth?.user?.name}</Typography>
      {account ?
        <Typography sx={{ marginBottom: 2 }}>Account ${account}</Typography> :
        <Button variant='contained' color='primary' onClick={connect}>
          Connect to metamask
        </Button>
      }
      <Typography sx={{ marginBottom: 2 }}>Total Networth ${netWorth?.total_networth_usd}</Typography>
      <Box sx={{marginTop:2}}>
          <CurrencyTable currencies={topCurrencies} onCoinClick={onCoinClick}/>
      </Box>
      <ChartModal coinData={coinData} showModal={showModal} chartData={chartData} setShowModal={setShowModal} />
    </Box>
  );
};

export default withLayout(AuthLayout)(Dashboard)