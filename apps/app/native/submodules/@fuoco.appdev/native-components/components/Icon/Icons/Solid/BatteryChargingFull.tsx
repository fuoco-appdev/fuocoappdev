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
      d="M14 4h1.67C16.4 4 17 4.6 17 5.33v15.34c0 .73-.6 1.33-1.34 1.33H8.33C7.6 22 7 21.4 7 20.66V5.33C7 4.6 7.6 4 8.33 4H10V2h4v2Zm-3 10.5V20l4-7.5h-2V7l-4 7.5h2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
