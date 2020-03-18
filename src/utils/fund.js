const toFixFormat = (number, fixNumber = 2) => {
  return Number(number).toFixed(fixNumber);
}

const FUND_TYPE = {
  a: '国内股票',
  'a-bond': '国内债券',
  'oversea-market': '成熟海外市场',
  'oversea-new-market': '新兴海外市场',
  gold: '黄金',
  crude: '原油',
}

const SERVER_PREFIX = 'https://server.wuyuying.com';

export {
  toFixFormat,
  FUND_TYPE,
  SERVER_PREFIX,
}