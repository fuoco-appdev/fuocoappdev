import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.52 18.715h19v2h-19v-2Zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06l-5.31 1.42-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49 16.57-4.43c.81-.23 1.28-1.05 1.07-1.85Z" />
  </Svg>
)

export default Icon
