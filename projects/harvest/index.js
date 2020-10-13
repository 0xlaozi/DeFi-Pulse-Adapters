/*==================================================
  Modules
  ==================================================*/

  const sdk = require('../../sdk');
  const abi = require('./abi.json');

/*==================================================
  TVL
  ==================================================*/

  const fTokens = {
    'fWETH':       {underlying: 'WETH', decimals: 18, contract: '0x8e298734681adbfC41ee5d17FF8B0d6d803e7098', created: 10861886 },
    'fUSDC':       {underlying: 'USDC', decimals: 6,  contract: '0xc3F7ffb5d5869B3ade9448D094d81B0521e8326f', created: 10770105 },
    'fUSDT':       {underlying: 'USDT', decimals: 6,  contract: '0xc7EE21406BB581e741FBb8B21f213188433D9f2F', created: 10770108 },
    'fTUSD':       {underlying: 'TUSD', decimals: 18, contract: '0x7674622c63Bee7F46E86a4A5A18976693D54441b', created: 10997721 },
    'fDAI':        {underlying: 'DAI',  decimals: 18, contract: '0xe85C8581e60D7Cd32Bbfd86303d2A4FA6a951Dac', created: 10770103 },
    'fWBTC':       {underlying: 'WBTC', decimals: 8,  contract: '0xc07EB91961662D275E2D285BdC21885A4Db136B0', created: 10802976 },
    'fRENBTC':     {underlying: 'RENBTC', decimals: 8, contract: '0xfBe122D0ba3c75e1F7C80bd27613c9f35B81FEeC', created: 10802986 },
    'fCRVRENWBTC': {underlying: 'CRVRENWBTC', decimals: 18, contract: '0x192E9d29D43db385063799BC239E772c3b6888F3', created: 10815917 },
    'fUNI_ETH-DAI_v0': {underlying: 'UNI_ETH-DAI', decimals: 18, contract: '0x1a9F22b4C385f78650E7874d64e442839Dc32327', created: 10883048, type:'UNI' },
    'fUNI_ETH-USDC_v0': {underlying: 'UNI_ETH-USDC', decimals: 18, contract: '0x63671425ef4D25Ec2b12C7d05DE855C143f16e3B', created: 10883030, type:'UNI' },
    'fUNI_ETH-USDT_v0': {underlying: 'UNI_ETH-USDT', decimals: 18, contract: '0xB19EbFB37A936cCe783142955D39Ca70Aa29D43c', created: 10883026, type:'UNI' },
    'fUNI_ETH-WBTC_v0': {underlying: 'UNI_ETH-WBTC', decimals: 18, contract: '0xb1FeB6ab4EF7d0f41363Da33868e85EB0f3A57EE', created: 10883054, type:'UNI' },
    'fUNI_ETH-DAI': {underlying: 'UNI_ETH-DAI', decimals: 18, contract: '0x307E2752e8b8a9C29005001Be66B1c012CA9CDB7', created: 11041674, type:'UNI' },
    'fUNI_ETH-USDC': {underlying: 'UNI_ETH-USDC', decimals: 18, contract: '0xA79a083FDD87F73c2f983c5551EC974685D6bb36', created: 11041667, type:'UNI' },
    'fUNI_ETH-USDT': {underlying: 'UNI_ETH-USDT', decimals: 18, contract: '0x7DDc3ffF0612E75Ea5ddC0d6Bd4e268f70362Cff', created: 11011433, type:'UNI' },
    'fUNI_ETH-WBTC': {underlying: 'UNI_ETH-WBTC', decimals: 18, contract: '0x01112a60f427205dcA6E229425306923c3Cc2073', created: 11041683, type:'UNI' },
  };

  const uniPools = {
    'UNI_ETH-DAI': {contract: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11', created: 10042267,
                    token0: '0x6B175474E89094C44Da98b954EedeAC495271d0F', token1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    'UNI_ETH-USDC': {contract: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc', created: 10008355,
                    token0: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', token1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    'UNI_ETH-USDT': {contract: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852', created: 10093341,
                    token0: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', token1: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
    'UNI_ETH-WBTC': {contract: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940', created: 10091097,
                    token0: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', token1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
  };

  async function tvl(timestamp, block) {
    const promises = [
      getUnderlying('fWETH',block),
      getUnderlying('fDAI',block),
      getUnderlying('fUSDC',block),
      getUnderlying('fUSDT',block),
      getUnderlying('fTUSD',block),
      getUnderlying('fWBTC',block),
      getUnderlying('fRENBTC',block),
      getUnderlying('fCRVRENWBTC',block),
      getUniswapUnderlying('fUNI_ETH-DAI_v0',block),
      getUniswapUnderlying('fUNI_ETH-USDC_v0',block),
      getUniswapUnderlying('fUNI_ETH-USDT_v0',block),
      getUniswapUnderlying('fUNI_ETH-WBTC_v0',block),
      getUniswapUnderlying('fUNI_ETH-DAI',block),
      getUniswapUnderlying('fUNI_ETH-USDC',block),
      getUniswapUnderlying('fUNI_ETH-USDT',block),
      getUniswapUnderlying('fUNI_ETH-WBTC',block),
    ];

    let results = await Promise.all(promises);

    let balances = {
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': results[0]                     // WETH
              + results[8][1] + results[9][1] + results[10][0] + results[11][1]    // WETH UNIv0
              + results[12][1] + results[13][1] + results[14][0] + results[15][1], // WETH UNI
      '0x6B175474E89094C44Da98b954EedeAC495271d0F': results[1] + results[8][0] + results[12][0],  // DAI
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': results[2] + results[9][0] + results[13][0],  // USDC
      '0xdAC17F958D2ee523a2206206994597C13D831ec7': results[3] + results[10][1] + results[14][1], // USDT
      '0x0000000000085d4780B73119b644AE5ecd22b376': results[4],                                   // TUSD
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': results[5] + results[11][0] + results[15][0], // WBTC
      '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D': Math.trunc(results[6])                        // RENBTC
                                                      + Math.trunc(results[7]*Math.pow(10,-10)),  //crvRENWBTC, estimate
    };

    return (await sdk.api.util.toSymbols(balances)).output;
  }

  async function getUnderlying(token, block) {
    if (block > fTokens[token].created) {
      const promises = [
        sdk.api.abi.call({ block, target: fTokens[token].contract, abi: 'erc20:totalSupply', }),
        sdk.api.abi.call({ block, target: fTokens[token].contract, abi: abi['fABISharePrice'], }),
        sdk.api.abi.call({ block, target: fTokens[token].contract, abi: abi['fABIUnderlyingUnit'], })
      ];

      let results = await Promise.all(promises);

      let fBalance = results[0].output;
      let fSharePrice = results[1].output;
      let fUnderlyingUnit = results[2].output;

      return fBalance * fSharePrice / fUnderlyingUnit;
    }

    return 0;
}

async function getUniswapUnderlying(token,block) {
  if (block > fTokens[token].created) {
    underlyingPool = uniPools[fTokens[token].underlying];
    const promises = [
      sdk.api.abi.call({ block, target: fTokens[token].contract, abi: 'erc20:totalSupply', }),
      sdk.api.abi.call({ block, target: fTokens[token].contract, abi: abi['fABISharePrice'], }),
      sdk.api.abi.call({ block, target: fTokens[token].contract, abi: abi['fABIUnderlyingUnit'], }),
      sdk.api.abi.call({ block, target: underlyingPool.contract, abi: 'erc20:totalSupply', }),
      sdk.api.abi.call({ block, target: underlyingPool.contract, abi: abi['uniABIReserves'], }),
    ];

    let results = await Promise.all(promises);

    let poolBalance = results[0].output;
    let poolSharePrice = results[1].output;
    let poolUnderlyingUnit = results[2].output;
    let poolUnderlyingBalance = results[3].output;
    let poolUnderlyingReserves = results[4].output;
    let poolFraction = (poolBalance * poolSharePrice / poolUnderlyingUnit) / poolUnderlyingBalance;

    return [poolFraction * poolUnderlyingReserves[0], poolFraction * poolUnderlyingReserves[1]];
  }

  return [0, 0];
}

/*==================================================
  Exports
  ==================================================*/

  module.exports = {
    name: 'Harvest Finance', // project name
    website: 'https://harvest.finance',
    token: 'FARM',            // null, or token symbol if project has a custom token
    category: 'Assets',       // allowed values as shown on DefiPulse: 'Derivatives', 'DEXes', 'Lending', 'Payments', 'Assets'
    start: 1598893200,        // unix timestamp (utc 0) specifying when the project began, or where live data begins
    tvl                       // tvl adapter
  };
