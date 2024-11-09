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
      d="M18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5ZM6.15 2.65l1.43 1.43a8.445 8.445 0 0 0-3.55 6.42h-2c.14-3.2 1.72-6.02 4.12-7.85Zm15.82 7.85h-2a8.496 8.496 0 0 0-3.54-6.42l1.42-1.43a10.49 10.49 0 0 1 4.12 7.85ZM12.4 21.96A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
