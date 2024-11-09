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
      d="M17 13h-.88l4.33 4.33A9.9 9.9 0 0 0 22 12c0-5.52-4.48-10-10-10a9.9 9.9 0 0 0-5.33 1.55L14.12 11H17v2ZM2.41 2.13 1 3.54l2.78 2.78A9.92 9.92 0 0 0 2 12c0 5.52 4.48 10 10 10 2.11 0 4.07-.66 5.68-1.78L20.46 23l1.41-1.41L2.41 2.13ZM8.46 11H7v2h3.46l-2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
