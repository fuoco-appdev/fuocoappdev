import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.821 16h7.18v-1c0-2.21 1.79-4 4-4h.74l-1.9-8.44A2.009 2.009 0 0 0 15.891 1h-3.89v2h3.89l1.4 6.25h-.01a6.008 6.008 0 0 0-4.19 4.75h-5.27a2.996 2.996 0 0 0-3.42-1.94c-1.18.23-2.13 1.2-2.35 2.38A3.002 3.002 0 0 0 5.001 18c1.3 0 2.4-.84 2.82-2Zm-2.82 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
    <Path d="M19.001 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
    <Path d="M11.001 20h-4l6 3v-2h4l-6-3v2Z" />
  </Svg>
)

export default Icon
