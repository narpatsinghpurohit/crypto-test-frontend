import { useEffect, useState } from 'react';
import api from '../../utils/ApiCall';
import { useAuth } from '../../hooks/useAuth';
import { useSDK } from '@metamask/sdk-react';
import { toast } from 'react-toastify';
import { CoinData, NetWorth } from '../../types/global';

const useDashboard = () => {
  const [account, setAccount] = useState<string>();
  const [netWorth, setNetWorth] = useState<NetWorth | null>(null)
  const [topCurrencies, setTopCurrencies] = useState<CoinData[] | null>(null)
  const [showModal, setShowModal] = useState(false);
  const [coinData, setCoinData] = useState<CoinData|null>(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });
  const { sdk } = useSDK();
  const auth = useAuth();
  useEffect(() => {
    if (!account) {
      connect()
    }
  }, [sdk])

  useEffect(() => {
    getTopCurrencies()
  },[])
  async function fetchWalletDetails(account: string) {
    api.get(`/moralis/net-worth/${account}`).then((res) => {
      setNetWorth(res.data)
    }).catch((error) => {
      toast.error("Something Went wrong");
      console.error(error)
    })
  }
  const connect = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts ? accounts[0] : '');
      fetchWalletDetails(accounts[0])
    } catch (err) {
      console.error("failed to connect with metamask, please check if extension",err);
    }
  };

  const getTopCurrencies = () => {
    api.get('/cryptocompare/top-currencies').then(res => {
      setTopCurrencies(res.data.Data)
    }).catch((error) => {
      toast.error("Something Went wrong");
      console.error(error)
    })
  }

  const onCoinClick = (coin:CoinData) => {
    setCoinData(coin);
    api.get(`/cryptocompare/historic-data?fsym=${coin.CoinInfo.Name}&tsym=USD&limit=10`).then((res) => {
      const labels = res.data.Data.Data.map((item:{time:number}) => new Date(item.time * 1000).toLocaleDateString());
      const prices = res.data.Data.Data.map((item:{close:number}) => item.close);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Price',
            data: prices,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
      setShowModal(true); // Open the modal after a successful response
    }).catch((error) => {
      toast.error("Something Went wrong");
      console.error(error)
    })
  }
  return {
    netWorth,
    account,
    auth,
    topCurrencies,
    showModal,
    chartData,
    coinData,
    connect,
    onCoinClick,
    setShowModal
  };
};

export default useDashboard;