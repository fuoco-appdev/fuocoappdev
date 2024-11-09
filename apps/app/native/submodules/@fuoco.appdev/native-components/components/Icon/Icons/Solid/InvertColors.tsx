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
      d="M6.34 7.93 12 2.27l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31A7.98 7.98 0 0 1 12 21.58c-2.05 0-4.1-.78-5.66-2.34-3.12-3.12-3.12-8.19 0-11.31Zm1.42 9.9A5.928 5.928 0 0 0 12 19.59V5.1L7.76 9.35A5.928 5.928 0 0 0 6 13.59c0 1.6.62 3.1 1.76 4.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
