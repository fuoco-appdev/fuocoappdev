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
    <Path d="M8.5 11.5H10v-6H7V7h1.5v4.5Z" />
    <Path d="M15 11.5h1.5V10h1V8.5h-1v-3H15v3h-1.5v-3H12V10h3v1.5Z" />
  </Svg>
)

export default Icon
