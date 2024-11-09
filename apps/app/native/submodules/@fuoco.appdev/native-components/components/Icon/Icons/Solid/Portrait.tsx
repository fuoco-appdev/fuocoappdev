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
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-4.75 7c0 1.24-1.01 2.25-2.25 2.25S9.75 11.24 9.75 10 10.76 7.75 12 7.75s2.25 1.01 2.25 2.25ZM12 14c1.5 0 4.5.75 4.5 2.25V17h-9v-.75c0-1.5 3-2.25 4.5-2.25Zm-7 5h14V5H5v14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
