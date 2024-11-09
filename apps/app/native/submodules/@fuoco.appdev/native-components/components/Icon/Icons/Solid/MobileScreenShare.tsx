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
      d="M17 1H7c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm0 18H7V5h10v14Zm-4.2-4.01v-1.75c-2.22 0-3.69.68-4.8 2.18.45-2.14 1.69-4.27 4.8-4.7v-1.7L16 12l-3.2 2.99Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
