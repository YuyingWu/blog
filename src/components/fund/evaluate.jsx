import React, { PureComponent } from 'react';
import axios from 'axios';
import { Table, Tag } from 'antd';
import { SERVER_PREFIX, toFixFormat } from '../../utils/fund';

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: false,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      isLoading: true,
    });

    const res = await axios.get(`${SERVER_PREFIX}/api/fund/evaluate`);

    this.setState({
      isLoading: false,
    });

    if (res && res.data && res.data.data) {
      this.setState({
        list: res.data.data,
      });
    }
  }

  renderTitle = (text, record, index) => {
    const { eva_type, url } = record;
    let bkgColor = '';
    let evaText = '';
    let tagColor = '';

    switch(eva_type) {
      case 'low':
        bkgColor = 'linear-gradient(90deg,#ecfff4 2%,#fff 97%)';
        evaText = '低估';
        tagColor = '#87d068';
        break;
      case 'mid':
        bkgColor = 'linear-gradient(90deg,#fff2da,#fff 90%)';
        evaText = '适中';
        tagColor = 'orange';
        break;
      case 'high':
        bkgColor = 'linear-gradient(90deg,#ffe7e5,#fff 90%)';
        evaText = '高估';
        tagColor = '#f50';
        break;
      default:
        // bkgColor = 'linear-gradient(90deg,#fff2da,#fff 90%)';
    }

    return (
      <div style={{
        background: bkgColor,
        padding: '16px',
      }}>
        <a href={url} target="_blank" style={{ color: '#333', marginRight: '10px' }}>{ text }</a> { evaText ? <Tag color={tagColor}>{evaText}</Tag> : null }
      </div>
    )
  }

  render() {
    const { list, isLoading } = this.state;
    const columns = [
      {
        title: '指数名',
        dataIndex: 'name',
        key: 'name',
        render: this.renderTitle,
      },
      {
        title: 'ROE',
        dataIndex: 'roe',
        key: 'roe',
        render: text => toFixFormat(text * 100) + '%',
        sorter: (a, b) => a.roe - b.roe,
      },
    ];

    return (
      <div>
        <Table dataSource={list} columns={columns} pagination={false} size="small" loading={isLoading} rowKey="id" />
      </div>
    )
  }
}