//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
      title: "水位遥测站",
      tableHeader: [
        {
          prop: 'a',
          width: 150,
          label: '孔名',
          color: '#55C355'
        },
        {
          prop: 'b',
          width: 150,
          label: '含水层'
        },
        {
          prop: 'c',
          width: 200,
          label: '监测时间'
        },
        {
          prop: 'd',
          width: 150,
          label: '深埋(m)'
        },
        {
          prop: 'e',
          width: 150,
          label: '水位(m)'
        },
        {
          prop: 'f',
          width: 150,
          label: '水位变化(m/min)'
        },
        {
          prop: 'g',
          width: 150,
          label: '水温(℃)'
        },
        {
          prop: 'h',
          width: 150,
          label: '气温(℃)'
        },
        {
          prop: 'i',
          width: 150,
          label: '湿度(%)'
        },
        {
          prop: 'j',
          width: 150,
          label: '电压'
        },
        {
          prop: 'k',
          width: 150,
          label: '信号'
        },
        {
          prop: 'l',
          width: 150,
          label: '通讯状态'
        }
      ],
      data:[
        {
          a:'孔1',
          b:'层级1',
          c:'2021-01-01',
          d:'12',
          e:'5',
          f:'16',
          g:'2',
          h:'-5',
          i:'77',
          j:'220',
          k:'99',
          l:'良好',
        },{
          a:'孔2',
          b:'层级2',
          c:'2021-01-02',
          d:'11',
          e:'51',
          f:'12',
          g:'21',
          h:'-1',
          i:'70',
          j:'150',
          k:'95',
          l:'较好',
        }
      ]
    }, {
      title: "井下监测点",
      tableHeader: [
        {
          prop: 'a',
          width: 150,
          label: '测点位置',
          color: '#55C355'
        },
        {
          prop: 'b',
          width: 200,
          label: '监测时间'
        },
        {
          prop: 'c',
          width: 150,
          label: '监测量'
        },
        {
          prop: 'd',
          width: 150,
          label: '监测值'
        },
        {
          prop: 'e',
          width: 150,
          label: '单位'
        },
        {
          prop: 'f',
          width: 150,
          label: '状态'
        },
        {
          prop: 'g',
          width: 150,
          label: '变化量'
        },
        {
          prop: 'h',
          width: 150,
          label: '通讯状态'
        }
      ],
      data:[ {
        a:'位置1',
        b:'2021-01-01',
        c:'3',
        d:'12',
        e:'米',
        f:'正常',
        g:'2',
        h:'良好',
      },{
        a:'位置2',
        b:'2021-01-02',
        c:'31',
        d:'121',
        e:'厘米',
        f:'正常',
        g:'21',
        h:'良好',
      }]
    }, {
      title: "雨量遥测站",
      tableHeader: [
        {
          prop: 'a',
          width: 150,
          label: '站号',
          color: '#55C355'
        },
        {
          prop: 'b',
          width: 150,
          label: '位置',
          color: '#55C355'
        },
        {
          prop: 'c',
          width: 200,
          label: '监测时间'
        },
        {
          prop: 'd',
          width: 200,
          label: '实时降雨量(mm)'
        },
        {
          prop: 'e',
          width: 200,
          label: '1小时降雨量(mm)'
        },
        {
          prop: 'f',
          width: 200,
          label: '24小时降雨量(mm)'
        },
        {
          prop: 'g',
          width: 150,
          label: '电压'
        },
        {
          prop: 'h',
          width: 150,
          label: '信号'
        },
        {
          prop: 'i',
          width: 150,
          label: '通讯状态'
        }
      ],
      data:[{
        a:'站点1',
        b:'东边1',
        c:'2021-01-02',
        d:'31',
        e:'121',
        f:'332',
        g:'220',
        h:'正常',
        i:'良好',
      },{
        a:'站点2',
        b:'东边2',
        c:'2021-01-03',
        d:'32',
        e:'131',
        f:'302',
        g:'220',
        h:'正常',
        i:'良好',
      },{
        a:'站点3',
        b:'东边5',
        c:'2021-01-13',
        d:'12',
        e:'111',
        f:'312',
        g:'220',
        h:'差',
        i:'较差',
      }
    ]
    }, {
      title: "水质遥测站",
      tableHeader: [
        {
          prop: 'a',
          width: 150,
          label: '孔名',
          color: '#55C355'
        },
        {
          prop: 'b',
          width: 150,
          label: '监测类型'
        },
        {
          prop: 'c',
          width: 200,
          label: '监测时间'
        },
        {
          prop: 'd',
          width: 150,
          label: '监测值'
        },
        {
          prop: 'e',
          width: 150,
          label: '水温(℃)'
        },
        {
          prop: 'f',
          width: 150,
          label: '气温(℃)'
        },
        {
          prop: 'g',
          width: 150,
          label: '湿度(%)'
        },
        {
          prop: 'h',
          width: 150,
          label: '电压'
        },
        {
          prop: 'i',
          width: 150,
          label: '信号'
        },
        {
          prop: 'j',
          width: 150,
          label: '通讯状态'
        }
      ],
      data:[{
        a:'孔1',
        b:'浑浊度',
        c:'2021-01-23',
        d:'12',
        e:'111',
        f:'312',
        g:'94',
        h:'220',
        i:'较差',
        j:'中断',
      },{
        a:'孔2',
        b:'颗粒度',
        c:'2021-01-24',
        d:'14',
        e:'10',
        f:'32',
        g:'94',
        h:'220',
        i:'良好',
        j:'良好',
      }]
    },{
      title: "流量遥测站",
      tableHeader: [//随便设置的表头 需要重看系统  
        {
          prop: 'a',
          width: 150,
          label: '监测点',
          color: '#55C355'
        },
        {
          prop: 'b',
          width: 200,
          label: '监测时间'
        },
        {
          prop: 'c',
          width: 150,
          label: '监测值'
        },
        {
          prop: 'd',
          width: 150,
          label: '水温(℃)'
        },
        {
          prop: 'e',
          width: 150,
          label: '气温(℃)'
        },
        {
          prop: 'f',
          width: 150,
          label: '湿度(%)'
        },
        {
          prop: 'g',
          width: 150,
          label: '电压'
        },
        {
          prop: 'h',
          width: 150,
          label: '信号'
        },
        {
          prop: 'i',
          width: 150,
          label: '通讯状态'
        }
      ],
      data:[{
        a:'地下一',
        b:'2021-01-23',
        c:'16',
        d:'12',
        e:'11',
        f:'92',
        g:'220',
        h:'差',
        i:'较差',
      },{
        a:'地下二',
        b:'2021-02-23',
        c:'14',
        d:'12',
        e:'11',
        f:'92',
        g:'220',
        h:'差',
        i:'较差',
      }]
    }],
   
    stripe: true,
    border: true,
    outBorder: true,
    row: [
      {
          "id": 1,
          "status": '正常',
          "datetime": "04-01",
          "sign_in_time": '09:30:00',
          "sign_out_time": '18:30:00',
          "work_hour": 8,
      }, {
          "id": 2,
          "status": '迟到',
          "datetime": "04-02",
          "sign_in_time": '10:30:00',
          "sign_out_time": '18:30:00',
          "work_hour": 7,
      }, {
          "id": 29,
          "status": '正常',
          "datetime": "04-03",
          "sign_in_time": '09:30:00',
          "sign_out_time": '18:30:00',
          "work_hour": 8,
      }, {
          "id": 318,
          "status": '休息日',
          "datetime": "04-04",
          "sign_in_time": '',
          "sign_out_time": '',
          "work_hour": '',
      }, {
          "id": 319,
          "status": '正常',
          "datetime": "04-05",
          "sign_in_time": '09:30:00',
          "sign_out_time": '18:30:00',
          "work_hour": 8,
      }
    ],
    msg: '暂无数据'
  },
 /** 
     * 点击表格一行
     */
    onRowClick: function(e) {
      console.log('e: ', e)

      wx.showToast({
        title: '您点击了这一行：',
        icon: 'none'
      })
    },
  onLoad: function () {
    
  },

})
