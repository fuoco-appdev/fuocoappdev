import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.23 7.5h2.6c-.06-.47-.36-.94-.79-1.17L10.5 2.5 2.8 6.33c-.48.26-.8.81-.8 1.34v7.83c0 1.1.9 2 2 2V7.9l6.5-3.4 5.73 3Z" />
    <Path d="M20 8.5H7c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2Zm0 11H7v-7l6.5 3.33L20 12.5v7Zm-6.5-5.67L7 10.5h13l-6.5 3.33Z" />
  </Svg>
)

export default Icon
