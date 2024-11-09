import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 3.5H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-13c0-1.1-.9-2-2-2Zm-18 15v-13h8v13H3Zm18 0h-8v-13h8v13ZM14 9h6v1.5h-6V9Zm0 2.5h6V13h-6v-1.5Zm0 2.5h6v1.5h-6V14Z" />
  </Svg>
)

export default Icon
