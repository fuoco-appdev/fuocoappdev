import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.5 6.5V14h-2V7.5l-5-3.5-5 3.5V9h-2V6.5l7-5 7 5ZM16 7h-1v1h1V7Zm-2 0h-1v1h1V7Zm2 2h-1v1h1V9Zm-2 0h-1v1h1V9Zm5.5 7h-2c0-1.2-.75-2.28-1.87-2.7L9.47 11H1.5v11h6v-1.44l7 1.94 8-2.5v-1c0-1.66-1.34-3-3-3Zm-16 4v-7h2v7h-2Zm10.97.41L7.5 18.48V13h1.61l5.82 2.17c.34.13.57.46.57.83 0 0-1.99-.05-2.3-.15l-2.38-.79-.63 1.9 2.38.79c.51.17 1.04.26 1.58.26h5.35c.39 0 .74.23.9.56l-5.93 1.84Z" />
  </Svg>
)

export default Icon
