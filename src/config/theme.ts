//在 TypeScript 中定义 themeVars 时，建议使用 Vant 提供的 ConfigProviderThemeVars 类型，可以提供完善的类型提示
import type { ConfigProviderThemeVars } from 'vant'

//注意：ConfigProvider 仅影响它的子组件的样式，不影响全局 root 节点。
export const themeVars:ConfigProviderThemeVars ={
    rateIconFullColor: '#07c160',
    sliderBarHeight: '4px',
    sliderButtonWidth: '20px',
    sliderButtonHeight: '20px',
    sliderActiveBackground: '#07c160',
    buttonPrimaryBackground: '#07c160',
    buttonPrimaryBorderColor: '#07c160',
    tabbarItemActiveColor:'#e21c03'
}