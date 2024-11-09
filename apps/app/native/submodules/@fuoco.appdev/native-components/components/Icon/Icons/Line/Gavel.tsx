import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1.395 21h12v2h-12v-2Zm4.24-12.93 2.83-2.83 14.14 14.14-2.83 2.83L5.635 8.07ZM12.715 1l5.66 5.66-2.83 2.83-5.66-5.66L12.715 1Zm-8.49 8.48 5.66 5.66-2.83 2.83-5.66-5.66 2.83-2.83Z" />
  </Svg>
)

export default Icon
