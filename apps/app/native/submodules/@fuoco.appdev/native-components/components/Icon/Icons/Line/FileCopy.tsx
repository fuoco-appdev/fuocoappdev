import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.5 1h-12c-1.1 0-2 .9-2 2v14h2V3h12V1Zm-1 4h-7c-1.1 0-1.99.9-1.99 2L6.5 21c0 1.1.89 2 1.99 2H19.5c1.1 0 2-.9 2-2V11l-6-6Zm-7 16V7h6v5h5v9h-11Z" />
  </Svg>
)

export default Icon
