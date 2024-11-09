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
      d="M14.24 5.47c0-2.15-.74-4.8-.74-4.8C17.41 3.8 20 8.61 20 14c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-3.38 1.21-6.49 3.23-8.89l-.03.36c0 2.06 1.56 3.73 3.63 3.73 2.06 0 3.41-1.67 3.41-3.73ZM8.49 15.86c0 1.74 1.44 3.14 3.22 3.14 2.65 0 4.8-2.15 4.8-4.8 0-1.39-.2-2.75-.59-4.04-1.02 1.37-2.85 2.22-4.62 2.58-1.76.36-2.81 1.5-2.81 3.12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
