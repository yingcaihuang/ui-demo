import { faker } from '@faker-js/faker';
import React, { useMemo, useState } from 'react';
import { Dimensions, GestureResponderEvent, ScrollView, Text, View } from 'react-native';
import { BarChart, LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 40;

// 工具提示组件
const Tooltip = ({ visible, text, x, y }: { visible: boolean; text: string; x: number; y: number }) => {
  if (!visible) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: y - 40,
        left: Math.max(10, Math.min(x - 40, screenWidth - 100)),
        backgroundColor: '#333',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        zIndex: 1000,
      }}>
      <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>{text}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: -5,
          left: 30,
          width: 0,
          height: 0,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: '#333',
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderTopWidth: 5,
        }}
      />
    </View>
  );
};

// 生成随机数据
const generateLineChartData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return {
    labels: months,
    datasets: [
      {
        data: Array.from({ length: 6 }, () => faker.number.int({ min: 20, max: 100 })),
        color: (opacity = 1) => `rgba(134, 65, 250, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: Array.from({ length: 6 }, () => faker.number.int({ min: 30, max: 90 })),
        color: (opacity = 1) => `rgba(255, 106, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

// 生成柱状图数据
const generateBarChartData = () => {
  const categories = ['产品A', '产品B', '产品C', '产品D', '产品E'];
  return {
    labels: categories,
    datasets: [
      {
        data: Array.from({ length: 5 }, () => faker.number.int({ min: 10, max: 100 })),
      },
    ],
  };
};

// 生成饼状图数据
const generatePieChartData = () => {
  return [
    {
      name: '类别A',
      population: faker.number.int({ min: 10, max: 100 }),
      color: '#FF6B6B',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '类别B',
      population: faker.number.int({ min: 10, max: 100 }),
      color: '#4ECDC4',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '类别C',
      population: faker.number.int({ min: 10, max: 100 }),
      color: '#45B7D1',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '类别D',
      population: faker.number.int({ min: 10, max: 100 }),
      color: '#FFA07A',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];
};

// 生成堆叠柱状图数据
const generateStackedBarChartData = () => {
  const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return {
    labels: categories,
    datasets: [
      {
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 10, max: 50 })),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
      {
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 20, max: 60 })),
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
      },
      {
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 10, max: 40 })),
        color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
      },
    ],
  };
};

// 生成面积图数据
const generateAreaChartData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return {
    labels: months,
    datasets: [
      {
        data: Array.from({ length: 6 }, () => faker.number.int({ min: 40, max: 100 })),
        color: (opacity = 1) => `rgba(100, 200, 100, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

// 生成环形图数据（圆环图）
const generateDonutChartData = () => {
  return [
    {
      name: '销售部',
      population: faker.number.int({ min: 15, max: 40 }),
      color: '#FF6B6B',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '技术部',
      population: faker.number.int({ min: 20, max: 50 }),
      color: '#4ECDC4',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '运营部',
      population: faker.number.int({ min: 10, max: 35 }),
      color: '#45B7D1',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '行政部',
      population: faker.number.int({ min: 8, max: 25 }),
      color: '#FFA07A',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: '财务部',
      population: faker.number.int({ min: 5, max: 20 }),
      color: '#DDA0DD',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];
};

// 生成性能指数数据
const generateScatterChartData = () => {
  return [
    { x: faker.number.int({ min: 10, max: 100 }), y: faker.number.int({ min: 10, max: 100 }), r: faker.number.int({ min: 5, max: 15 }) },
    { x: faker.number.int({ min: 10, max: 100 }), y: faker.number.int({ min: 10, max: 100 }), r: faker.number.int({ min: 5, max: 15 }) },
    { x: faker.number.int({ min: 10, max: 100 }), y: faker.number.int({ min: 10, max: 100 }), r: faker.number.int({ min: 5, max: 15 }) },
    { x: faker.number.int({ min: 10, max: 100 }), y: faker.number.int({ min: 10, max: 100 }), r: faker.number.int({ min: 5, max: 15 }) },
    { x: faker.number.int({ min: 10, max: 100 }), y: faker.number.int({ min: 10, max: 100 }), r: faker.number.int({ min: 5, max: 15 }) },
  ];
};

// 生成时间序列数据
const generateTimeSeriesData = () => {
  const hours = ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'];
  return {
    labels: hours,
    datasets: [
      {
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 50, max: 150 })),
        color: (opacity = 1) => `rgba(75, 150, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };
};

// 生成进度表数据
const generateProgressChartData = () => {
  return {
    labels: ['完成度', '用户满意度', '转化率', '保留率'],
    data: [
      parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
      parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
      parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
      parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
    ],
  };
};

// 图表卡片组件
const ChartCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
      <View
        style={{
          backgroundColor: '#FFF',
          borderRadius: 12,
          overflow: 'hidden',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}>
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{title}</Text>
          <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{description}</Text>
        </View>
        <View style={{ paddingBottom: 16 }}>{children}</View>
      </View>
    </View>
  );
};

// 自定义仪表盘组件
const Gauge = ({ value, max = 100, label }: { value: number; max?: number; label: string }) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;
  
  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <View
        style={{
          width: 150,
          height: 80,
          borderTopLeftRadius: 75,
          borderTopRightRadius: 75,
          borderWidth: 3,
          borderColor: '#DDD',
          borderBottomWidth: 0,
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
        }}>
        <View
          style={{
            position: 'absolute',
            height: 80,
            borderTopLeftRadius: 75,
            borderTopRightRadius: 75,
            backgroundColor: percentage > 66 ? '#4ECDC4' : percentage > 33 ? '#FFA07A' : '#FF6B6B',
            width: `${percentage}%`,
          }}
        />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#333', marginTop: 8 }}>
        {value.toFixed(0)}%
      </Text>
      <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{label}</Text>
    </View>
  );
};

// 自定义散点图
const ScatterPlot = ({ data }: { data: Array<{ x: number; y: number; r: number }> }) => {
  return (
    <View style={{ padding: 16, height: 250 }}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: '#EEE', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
        {/* 背景网格 */}
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[...Array(5)].map((_, i) => (
            <View
              key={`h${i}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: 1,
                backgroundColor: '#F0F0F0',
                top: `${(i + 1) * 20}%`,
              }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <View
              key={`v${i}`}
              style={{
                position: 'absolute',
                width: 1,
                height: '100%',
                backgroundColor: '#F0F0F0',
                left: `${(i + 1) * 20}%`,
              }}
            />
          ))}
        </View>
        {/* 数据点 */}
        {data.map((point, idx) => (
          <View
            key={idx}
            style={{
              position: 'absolute',
              width: point.r * 2,
              height: point.r * 2,
              borderRadius: point.r,
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#DDA0DD'][idx % 5],
              left: `${(point.x / 100) * 100 - point.r / 2}%`,
              top: `${(100 - point.y / 100 * 100) - point.r / 2}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={{ fontSize: 10, color: '#999' }}>0</Text>
        <Text style={{ fontSize: 10, color: '#999' }}>50</Text>
        <Text style={{ fontSize: 10, color: '#999' }}>100</Text>
      </View>
    </View>
  );
};

export default function AnalyticsScreen() {
  const lineData = useMemo(() => generateLineChartData(), []);
  const barData = useMemo(() => generateBarChartData(), []);
  const pieData = useMemo(() => generatePieChartData(), []);
  const progressData = useMemo(() => generateProgressChartData(), []);
  const stackedBarData = useMemo(() => generateStackedBarChartData(), []);
  const areaChartData = useMemo(() => generateAreaChartData(), []);
  const donutChartData = useMemo(() => generateDonutChartData(), []);
  const scatterData = useMemo(() => generateScatterChartData(), []);
  const timeSeriesData = useMemo(() => generateTimeSeriesData(), []);

  const [lineTooltip, setLineTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [barTooltip, setBarTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [pieTooltip, setPieTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [stackedTooltip, setStackedTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [areaTooltip, setAreaTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [donutTooltip, setDonutTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const handleLineChartPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const dataIndex = Math.floor((locationX / chartWidth) * lineData.labels.length);
    if (dataIndex >= 0 && dataIndex < lineData.labels.length) {
      const value1 = lineData.datasets[0].data[dataIndex];
      const value2 = lineData.datasets[1].data[dataIndex];
      setLineTooltip({
        visible: true,
        text: `${lineData.labels[dataIndex]}: ${value1}/${value2}`,
        x: locationX,
        y: locationY,
      });
      setTimeout(
        () => setLineTooltip((prev) => ({ ...prev, visible: false })),
        2000
      );
    }
  };

  const handleBarChartPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const dataIndex = Math.floor((locationX / chartWidth) * barData.labels.length);
    if (dataIndex >= 0 && dataIndex < barData.labels.length) {
      const value = barData.datasets[0].data[dataIndex];
      setBarTooltip({
        visible: true,
        text: `${barData.labels[dataIndex]}: ${value}`,
        x: locationX,
        y: locationY,
      });
      setTimeout(() => setBarTooltip((prev) => ({ ...prev, visible: false })), 2000);
    }
  };

  const handlePieChartPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const center = chartWidth / 2;
    const distance = Math.sqrt(
      Math.pow(locationX - center, 2) + Math.pow(locationY - 110, 2)
    );
    if (distance < 100) {
      const index = Math.floor((pieData.length * distance) / 100);
      if (index < pieData.length) {
        setPieTooltip({
          visible: true,
          text: `${pieData[index].name}: ${pieData[index].population}`,
          x: locationX,
          y: locationY,
        });
        setTimeout(
          () => setPieTooltip((prev) => ({ ...prev, visible: false })),
          2000
        );
      }
    }
  };

  const handleStackedBarPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const dataIndex = Math.floor((locationX / chartWidth) * stackedBarData.labels.length);
    if (dataIndex >= 0 && dataIndex < stackedBarData.labels.length) {
      const val1 = stackedBarData.datasets[0].data[dataIndex];
      const val2 = stackedBarData.datasets[1].data[dataIndex];
      const val3 = stackedBarData.datasets[2].data[dataIndex];
      setStackedTooltip({
        visible: true,
        text: `${stackedBarData.labels[dataIndex]}: ${val1}/${val2}/${val3}`,
        x: locationX,
        y: locationY,
      });
      setTimeout(() => setStackedTooltip((prev) => ({ ...prev, visible: false })), 2000);
    }
  };

  const handleAreaChartPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const dataIndex = Math.floor((locationX / chartWidth) * areaChartData.labels.length);
    if (dataIndex >= 0 && dataIndex < areaChartData.labels.length) {
      const value = areaChartData.datasets[0].data[dataIndex];
      setAreaTooltip({
        visible: true,
        text: `${areaChartData.labels[dataIndex]}: ${value}`,
        x: locationX,
        y: locationY,
      });
      setTimeout(() => setAreaTooltip((prev) => ({ ...prev, visible: false })), 2000);
    }
  };

  const handleDonutChartPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const center = chartWidth / 2;
    const distance = Math.sqrt(
      Math.pow(locationX - center, 2) + Math.pow(locationY - 110, 2)
    );
    if (distance < 100 && distance > 50) {
      const index = Math.floor((donutChartData.length * distance) / 100);
      if (index < donutChartData.length) {
        setDonutTooltip({
          visible: true,
          text: `${donutChartData[index].name}: ${donutChartData[index].population}人`,
          x: locationX,
          y: locationY,
        });
        setTimeout(
          () => setDonutTooltip((prev) => ({ ...prev, visible: false })),
          2000
        );
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 20 }}>
        {/* 标题 */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#333' }}>统计分析</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 4 }}>
            💡 点击图表查看数据详情
          </Text>
        </View>

        {/* 折线图 */}
        <ChartCard title="趋势分析" description="过去六个月的数据趋势">
          <View
            onTouchEnd={handleLineChartPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={lineTooltip.visible}
              text={lineTooltip.text}
              x={lineTooltip.x}
              y={lineTooltip.y}
            />
            <LineChart
              data={lineData}
              width={chartWidth}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                style: { borderRadius: 12 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#8641FA',
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              bezier
              style={{ marginVertical: 0, paddingRight: 10 }}
            />
          </View>
        </ChartCard>

        {/* 柱状图 */}
        <ChartCard title="产品对比" description="各产品销售数据对比">
          <View
            onTouchEnd={handleBarChartPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={barTooltip.visible}
              text={barTooltip.text}
              x={barTooltip.x}
              y={barTooltip.y}
            />
            <BarChart
              data={barData}
              width={chartWidth}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                barPercentage: 0.7,
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{ marginVertical: 0, paddingRight: 10 }}
            />
          </View>
        </ChartCard>

        {/* 饼状图 */}
        <ChartCard title="市场份额" description="各类别的市场占比">
          <View
            onTouchEnd={handlePieChartPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={pieTooltip.visible}
              text={pieTooltip.text}
              x={pieTooltip.x}
              y={pieTooltip.y}
            />
            <PieChart
              data={pieData}
              width={chartWidth}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              style={{ marginVertical: 0 }}
            />
          </View>
        </ChartCard>

        {/* 进度表 */}
        <ChartCard title="性能指标" description="关键业务指标进度">
          <ProgressChart
            data={progressData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              color: (opacity = 1) => `rgba(134, 65, 250, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
              strokeWidth: 2,
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={{ marginVertical: 0 }}
            hideLegend={false}
          />
        </ChartCard>

        {/* 堆叠柱状图 */}
        <ChartCard title="周度对比" description="周一到周日的多维数据对比">
          <View
            onTouchEnd={handleStackedBarPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={stackedTooltip.visible}
              text={stackedTooltip.text}
              x={stackedTooltip.x}
              y={stackedTooltip.y}
            />
            <BarChart
              data={stackedBarData}
              width={chartWidth}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                barPercentage: 0.5,
                propsForLabels: {
                  fontSize: 11,
                },
              }}
              style={{ marginVertical: 0, paddingRight: 10 }}
            />
          </View>
        </ChartCard>

        {/* 面积图 */}
        <ChartCard title="趋势面积图" description="平滑曲线面积展示">
          <View
            onTouchEnd={handleAreaChartPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={areaTooltip.visible}
              text={areaTooltip.text}
              x={areaTooltip.x}
              y={areaTooltip.y}
            />
            <LineChart
              data={areaChartData}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(100, 200, 100, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: '#4ECDC4',
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              bezier
              withHorizontalLabels={true}
              style={{ marginVertical: 0, paddingRight: 10 }}
            />
          </View>
        </ChartCard>

        {/* 环形图 */}
        <ChartCard title="部门分布" description="各部门人员占比">
          <View
            onTouchEnd={handleDonutChartPress}
            style={{ position: 'relative' }}>
            <Tooltip
              visible={donutTooltip.visible}
              text={donutTooltip.text}
              x={donutTooltip.x}
              y={donutTooltip.y}
            />
            <PieChart
              data={donutChartData}
              width={chartWidth}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              style={{ marginVertical: 0 }}
            />
          </View>
        </ChartCard>

        {/* 散点图 */}
        <ChartCard title="性能分布" description="产品性能与用户满意度相关性">
          <ScatterPlot data={scatterData} />
        </ChartCard>

        {/* 时间序列图 */}
        <ChartCard title="实时监控" description="过去24小时的关键指标变化">
          <LineChart
            data={timeSeriesData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              color: (opacity = 1) => `rgba(75, 150, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#4B96FF',
              },
              propsForLabels: {
                fontSize: 11,
              },
            }}
            bezier
            style={{ marginVertical: 0, paddingRight: 10 }}
          />
        </ChartCard>

        {/* 仪表盘 */}
        <ChartCard title="性能指数" description="关键业务KPI仪表盘">
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Gauge value={faker.number.int({ min: 50, max: 100 })} label="性能评分" />
              <Gauge value={faker.number.int({ min: 60, max: 95 })} label="用户评分" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Gauge value={faker.number.int({ min: 70, max: 100 })} label="可用性" />
              <Gauge value={faker.number.int({ min: 40, max: 85 })} label="稳定性" />
            </View>
          </View>
        </ChartCard>

        {/* 数据卡片 */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
            }}>
            关键指标
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 12,
                padding: 16,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
                日活用户
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#8641FA' }}>
                {faker.number.int({ min: 10000, max: 100000 })}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 12,
                padding: 16,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
                转化率
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#FF6B6B' }}>
                {faker.number.int({ min: 5, max: 25 })}%
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 12,
                padding: 16,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
                收入
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#4ECDC4' }}>
                ¥{faker.number.int({ min: 10000, max: 100000 })}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 12,
                padding: 16,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
                留存率
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#45B7D1' }}>
                {faker.number.int({ min: 20, max: 80 })}%
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
