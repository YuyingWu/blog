import React, { Component } from 'react'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import moment from 'moment'
import { toFixFormat, FUND_TYPE, SERVER_PREFIX } from '../utils/fund'
import mockData from '../data/fund'
import Tag from '../components/tag/index'
// import FundChart from '../components/fund/index'
import EvaluateTable from '../components/fund/evaluate'

const DATE_FORMAT = 'YY/MM/DD'

const DEBUG = false

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      marketData: [],
      displayList: [],
      isLoading: false,
      drawerVisible: false,
      filterProps: {
        key: 'createDate',
        value: 'ASC',
      },
    }
  }

  componentDidMount() {
    this.fetchFund()
  }

  resetState = callback => {
    this.setState(
      {
        marketData: [],
        displayList: [],
        isLoading: false,
        filterProps: {
          key: 'createDate',
          value: 'ASC',
        },
      },
      () => {
        callback && callback()
      }
    )
  }

  formatMarketData = data => {
    return data.map(item => {
      const { buyWorth, buyShare, sellRecords = [], netWorth } = item
      let sellShare = 0

      if (sellRecords.length) {
        sellRecords.map(r => {
          sellShare += r.share
        })
      }

      const holdingShare = buyShare - sellShare
      const ratio = (netWorth - buyWorth) / buyWorth
      const ratioMoney = toFixFormat(holdingShare * buyWorth * ratio)

      return {
        ...item,
        holdingShare,
        ratio,
        sellShare,
        ratioMoney,
        marketValue: toFixFormat(holdingShare * netWorth),
      }
    })
  }

  fetchFund = async () => {
    this.setState({
      isLoading: true,
    })

    const Storage = localStorage.getItem('fund')

    let marketData = []

    if (Storage) {
      marketData = JSON.parse(Storage)
    } else {
      let fundBuyData = []

      if (DEBUG) {
        fundBuyData = mockData
      } else {
        const res = await axios.get(`${SERVER_PREFIX}/api/fund/buyRecord`)
        fundBuyData = res.data.list
      }

      let fundDB = {}

      for (let fund of fundBuyData) {
        if (fund) {
          if (!fundDB[`${fund.code}`]) {
            const response = await axios.get(
              `${SERVER_PREFIX}/api/fund/detail?id=${fund.code}`
            )

            if (response && response.data && response.data.data) {
              let fundMarketData = response.data.data

              fundDB[`${fund.code}`] = {
                netWorth: fundMarketData.netWorth,
                name: fundMarketData.name,
              }
            } else {
              fundDB[`${fund.code}`] = {}
            }
          }

          fund.name = fundDB[`${fund.code}`].name
          fund.netWorth = fundDB[`${fund.code}`].netWorth

          marketData.push(fund)
        }
      }

      marketData = this.formatMarketData(marketData)

      localStorage.setItem('fund', JSON.stringify(marketData))
    }

    this.setState({
      marketData,
      displayList: marketData,
      isLoading: false,
    })
  }

  detailRender = record => {
    const {
      buyWorth,
      buyShare,
      code,
      sellRecords = [],
      createDate,
      name,
      netWorth,
      holdingShare,
      ratio,
      sellShare,
      ratioMoney,
      type,
    } = record

    return (
      <div
        style={{
          background: holdingShare <= 0 ? '#ccc' : '',
        }}
      >
        <p>
          <Tag>{name}</Tag> ({code}) | {FUND_TYPE[`${type}`]}
        </p>
        <Grid container>
          <Grid item xs={12} sm={12} md={3}>
            <p>
              份额：买入{buyShare}，卖出{sellShare}{' '}
              <Tag>{moment(createDate).format(DATE_FORMAT)}</Tag>
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <p>
              持有份额：{toFixFormat(holdingShare)}，成本市值{' '}
              {toFixFormat(buyShare * buyWorth)}
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <p>
              现价：{netWorth} ｜ 买入价：{buyWorth}
            </p>
          </Grid>
          {holdingShare > 0 ? (
            <Grid item xs={12} sm={12} md={3}>
              <p>
                浮盈亏：
                <Tag color={ratio > 0 ? '#87d068' : '#f50'}>
                  {toFixFormat(ratio * 100)}%
                </Tag>
                = ¥ {ratioMoney}
              </p>
            </Grid>
          ) : null}
        </Grid>

        <Grid container>
          {sellRecords.length
            ? sellRecords.map((record, index) => {
                const { share: sellShare, worth: sellWorth, date } = record
                const sellRatio = sellWorth - buyWorth

                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12 / sellRecords.length}
                    key={`col-${index}`}
                  >
                    <Tag color="orange">卖</Tag> ¥{sellWorth} * {sellShare} = ¥
                    {toFixFormat(sellWorth * sellShare)}{' '}
                    <Tag color={sellRatio > 0 ? '#87d068' : '#f50'}>
                      {toFixFormat((sellRatio / buyWorth) * 100)}%
                    </Tag>{' '}
                    <Tag>{moment(date).format(DATE_FORMAT)}</Tag>
                  </Grid>
                )
              })
            : null}
        </Grid>
      </div>
    )
  }

  onPropsSelect = event => {
    const {
      filterProps: {
        // key,
        value: filterValue,
      },
    } = this.state

    const props = {
      key: event.target.value,
      value: filterValue,
    }

    this.setState({
      filterProps: props,
    })
  }

  onPropsValueSelect = event => {
    const {
      filterProps: { key },
    } = this.state

    const props = {
      key,
      value: event.target.value,
    }

    this.setState({
      filterProps: props,
    })
  }

  onSearch = () => {
    const { filterProps } = this.state
    const { marketData } = this.state

    const displayList = marketData.sort((a, b) => {
      let valueA = a[`${filterProps.key}`]
      let valueB = b[`${filterProps.key}`]

      if (filterProps.key === 'createDate') {
        // date
        valueA = new Date(valueA).getTime()
        valueB = new Date(valueB).getTime()
      }
      let compareResult = valueA - valueB

      if (filterProps.value === 'DESC') {
        compareResult = -compareResult
      }

      return compareResult
    })

    this.setState(
      {
        displayList: [],
        isLoading: true,
      },
      () => {
        this.setState({
          displayList,
          isLoading: false,
        })
      }
    )
  }

  onRefresh = () => {
    localStorage.removeItem('fund')

    this.resetState(this.fetchFund)
  }

  toggleDrawer(data, event) {
    const { open } = data

    event.preventDefault()

    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    this.setState({
      drawerVisible: open,
    })
  }

  render() {
    const { displayList, drawerVisible, isLoading, marketData } = this.state

    console.log(drawerVisible)

    return (
      <div>
        <Grid container>
          <Grid item sm={12} md={12}>
            {/* <Col sm={{ span: 24 }} md={{ span: 20, offset: 2 }}> */}
            {/* <Collapse defaultActiveKey={['']}>
              <Panel header="饼图" key="1">
                {marketData.length ? <FundChart data={marketData} /> : null}
              </Panel>
              <Panel header="估值" key="2">
                <EvaluateTable />
              </Panel>
            </Collapse> */}

            <Drawer anchor="right" open={drawerVisible}>
              <EvaluateTable
                onClick={this.toggleDrawer.bind(this, {
                  anchor: 'right',
                  open: false,
                })}
              />
            </Drawer>

            <header style={{ margin: '20px 0' }}>
              <Select
                defaultValue="createDate"
                style={{ width: 120 }}
                onChange={this.onPropsSelect}
              >
                <MenuItem value="createDate">日期</MenuItem>
                <MenuItem value="code">代码</MenuItem>
                <MenuItem value="ratioMoney">盈亏市值</MenuItem>
                <MenuItem value="marketValue">持有市值</MenuItem>
              </Select>

              <Select
                defaultValue="ASC"
                style={{ width: 120 }}
                onChange={this.onPropsValueSelect}
              >
                <MenuItem value="ASC">升序</MenuItem>
                <MenuItem value="DESC">降序</MenuItem>
              </Select>

              <Button color="primary" onClick={this.onSearch}>
                查询
              </Button>

              <Button color="secondary" onClick={this.onRefresh}>
                更新数据
              </Button>

              <Button
                color="secondary"
                onClick={this.toggleDrawer.bind(this, {
                  anchor: 'right',
                  open: true,
                })}
              >
                查看估值
              </Button>
            </header>

            {displayList.length ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>详情</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayList.map(row => (
                      <TableRow key={row.objectId}>
                        <TableCell component="th" scope="row">
                          {this.detailRender(row)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Grid>
        </Grid>
      </div>
    )
  }
}
