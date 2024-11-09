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
      d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3Zm-6.02-5L8.5 5.48 10.57 11H6.43Zm7.07 8.68 8.09-8.09L23 13l-9.49 9.5-5.09-5.09L9.83 16l3.67 3.68Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
