/**
 * Created by hh on 2017/8/17.
 * 是否允许后退的处理
 */
export function isallowBack(to,store){
  let allowBack = true    //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack
    if (!allowBack) {
      history.pushState(null, null, location.href)
    }
  }
  store.commit('common/updateAppSetting', {
    allowBack: allowBack
  })
}
