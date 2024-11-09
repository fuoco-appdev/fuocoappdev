import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.565 4.435v3.88l2 2v-4.88h3v7.88l2 2V3.435h-5v-1h-7.88l2 2h3.88Zm-9.59-2.87-1.41 1.41 4 4v11.46h-2v2h11v-4.46l6.46 6.46 1.41-1.41-19.46-19.46Zm9.59 16.87h-5v-9.46l5 5v4.46Z" />
  </Svg>
)

export default Icon
