import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 11c.17 0 .33.01.49.02L14.5 3h-6l5.68 9.84A5.986 5.986 0 0 1 18.5 11Z" />
    <Path d="M7.65 4.52 1.5 15.5l3 5.5 6.33-10.97-3.18-5.51Z" />
    <Path d="M12.7 15.5H9.4L6.23 21h7.81a5.93 5.93 0 0 1-1.54-4c0-.52.07-1.02.2-1.5Z" />
    <Path d="M19.5 16v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3Z" />
  </Svg>
)

export default Icon
