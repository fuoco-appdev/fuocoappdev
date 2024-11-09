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
      d="M13 4c2.3 0 4.61.88 6.36 2.64a8.98 8.98 0 0 1 0 12.72A8.95 8.95 0 0 1 13 22c-1.49 0-2.98-.38-4.33-1.12l1.49-1.49a6.973 6.973 0 0 0 7.79-1.44 7.007 7.007 0 0 0 0-9.9A6.973 6.973 0 0 0 13 6v3.24L8.76 5 13 .76V4ZM7.34 6.41.86 12.9l6.49 6.48 6.49-6.48-6.5-6.49ZM3.69 12.9l3.66-3.66L11 12.9l-3.66 3.66-3.65-3.66Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
