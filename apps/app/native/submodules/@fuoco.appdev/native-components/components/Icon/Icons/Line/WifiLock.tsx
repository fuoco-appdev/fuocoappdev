import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.98 10.5 24 8.48A16.88 16.88 0 0 0 12 3.5c-4.69 0-8.93 1.9-12 4.98L12 20.5l3.05-3.05V14.5c0-.45.09-.88.23-1.29.54-1.57 2.01-2.71 3.77-2.71h2.93Z" />
    <Path d="M22 15.5v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1Zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1Z" />
  </Svg>
)

export default Icon
