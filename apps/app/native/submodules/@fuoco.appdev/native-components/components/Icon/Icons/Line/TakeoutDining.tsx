import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m7.79 18.5-.51-7h9.46l-.51 7H7.79Zm2.04-13h4.33l2.8 2.73-.09 1.27H7.12l-.09-1.27 2.8-2.73ZM22 7.96l-1.41-1.41L19 8.13l.03-.56-4.05-4.07H9.02L4.97 7.57l.03.5-1.59-1.56L2 7.94l3.23 3.11.7 9.45h12.14l.7-9.44L22 7.96Z" />
  </Svg>
)

export default Icon
