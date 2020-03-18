import React, { Component } from 'react'
import { Ring } from '@antv/g2plot'
import { Button } from 'antd'

export default class extends Component {
  componentDidMount() {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ];
    
    const ringPlot = new Ring('c1', {
      forceFit: true,
      radius: 0.8,
      data,
      angleField: 'value',
      colorField: 'type',
    });
    
    ringPlot.render();
  }

  render() {
    return (
      <div>
        helloo<div id="c1"></div>
        <Button type="secondary">Primary</Button>
      </div>
    )
  }
}
