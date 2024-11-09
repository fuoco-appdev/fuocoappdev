import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 4v2.67l-1 1-1-1V4h2Zm7 7v2h-2.67l-1-1 1-1H20ZM6.67 11l1 1-1 1H4v-2h2.67ZM12 16.33l1 1V20h-2v-2.67l1-1ZM15 2H9v5.5l3 3 3-3V2Zm7 7h-5.5l-3 3 3 3H22V9ZM7.5 9H2v6h5.5l3-3-3-3Zm4.5 4.5-3 3V22h6v-5.5l-3-3Z" />
  </Svg>
)

export default Icon
