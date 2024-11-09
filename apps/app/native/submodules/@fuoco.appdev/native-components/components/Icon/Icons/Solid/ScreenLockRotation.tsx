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
      d="M20.05 10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1v-.5a2.5 2.5 0 0 0-5 0V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5Zm-.32 1.2 2.57 2.57c.59.58.59 1.53 0 2.12l-6.36 6.36c-.58.59-1.53.59-2.12 0L1.8 10.23a1.49 1.49 0 0 1 0-2.12l6.36-6.36a1.49 1.49 0 0 1 2.12 0l2.45 2.45-1.41 1.41-2.1-2.1-5.66 5.66 11.32 11.32 5.66-5.66-2.22-2.22 1.41-1.41ZM1.55 13c.36 3.76 2.7 6.94 5.97 8.48l1.33-1.33 3.81 3.82L12 24C5.71 24 .56 19.16.05 13h1.5Zm16-11.2c-.94 0-1.7.76-1.7 1.7V4h3.4v-.5c0-.94-.76-1.7-1.7-1.7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
