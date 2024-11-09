import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 4.5h8v2h-8v-2Zm0 5.5h8v2h-8v-2Zm0 5.5h8v2h-8v-2ZM2 11c0 3.58 2.92 6.5 6.5 6.5H9v2l3-3-3-3v2h-.5C6.02 15.5 4 13.48 4 11s2.02-4.5 4.5-4.5H12v-2H8.5C4.92 4.5 2 7.42 2 11Z" />
  </Svg>
)

export default Icon
