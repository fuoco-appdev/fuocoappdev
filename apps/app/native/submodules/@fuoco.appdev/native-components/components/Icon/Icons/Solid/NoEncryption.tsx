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
      d="M12 2.9c-1.71 0-3.1 1.39-3.1 3.1v.46L7.18 4.74C7.74 2.59 9.68 1 12 1c2.76 0 5 2.24 5 5v2h1c1.1 0 2 .9 2 2v7.56L10.44 8h4.66V6c0-1.71-1.39-3.1-3.1-3.1ZM3 6.22l1.41-1.41 16.78 16.78L19.78 23l-1-1H6c-1.1 0-2-.9-2-2V10c0-.75.42-1.4 1.04-1.74L3 6.22Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
