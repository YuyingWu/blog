import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Row, Col, Select, Button } from 'antd';
import moment from 'moment';
import { toFixFormat, FUND_TYPE, SERVER_PREFIX } from '../utils/fund';
import mockData from '../data/fund';
import FundChart from '../components/fund/index'

const { Option } = Select;
const DATE_FORMAT = 'YY/MM/DD';

const DEBUG = false;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketData: [],
      displayList: [],
      isLoading: false,
      filterProps: {
        key: 'createDate',
        value: 'ASC'
      }
    };
  }

  componentDidMount() {
    this.fetchFund();
  }

  resetState = callback => {
    this.setState({
      marketData: [],
      displayList: [],
      isLoading: false,
      filterProps: {
        key: 'createDate',
        value: 'ASC'
      }
    }, () => {
      callback && callback();
    });
  }

  formatMarketData = data => {
    return data.map(item => {
      const { buyWorth, buyShare, sellRecords = [], netWorth } = item;
      let sellShare = 0;

      if (sellRecords.length) {
        sellRecords.map(r => {
          sellShare += r.share;
        });
      }

      const holdingShare = buyShare - sellShare;
      const ratio = ((netWorth - buyWorth) / buyWorth);
      const ratioMoney = toFixFormat(holdingShare * buyWorth * ratio);

      return {
        ...item,
        holdingShare,
        ratio,
        sellShare,
        ratioMoney,
        marketValue: toFixFormat(holdingShare * netWorth),
      }
    });
  }

  fetchFund = async () => {
    this.setState({
      isLoading: true,
    });

    const Storage = localStorage.getItem('fund');

    let marketData = [];

    if (Storage) {
      marketData = JSON.parse(Storage);
    } else {
      let fundBuyData = [];

      if (DEBUG) {
        fundBuyData = mockData;
      } else {
        const res = await axios.get(`${SERVER_PREFIX}/api/fund`);
        fundBuyData = res.data.list;
      }
      
      let fundDB = {};

      for (const fund of fundBuyData) {
        if (!fundDB[`${fund.code}`]) {
          const response = await axios.get(`${SERVER_PREFIX}/fund?id=${fund.code}`);

          if (response && response.data && response.data.data) {
            let fundMarketData = response.data.data;

            fundDB[`${fund.code}`] = {
              netWorth: fundMarketData.netWorth,
              name: fundMarketData.name,
            };
          }
        }

        fund.name = fundDB[`${fund.code}`].name;
        fund.netWorth = fundDB[`${fund.code}`].netWorth;

        marketData.push(fund);
      }

      marketData = this.formatMarketData(marketData);

      localStorage.setItem('fund', JSON.stringify(marketData));
    }

    this.setState({
      marketData,
      displayList: marketData,
      isLoading: false,
    });
  };

  detailRender = (text, record, index) => {
    const { buyWorth, buyShare, code, sellRecords = [], createDate, name, netWorth, holdingShare, ratio, sellShare, ratioMoney, type } = record;

    return (
      <div style={{
        background: holdingShare <= 0 ? '#ccc' : '',
      }}>
        <p>
          <Tag color="geekblue">{name}</Tag> ({code}) | {FUND_TYPE[`${type}`]}
        </p>
        <Row>
          <Col sm={24} md={6}>
            <p>
              份额：买入{buyShare}，卖出{sellShare} <Tag>{moment(createDate).format(DATE_FORMAT)}</Tag>
            </p>
          </Col>
          <Col sm={24} md={6}>
            <p>
              持有份额：{holdingShare}，成本市值 {toFixFormat(buyShare * buyWorth)}
            </p>
          </Col>
          <Col sm={24} md={6}>
            <p>
              现价：{netWorth} ｜ 买入价：{buyWorth}
            </p>
          </Col>
          <Col sm={24} md={6}>
            <p>浮盈亏：<Tag color={ratio > 0 ? '#87d068' : '#f50'}>{toFixFormat(ratio * 100)}%</Tag>
          = ¥ {ratioMoney}</p>
          </Col>
        </Row>
        
        <Row>
        {sellRecords.length
          ? sellRecords.map((record, index) => {
              const { share: sellShare, worth: sellWorth, date } = record;

              return (
                <Col sm={24} md={24/sellRecords.length} key={`col-${index}`}>
                  <Tag color="orange">卖</Tag> ¥{sellWorth} * {sellShare} = ¥
                  {sellWorth * sellShare} （
                  {toFixFormat(((sellWorth - buyWorth) / buyWorth) * 100)}%）<Tag>{moment(date).format(DATE_FORMAT)}</Tag>
                </Col>
              );
            })
          : null}
        </Row>
      </div>
    );
  };

  onPropsSelect = value => {
    const { filterProps: {
      // key,
      value: filterValue,
    }} = this.state;

    const props = {
      key: value,
      value: filterValue,
    }

    this.setState({
      filterProps: props,
    });
  }

  onPropsValueSelect = value => {
    const { filterProps: {
      key,
    }} = this.state;

    const props = {
      key,
      value,
    };

    this.setState({
      filterProps: props,
    });
  }

  onSearch = () => {
    const { filterProps } = this.state;
    const { marketData } = this.state;

    const displayList = marketData.sort((a, b) => {
      let valueA = a[`${filterProps.key}`];
      let valueB = b[`${filterProps.key}`];

      if (filterProps.key === 'createDate') {
        // date
        valueA = (new Date(valueA)).getTime();
        valueB = (new Date(valueB)).getTime();
      }
      let compareResult = valueA - valueB;

      if (filterProps.value === 'DESC') {
        compareResult = -compareResult;
      }

      return compareResult;
    });

    this.setState({
      displayList: [],
      isLoading: true,
    }, () => {
      this.setState({
        displayList,
        isLoading: false,
      });
    });
  }

  onRefresh = () => {
    localStorage.removeItem('fund');

    this.resetState(this.fetchFund);
  }

  render() {
    const columns = [
      // {
      //   title: "日期",
      //   dataIndex: "createDate",
      //   key: "createDate",
      // },
      {
        title: "详情",
        dataIndex: "netWorth",
        key: "netWorth",
        render: this.detailRender,
      },
    ];
    const { displayList, isLoading, marketData } = this.state;

    return (
      <div>
        <Row>
          <Col sm={{ span: 24 }} md={{ span: 20, offset: 2}}>
            { marketData.length ? <FundChart data={marketData} /> : null }

            <header style={{ margin: '20px 0' }}>
              <Select defaultValue="createDate" style={{ width: 120 }} onChange={this.onPropsSelect}>
                <Option value="createDate">日期</Option>
                <Option value="code">代码</Option>
                <Option value="ratioMoney">盈亏市值</Option>
                <Option value="marketValue">持有市值</Option>
              </Select>

              <Select defaultValue="ASC" style={{ width: 120 }} onChange={this.onPropsValueSelect}>
                <Option value="ASC">升序</Option>
                <Option value="DESC">降序</Option>
              </Select>

              <Button type="primary" onClick={this.onSearch}>查询</Button>

              <Button type="secondary" onClick={this.onRefresh}>更新数据</Button>
            </header>

            { displayList.length ? <Table dataSource={displayList} columns={columns} rowKey={record => record.updatedAt} pagination={false} loading={isLoading} /> : null }
          </Col>
        </Row>
      </div>
    );
  }
}
