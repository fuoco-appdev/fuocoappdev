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
      d="M13.533 16.87v-.004a2.68 2.68 0 0 1-.033-.366c0-2.76 2.24-5 5-5 .92 0 1.75.26 2.49.69V5c0-1.1-.89-2-1.99-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h8.55l-.017-.13ZM15 16.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5ZM5 7l7 3.5L19 7V5l-7 3.5L5 5v2Zm11.5 10h4v-1h-4v1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
