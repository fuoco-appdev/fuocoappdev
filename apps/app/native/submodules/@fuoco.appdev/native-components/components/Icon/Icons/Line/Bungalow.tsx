import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 14h-2v-2h2v2Zm5.1 2.56L17 14.79V21H7v-6.2l-1.1 1.76-1.7-1.06L12 3l7.8 12.5-1.7 1.06ZM15 11.59l-3-4.8-3 4.8V19h2v-3h2v3h2v-7.41Z" />
  </Svg>
)

export default Icon
