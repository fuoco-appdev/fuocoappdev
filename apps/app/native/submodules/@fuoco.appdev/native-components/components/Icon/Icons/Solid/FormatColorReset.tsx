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
      d="M12 3.2s6 6.82 6 10.8c0 .28-.03.56-.06.83L9.5 6.39C10.82 4.55 12 3.2 12 3.2ZM4 6.55l1.41-1.41L20 19.72l-1.42 1.41-2.63-2.63C14.9 19.43 13.52 20 12 20c-3.31 0-6-2.69-6-6 0-1.21.55-2.67 1.32-4.13L4 6.55Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
