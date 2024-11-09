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
      d="M4.22 3.22C6.21 1.23 8.96 0 12 0s5.79 1.23 7.77 3.23l-1.41 1.41A8.937 8.937 0 0 0 12 2C9.51 2 7.26 3.01 5.63 4.63L4.22 3.22Zm2.83 2.83 1.41 1.41a5.021 5.021 0 0 1 7.08 0l1.41-1.41A6.976 6.976 0 0 0 12 4c-1.93 0-3.68.78-4.95 2.05ZM8 10c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1V10Zm2 3c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
