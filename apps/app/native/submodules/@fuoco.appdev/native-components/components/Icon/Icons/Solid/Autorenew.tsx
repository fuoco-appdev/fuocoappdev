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
      d="M12 9V6c-3.31 0-6 2.69-6 6 0 1.01.25 1.97.7 2.8l-1.46 1.46A7.931 7.931 0 0 1 4 12c0-4.42 3.58-8 8-8V1l4 4-4 4Zm5.3.2 1.46-1.46A7.93 7.93 0 0 1 20 12c0 4.42-3.58 8-8 8v3l-4-4 4-4v3c3.31 0 6-2.69 6-6 0-1.01-.26-1.96-.7-2.8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
