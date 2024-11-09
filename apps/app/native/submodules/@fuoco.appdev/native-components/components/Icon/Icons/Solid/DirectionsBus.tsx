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
      d="M5 18.22c-.61-.55-1-1.34-1-2.22V6c0-3.5 3.58-4 8-4s8 .5 8 4v10c0 .88-.39 1.67-1 2.22V20c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1H8v1c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1.78Zm1-2.72c0 .83.67 1.5 1.5 1.5S9 16.33 9 15.5 8.33 14 7.5 14 6 14.67 6 15.5ZM16.5 17c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5ZM6 11h12V6H6v5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
