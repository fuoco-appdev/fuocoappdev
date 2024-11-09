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
      d="M8.71 6.2a3.01 3.01 0 0 1-1.41 4c-1.5.72-3.29.09-4-1.4a2.99 2.99 0 0 1 1.4-4c1.5-.72 3.29-.09 4.01 1.4Zm13.54 8.09-.69 1.89L9.2 11.71l2.08-5.66 8.56 3.09a4 4 0 0 1 2.41 5.15ZM1.5 12.14 8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86-.69 1.89Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
