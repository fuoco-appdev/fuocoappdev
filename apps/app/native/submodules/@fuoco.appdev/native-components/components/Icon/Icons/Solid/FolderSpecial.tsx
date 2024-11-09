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
      d="M12 6h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6l2 2Zm3 9.28L17.94 17l-.78-3.33 2.59-2.24-3.41-.29L15 8l-1.34 3.14-3.41.29 2.59 2.24-.78 3.33L15 15.28Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
