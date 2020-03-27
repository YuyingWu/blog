import React, { Component } from 'react'
import { Pie } from '@antv/g2plot'
import { FUND_TYPE } from '../../utils/fund'

export default class extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      marketData: props.data.filter(item => item.holdingShare > 0),
    }
  }

  componentDidMount() {
    this.formatChart();    
  }

  formatChart = () => {
    const { marketData } = this.state;
    const fundTypeMarketObject = {};
    const fundGroupArray = [];

    marketData.map(item => {
      const typeItem = fundTypeMarketObject[`${item.type}`];

      if (typeItem) {
        fundTypeMarketObject[`${item.type}`].value = typeItem.value + +item.marketValue;
      } else {
        fundTypeMarketObject[`${item.type}`] = {
          type: FUND_TYPE[`${item.type}`],
          value: +item.marketValue,
        };
      }

      fundGroupArray.push({
        type: item.type,
        value: item.marketValue,
        name: item.name,
      });
    });

    const data = Object.keys(fundTypeMarketObject).map(key => fundTypeMarketObject[`${key}`]);

    const piePlot = new Pie('c1', {
      forceFit: true,
      title: {
        visible: true,
        text: '分组市值占比',
      },
      radius: 0.8,
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'spider',
      },
    });
    
    piePlot.render();

    const pieSharePlot = new Pie('c2', {
      forceFit: true,
      title: {
        visible: true,
        text: '个股市值占比',
      },
      // description: {
      //   visible: true,
      //   text:
      //     '当把饼图label的类型设置为spider时，标签分为两组，在图表两侧拉线对齐显示。一般来说，蜘蛛布局的label更不容易相互遮挡。',
      // },
      radius: 0.8,
      data: fundGroupArray,
      angleField: 'value',
      colorField: 'name',
      label: {
        visible: true,
        type: 'spider',
      },
    });
    
    pieSharePlot.render();
  }

  render() {
    return (
      <div>
        <div id="c1"></div>
        <div id="c2"></div>
      </div>
    )
  }
}
