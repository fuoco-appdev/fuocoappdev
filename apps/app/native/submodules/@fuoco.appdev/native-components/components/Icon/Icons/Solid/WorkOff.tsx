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
      d="m3.4 1.84 19.75 19.75L21.74 23l-2-2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h.74L1.99 3.25 3.4 1.84ZM14 4h-4v1.6L8.04 3.64C8.2 2.7 9.01 2 10 2h4c1.11 0 2 .89 2 2v2h4c1.11 0 2 .89 2 2v9.6L10.4 6H14V4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
