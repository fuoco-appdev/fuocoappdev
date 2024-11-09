import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.5 5.25h-3v-1.5H9c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h.5v1.5h-3c-.55 0-1 .45-1 1s.45 1 1 1v7.5c0 1.1.9 2 2 2h1v4l2 1.5v-5.5h1c1.1 0 2-.9 2-2v-7.5c.55 0 1-.45 1-1s-.45-1-1-1Zm-2 3.5H7.75c-.41 0-.75.34-.75.75s.34.75.75.75H9.5v1.5H7.75c-.41 0-.75.34-.75.75s.34.75.75.75H9.5v1.5h-4v-7.5h4v1.5Zm10.5 1.5v-.5c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1v.5c0 .5-1.5 1.16-1.5 3v6.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6.5c0-1.84-1.5-2.5-1.5-3Zm-3 0v-.5h1v.5c0 1.6 1.5 2 1.5 3v.5h-4v-.5c0-1 1.5-1.4 1.5-3Zm2.5 5v1.5h-4v-1.5h4Zm-4 4.5v-1.5h4v1.5h-4Z" />
  </Svg>
)

export default Icon
