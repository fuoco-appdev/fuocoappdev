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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm6 0a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM4 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-.79-.12-1.55-.33-2.26A9.974 9.974 0 0 1 9.26 5.77c-.98 2.39-2.85 4.32-5.21 5.37-.03.28-.05.57-.05.86Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
