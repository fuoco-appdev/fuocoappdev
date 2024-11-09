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
      d="M14.54 7.46C13.63 6.56 12.38 6 11 6a5 5 0 0 0-4.9 4H4.08C4.57 6.61 7.47 4 11 4c1.93 0 3.68.78 4.95 2.05L18 4v6h-6l2.54-2.54ZM17.92 12a6.89 6.89 0 0 1-1.28 3.14L21.49 20 20 21.49l-4.86-4.85A6.984 6.984 0 0 1 11 18c-1.93 0-3.68-.78-4.95-2.05L4 18v-6h6l-2.54 2.54C8.37 15.44 9.62 16 11 16a5 5 0 0 0 4.9-4h2.02Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
