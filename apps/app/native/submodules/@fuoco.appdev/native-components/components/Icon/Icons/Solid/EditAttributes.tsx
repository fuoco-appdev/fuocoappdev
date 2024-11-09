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
      d="M6.37 7h11.26C20.04 7 22 9.24 22 12s-1.96 5-4.37 5H6.37C3.96 17 2 14.76 2 12s1.96-5 4.37-5Zm-1.7 4.89 2.57 2.57 4.22-4.22-.7-.7-3.52 3.52-1.87-1.87-.7.7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
