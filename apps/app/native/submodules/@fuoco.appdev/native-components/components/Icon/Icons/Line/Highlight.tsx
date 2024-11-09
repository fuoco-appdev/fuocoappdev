import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m6.001 14 3 3v5h6v-5l3-3V9h-12v5Zm2-3h8v2.17l-3 3V20h-2v-3.83l-3-3V11Zm3-9h2v3h-2V2ZM3.503 5.874 4.917 4.46l2.122 2.12-1.414 1.415-2.122-2.121Zm13.458.708 2.123-2.12 1.413 1.416-2.123 2.12-1.413-1.416Z" />
  </Svg>
)

export default Icon
