import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 5v14H5V5h14Zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-2 3h-3.3l-5 9H7c-.83 0-1.5.67-1.5 1.5S6.17 18 7 18h3.3l5-9H17c.83 0 1.5-.67 1.5-1.5S17.83 6 17 6Z" />
  </Svg>
)

export default Icon
