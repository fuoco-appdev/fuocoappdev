import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 6.25v6.26l2 1V6.25c0-1.1-.9-2-2-2h-4a2.5 2.5 0 0 0-5 0H4.01c-1.1 0-2 .9-2 2v3.8c2.69 0 2.99 2.16 2.99 2.7s-.29 2.7-3 2.7v3.8c0 1.1.9 2 2 2h3.8c0-2.16 1.37-2.78 2.2-2.94v-2.03c-1.43.17-3.15 1.04-3.87 2.97H4v-2.13c2.17-.8 3-2.87 3-4.37 0-1.49-.83-3.56-2.99-4.37V6.25H10v-2c0-.28.22-.5.5-.5s.5.22.5.5v2h6Z" />
    <Path d="M12 12.25v4l4 1-4 1v4l10-5-10-5Z" />
  </Svg>
)

export default Icon
