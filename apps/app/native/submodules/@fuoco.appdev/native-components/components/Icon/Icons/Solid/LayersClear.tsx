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
      d="M2 2.27 3.41.86l18.73 18.73L20.73 21l-3.78-3.78L12 21.07l-9-7 1.62-1.26 7.37 5.73 3.53-2.75-1.42-1.42L12 16 3 9l3.22-2.51L2 2.27ZM21 9l-9-7-2.59 2.02 7.87 7.87L21 9Zm0 5.07-1.63-1.27-.67.52 1.43 1.43.87-.68Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
