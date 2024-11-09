import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5ZM15 20H6c-.55 0-1-.45-1-1v-1h10v2Zm4-1c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14Z" />
    <Path d="M15 7H9v2h6V7Z" />
    <Path d="M18 7h-2v2h2V7Z" />
    <Path d="M15 10H9v2h6v-2Z" />
    <Path d="M18 10h-2v2h2v-2Z" />
  </Svg>
)

export default Icon
