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
      d="M12 4a7.49 7.49 0 0 1 7.35 6.04c2.6.18 4.65 2.32 4.65 4.96 0 2.76-2.24 5-5 5H6c-3.31 0-6-2.69-6-6 0-3.09 2.34-5.64 5.35-5.96A7.496 7.496 0 0 1 12 4Zm-5.5 9.5L10 17l6.59-6.59L15.18 9 10 14.18l-2.09-2.09L6.5 13.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
