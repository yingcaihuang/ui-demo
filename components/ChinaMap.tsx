import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { CHINA_PATHS } from '../constants/chinaPaths';

const { width } = Dimensions.get('window');
// Default viewbox for common China maps. 
// You might need to adjust this depending on the source of your SVG paths.
// This example assumes a standard viewbox around 0 0 575 470 or similar for simplified maps.
const VIEW_BOX = "0 0 575 470"; 

interface ChinaMapProps {
  data?: Record<string, number>; // Population or other data keyed by province ID
  onProvincePress?: (provinceId: string) => void;
  colorMap?: (value: number) => string;
}

export default function ChinaMap({ data, onProvincePress, colorMap }: ChinaMapProps) {
  const handlePress = (id: string) => {
    if (onProvincePress) {
      onProvincePress(id);
    }
  };

  const getColor = (id: string) => {
    if (!data || !colorMap || data[id] === undefined) {
      return '#EEEEEE'; // Default color
    }
    return colorMap(data[id]);
  };

  return (
    <View style={styles.container}>
      <Svg width={width - 40} height={(width - 40) * 0.8} viewBox={VIEW_BOX}>
        <G>
            {Object.keys(CHINA_PATHS).map((id) => (
                <Path
                    key={id}
                    d={CHINA_PATHS[id].path}
                    fill={getColor(id)}
                    stroke="#FFFFFF"
                    strokeWidth={1}
                    onPress={() => handlePress(id)}
                />
            ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
