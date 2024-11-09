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
      d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12Zm17.93-1c-.45-3.6-3.32-6.48-6.93-6.93V11h6.93ZM4 12c0-4.06 3.07-7.44 7-7.93v15.87c-3.93-.5-7-3.88-7-7.94Zm9 1v6.93A8.002 8.002 0 0 0 19.93 13H13Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
