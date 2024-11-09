import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1 5h2v14H1V5Zm4 0h2v14H5V5Zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1Zm-1 12H11V7h10v10Zm-3.57-4.38-2 2.57L14 13.47l-2 2.52h8l-2.57-3.37Z" />
  </Svg>
)

export default Icon
