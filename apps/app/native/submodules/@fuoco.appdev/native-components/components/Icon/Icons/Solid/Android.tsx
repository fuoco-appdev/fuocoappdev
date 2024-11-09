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
      d="m16.83.86-1.3 1.3A5.965 5.965 0 0 1 18 7H6c0-1.99.97-3.74 2.45-4.83L7.14.86c-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0l1.49 1.48c.8-.4 1.7-.63 2.66-.63.95 0 1.85.23 2.64.63L16.12.15c.2-.2.51-.2.71 0 .2.2.2.51 0 .71ZM2 9.5C2 8.67 2.67 8 3.5 8S5 8.67 5 9.5v7c0 .83-.67 1.5-1.5 1.5S2 17.33 2 16.5v-7ZM7 19c-.55 0-1-.45-1-1V8h12v10c0 .55-.45 1-1 1h-1v3.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V19h-2v3.5c0 .83-.67 1.5-1.5 1.5S8 23.33 8 22.5V19H7ZM20.5 8c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5ZM10 5H9V4h1v1Zm4 0h1V4h-1v1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
