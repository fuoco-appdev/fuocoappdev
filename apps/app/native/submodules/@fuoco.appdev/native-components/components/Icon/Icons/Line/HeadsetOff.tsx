import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.71 3.345c3.87 0 7 3.13 7 7v1h-4v.17l1.83 1.83h2.17v2.17l2 2v-7.17a9 9 0 0 0-9-9c-2.02 0-3.88.67-5.38 1.8l1.43 1.43a6.878 6.878 0 0 1 3.95-1.23Z" />
    <Path d="M2.81 1.445 1.4 2.855l3.33 3.33a8.98 8.98 0 0 0-1.02 4.16v7c0 1.1.9 2 2 2h4v-8h-4v-1c0-.94.19-1.83.52-2.65l9.48 9.48v2.17h2.17l1 1h-6.17v2h7c.34 0 .65-.09.93-.24l.55.55 1.41-1.41-19.79-19.8Zm4.9 11.9v4h-2v-4h2Z" />
  </Svg>
)

export default Icon
