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
      d="M14.82 3H19c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4.18C9.6 1.84 10.7 1 12 1c1.3 0 2.4.84 2.82 2ZM13 4c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1Zm-1 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3ZM6 17.6V19h12v-1.4c0-2-4-3.1-6-3.1s-6 1.1-6 3.1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
