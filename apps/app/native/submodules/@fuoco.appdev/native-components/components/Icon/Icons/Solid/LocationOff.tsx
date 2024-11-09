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
      d="M7.25 3.86A6.984 6.984 0 0 1 12 2c3.87 0 7 3.13 7 7 0 1.57-.63 3.36-1.51 5.11l-3.55-3.55c.35-.43.56-.97.56-1.56A2.5 2.5 0 0 0 12 6.5c-.59 0-1.13.21-1.56.55L7.25 3.86ZM2 4.27l1.41-1.41 16.73 16.73L18.73 21l-3.35-3.35C13.67 20.15 12 22 12 22S5 14.25 5 9c0-.53.07-1.05.18-1.55L2 4.27Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
