
import api from '../server/api'

function initaddr(callback){
  api.getplaceName({}).then(res => {
    if(undefined==res){
      return
    }else if(0==res.code){
      var addr=res.data.area.concat(res.data.province, res.data.city);
      callback(addr)
    }
  })
}


var slots = [
  {
    flex: 1,
    values: [],
    className: 'slot1',
    textAlign: 'center',
  },
  {
    flex: 1,
    values: [],
    className: 'slot2',
    textAlign: 'center',
  },
  {
    flex: 1,
    values: [],
    className: 'slot3',
    textAlign: 'center',
  }
];

export { initaddr, slots };
