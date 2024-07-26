export type InputField = {
    label: string;
    type: string;
    value: string | number | boolean;
    name: string;
    placeholder: string;
    error: boolean;
    errorText: string;
    passwordVisible?: boolean;
}

export type User = {
    name: string;
    email: string;
}

export type Chain = {
    chain: string;
    native_balance: string;
    native_balance_formatted: string;
    native_balance_usd: string;
    token_balance_usd: string;
    networth_usd: string;
};

export type NetWorth = {
    total_networth_usd: string;
    chains: Chain[];
};



export type CoinInfo = {
    Id:string;
    Name: string;
    FullName: string;
    ImageUrl: string;
    Url: string;
};

export type DisplayData = {
    [currency: string]: {
        PRICE: string;
        LASTUPDATE: string;
        OPENHOUR: string;
        HIGHHOUR: string;
        LOWHOUR: string;
        HIGHDAY: string;
        LOWDAY: string;
        CHANGE24HOUR: string;
    };
};

export type CoinData = {
    CoinInfo: CoinInfo;
    DISPLAY: DisplayData;
};
