import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.471 19.2c.18.96-.55 1.8-1.47 1.8h-4.5v-3l1-4h-6c-1.65 0-3-1.35-3-3V3h6v6h5c1.1 0 2 .9 2 2l-2 7h1.44c.73 0 1.39.49 1.53 1.2ZM5.501 12V3h-2v9c0 2.76 2.24 5 5 5h4v-2h-4c-1.66 0-3-1.34-3-3Z" />
  </Svg>
)

export default Icon