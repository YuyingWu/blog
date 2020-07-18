import React, { PureComponent } from 'react'
import axios from 'axios'
// import { Table, Tag } from 'antd'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tag from '../tag/index'
import { SERVER_PREFIX, toFixFormat } from '../../utils/fund'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const res = await axios.get(`${SERVER_PREFIX}/api/fund/evaluate`)

    if (res && res.data && res.data.data) {
      this.setState({
        list: res.data.data,
      })
    }
  }

  renderTitle = (text, record, index) => {
    const { eva_type, url } = record
    let bkgColor = ''
    let evaText = ''
    let tagColor = ''

    switch (eva_type) {
      case 'low':
        bkgColor = 'linear-gradient(90deg,#ecfff4 2%,#fff 97%)'
        evaText = '低估'
        tagColor = '#87d068'
        break
      case 'mid':
        bkgColor = 'linear-gradient(90deg,#fff2da,#fff 90%)'
        evaText = '适中'
        tagColor = 'orange'
        break
      case 'high':
        bkgColor = 'linear-gradient(90deg,#ffe7e5,#fff 90%)'
        evaText = '高估'
        tagColor = '#f50'
        break
      default:
      // bkgColor = 'linear-gradient(90deg,#fff2da,#fff 90%)';
    }

    return (
      <div
        style={{
          background: bkgColor,
          padding: '16px',
        }}
      >
        <a
          href={url}
          target="_blank"
          style={{ color: '#333', marginRight: '10px' }}
        >
          {text}
        </a>{' '}
        {evaText ? <Tag color={tagColor}>{evaText}</Tag> : null}
      </div>
    )
  }

  render() {
    const { list } = this.state

    return (
      <div onClick={this.props.onClick}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>指数名</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ROE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {this.renderTitle(row.name, row)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {text => toFixFormat(row.roe * 100) + '%'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
