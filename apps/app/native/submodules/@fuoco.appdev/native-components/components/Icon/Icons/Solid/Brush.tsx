import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="m19.37 3.29 1.34 1.34c.39.39.39 1.02 0 1.41L11.75 15 9 12.25l8.96-8.96a.996.996 0 0 1 1.41 0ZM4 17c0-1.66 1.34-3 3-3s3 1.34 3 3c0 2.21-1.79 4-4 4-1.51 0-3.08-.78-4-2 .84 0 2-.69 2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
