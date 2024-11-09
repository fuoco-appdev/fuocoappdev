import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 11.095h3.63L9 15.295v1.8h6v-2h-3.63l3.63-4.2v-1.8H9v2Zm7.055-7.654 1.282-1.535 4.608 3.85-1.28 1.54-4.61-3.855ZM3.335 7.285l-1.28-1.536 4.606-3.844 1.28 1.536-4.606 3.844ZM12 6.095c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7Zm0-2a9 9 0 1 0 0 18.001 9 9 0 0 0 0-18.001Z" />
  </Svg>
)

export default Icon
