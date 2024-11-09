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
      d="M12 12c-3 0-5.5-2.5-5.5-5.5S9 1 12 1v11Zm0 0c0-3 2.5-5.5 5.5-5.5S23 9 23 12H12Zm0 0v11c3 0 5.5-2.5 5.5-5.5S15 12 12 12Zm0 0c0 3-2.5 5.5-5.5 5.5S1 15 1 12h11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
