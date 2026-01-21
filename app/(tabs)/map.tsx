import { faker } from '@faker-js/faker';
import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Path } from 'react-native-svg';
import { CHINA_PATHS } from '../../constants/chinaPaths';

const screenWidth = Dimensions.get('window').width;

// Map ID to Chinese Name
const ID_TO_NAME: Record<string, string> = {
  'CN-34': '安徽',
  'CN-11': '北京',
  'CN-50': '重庆',
  'CN-35': '福建',
  'CN-44': '广东',
  'CN-62': '甘肃',
  'CN-45': '广西',
  'CN-52': '贵州',
  'CN-46': '海南',
  'CN-13': '河北',
  'CN-41': '河南',
  'CN-91': '香港',
  'CN-23': '黑龙江',
  'CN-43': '湖南',
  'CN-42': '湖北',
  'CN-22': '吉林',
  'CN-32': '江苏',
  'CN-36': '江西',
  'CN-21': '辽宁',
  'CN-92': '澳门',
  'CN-15': '内蒙古',
  'CN-64': '宁夏',
  'CN-63': '青海',
  'CN-61': '陕西',
  'CN-51': '四川',
  'CN-37': '山东',
  'CN-31': '上海',
  'CN-14': '山西',
  'CN-12': '天津',
  'CN-71': '台湾',
  'CN-65': '新疆',
  'CN-54': '西藏',
  'CN-53': '云南',
  'CN-33': '浙江'
};

// Generate data for all paths
const PROVINCE_DATA = Object.keys(CHINA_PATHS).map(key => {
  const name = ID_TO_NAME[key] || CHINA_PATHS[key].name;
  return {
    id: key,
    name,
    population: faker.number.int({ min: 300, max: 12000 }),
    color: ['#FF6B6B', '#FF8F8F', '#FFA07A', '#FFD700', '#90EE90'][
        Math.floor(Math.random() * 5)
    ],
  };
});

export default function MapScreen() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);

  const totalPopulation = useMemo(
    () => PROVINCE_DATA.reduce((sum, p) => sum + p.population, 0),
    []
  );

  const avgPopulation = useMemo(
    () => Math.round(totalPopulation / PROVINCE_DATA.length),
    [totalPopulation]
  );

  const selectedData = useMemo(
    () => selectedProvinceId ? PROVINCE_DATA.find(p => p.id === selectedProvinceId) : null,
    [selectedProvinceId]
  );

  const maxPopulation = useMemo(
    () => Math.max(...PROVINCE_DATA.map(p => p.population)),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} edges={['top', 'left', 'right']}>
      <ScrollView>
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>中国人口分布热力图 {new Date().getFullYear()}</Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#333' }}>中国地图</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 4 }}>
            点击省份查看详细数据
          </Text>
        </View>

        {/* Selected Details - Showing immediately when available */}
        {selectedData ? (
             <View style={{ 
                padding: 16, 
                backgroundColor: '#FFF', 
                marginHorizontal: 20, 
                marginBottom: 20, 
                borderRadius: 12, 
                borderLeftWidth: 5, 
                borderLeftColor: '#2196F3',
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
             }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedData.name}</Text>
                    <TouchableOpacity onPress={() => setSelectedProvinceId(null)}>
                        <Text style={{ color: '#999' }}>关闭</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, color: '#666', marginTop: 8 }}>人口规模: <Text style={{ fontWeight: 'bold', color: '#333' }}>{selectedData.population} 万</Text></Text>
                <Text style={{ fontSize: 14, color: '#999', marginTop: 4 }}>区域代码: {selectedData.id}</Text>
             </View>
        ) : null}

        {/* Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
             <View>
                <Text style={{ fontSize: 12, color: '#999' }}>总人口 (模拟)</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{(totalPopulation / 100).toFixed(1)}亿</Text>
             </View>
             <View>
                <Text style={{ fontSize: 12, color: '#999' }}>平均人口</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{avgPopulation}万</Text>
             </View>
             <View>
                <Text style={{ fontSize: 12, color: '#999' }}>最高</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{maxPopulation}万</Text>
             </View>
          </View>
        </View>

        {/* Map Container */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={screenWidth * 1.5} height={screenWidth * 1.5 * 0.75} viewBox="0 0 1000 800">
                    <G>
                        {PROVINCE_DATA.map((item) => {
                            const pathData = CHINA_PATHS[item.id];
                            if (!pathData) return null;
                            
                            const isSelected = selectedProvinceId === item.id;
                            
                            return (
                                <Path
                                    key={item.id}
                                    d={pathData.path}
                                    fill={isSelected ? '#2196F3' : item.color}
                                    stroke="#FFF"
                                    strokeWidth={isSelected ? 2 : 1}
                                    onPress={() => {
                                        console.log('Pressed:', item.name);
                                        setSelectedProvinceId(item.id);
                                    }}
                                />
                            );
                        })}
                    </G>
                </Svg>
            </View>
        </ScrollView>
        
        {/* Helper Hint */}
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
            <Text style={{ color: '#999', fontSize: 12 }}>可以左右滑动查看完整地图</Text>
        </View>
        
         {/* List */}
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>数据列表</Text>
             {PROVINCE_DATA.sort((a,b) => b.population - a.population).map((item, index) => {
                const isSelected = selectedProvinceId === item.id;
                return (
                    <TouchableOpacity 
                        key={item.id} 
                        style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            marginBottom: 12,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f0f0f0',
                            backgroundColor: isSelected ? '#E3F2FD' : 'transparent',
                            borderRadius: 8
                        }}
                        onPress={() => setSelectedProvinceId(item.id)}
                    >
                        <Text style={{ width: 30, color: '#999', fontWeight: 'bold' }}>{index + 1}</Text>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: item.color, marginRight: 12 }} />
                        <Text style={{ flex: 1, fontSize: 16, fontWeight: isSelected ? 'bold' : 'normal' }}>{item.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.population} 万</Text>
                    </TouchableOpacity>
                );
             })}
            <View style={{ height: 100 }} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
