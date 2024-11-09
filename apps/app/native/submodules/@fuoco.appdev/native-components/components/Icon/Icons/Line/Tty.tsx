import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.986 6.014h-2v-2h2v2Zm2 1h-2v2h2v-2Zm1 2h2v-2h-2v2Zm0-5h-2v2h2v-2Zm-4 3h-2v2h2v-2Zm4 3h-2v2h2v-2Zm-3 0h-2v2h2v-2Zm-3-6h-2v2h2v-2Zm7 11.82v4.15c0 .56-.47 1.03-1.03 1-2.89-.17-5.6-1.03-7.97-2.4a17.999 17.999 0 0 1-6.57-6.57 17.89 17.89 0 0 1-2.4-7.97c-.03-.56.44-1.03 1-1.03h4.15c.48 0 .89.34.98.8l.74 3.68a.99.99 0 0 1-.27.9l-2.53 2.52c1.43 2.5 3.5 4.57 6 6l2.52-2.52a.98.98 0 0 1 .9-.27l3.67.73c.47.09.81.5.81.98Zm-14.82-6.83 1.65-1.65-.47-2.34h-2.23c.17 1.37.53 2.71 1.05 3.99Zm12.82 7.65-2.34-.47-1.65 1.65c1.28.52 2.63.87 3.99 1.05v-2.23Zm2-12.64v2h2v-2h-2Zm0 8h2v-2h-2v2Zm-7-2h-2v2h2v-2Z" />
  </Svg>
)

export default Icon
