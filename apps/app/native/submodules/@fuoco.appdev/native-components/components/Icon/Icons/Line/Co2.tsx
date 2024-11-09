import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.75 7.5h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1Zm-.5 4.5h-2V9h2v3Zm-5.5-.5v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1h-1.5V9h-2v3h2v-.5h1.5Zm12.5 2.5h-2v1h3v1.5h-4.5V14c0-.55.45-1 1-1h2v-1h-3v-1.5h3.5c.55 0 1 .45 1 1V13c0 .55-.45 1-1 1Z" />
  </Svg>
)

export default Icon
