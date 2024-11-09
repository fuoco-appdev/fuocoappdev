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
      d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12Zm6 4h8.5a2.5 2.5 0 0 0 0-5H16c0-2.21-1.79-4-4-4-1.87 0-3.42 1.27-3.86 3H8c-1.66 0-3 1.34-3 3s1.34 3 3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
