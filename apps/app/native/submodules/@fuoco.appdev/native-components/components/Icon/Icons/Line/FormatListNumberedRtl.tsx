import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 17h2v.5h-1v1h1v.5h-2v1h3v-4h-3v1Zm1-9h1V4h-2v1h1v3Zm-1 3h1.8l-1.8 2.1v.9h3v-1h-1.8l1.8-2.1V10h-3v1Zm-16-6h14v2h-14V5Zm0 12h14v2h-14v-2Zm0-6h14v2h-14v-2Z" />
  </Svg>
)

export default Icon
