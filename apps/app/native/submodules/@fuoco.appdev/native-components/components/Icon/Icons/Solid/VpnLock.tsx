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
      d="M22 4v-.5a2.501 2.501 0 0 0-5 0V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1Zm-3 9c0-.34-.04-.67-.08-1h2.03c.03.33.05.66.05 1 0 5.52-4.48 10-10 10S1 18.52 1 13 5.48 3 11 3c1.05 0 2.05.16 3 .46V6c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H7v2h6c.55 0 1 .45 1 1v3h1c.9 0 1.64.58 1.9 1.39C18.2 16.97 19 15.08 19 13ZM3 13c0 4.08 3.05 7.44 7 7.93V19c-1.1 0-2-.9-2-2v-1l-4.79-4.79C3.08 11.79 3 12.38 3 13Zm15-9h3v-.5c0-.83-.67-1.5-1.5-1.5S18 2.67 18 3.5V4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
