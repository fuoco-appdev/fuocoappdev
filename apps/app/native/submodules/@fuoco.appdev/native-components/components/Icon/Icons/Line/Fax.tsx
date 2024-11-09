import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 8.5h-1v-5H8v5h-.78c-.55-.61-1.33-1-2.22-1-1.66 0-3 1.34-3 3v7c0 1.66 1.34 3 3 3 .89 0 1.67-.39 2.22-1H22v-8c0-1.66-1.34-3-3-3Zm-13 9c0 .55-.45 1-1 1s-1-.45-1-1v-7c0-.55.45-1 1-1s1 .45 1 1v7Zm4-12h6v3h-6v-3Zm10 12H8v-7h11c.55 0 1 .45 1 1v6Z" />
    <Path d="M15 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M18 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M15 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M18 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M13 11.5H9v5h4v-5Z" />
  </Svg>
)

export default Icon
