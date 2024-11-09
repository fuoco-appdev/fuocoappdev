import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.5 14h1v3H10v-3h1v4.5h1.5v-5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v5h1.5V14Z" />
    <Path d="M13.5 12.5v6H15V17h2c.55 0 1-.45 1-1v-2.5c0-.55-.45-1-1-1h-3.5Zm3 3H15V14h1.5v1.5Z" />
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14Z" />
    <Path d="M14 11.5h2.5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H14c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1Zm.5-4.5H16v3h-1.5V7Z" />
    <Path d="M11 10H8V9h2c.55 0 1-.45 1-1V6.5c0-.55-.45-1-1-1H6.5V7h3v1h-2c-.55 0-1 .45-1 1v2.5H11V10Z" />
  </Svg>
)

export default Icon
