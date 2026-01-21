import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- Components ---

const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const Avatar = ({ source, size = 50 }: { source: any, size?: number }) => (
  <Image source={source} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#ddd' }} />
);

const Badge = ({ text, color = '#2196F3' }: { text: string, color?: string }) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

// --- Demo Sections ---

const ProfileSection = () => (
  <View style={styles.section}>
    <SectionTitle title="用户资料卡片" />
    <Card>
      <View style={styles.profileHeader}>
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=68' }} size={60} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileRole}>UI/UX Designer</Text>
          <View style={styles.row}>
            <Badge text="Pro Member" color="#FF9800" />
            <View style={{ width: 8 }} />
            <Badge text="Verified" color="#4CAF50" />
          </View>
        </View>
        <TouchableOpacity>
           <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>245</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12.4k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </Card>
  </View>
);

const EcommerceSection = () => (
  <View style={styles.section}>
    <SectionTitle title="电商商品卡片" />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={[styles.card, styles.productCard]}>
          <Image source={{ uri: `https://picsum.photos/300/300?random=${item}` }} style={styles.productImage} />
          <View style={styles.productContent}>
            <Text style={styles.productTag}>NEW ARRIVAL</Text>
            <Text style={styles.productTitle}>Minimalist Chair {item}</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.productPrice}>$129.00</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

const SettingsSection = () => {
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(false);
    
    const SettingItem = ({ icon, label, value, onValueChange, color }: any) => (
        <View style={styles.settingItem}>
            <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: color }]}>
                    <Ionicons name={icon} size={20} color="#fff" />
                </View>
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            <Switch value={value} onValueChange={onValueChange} trackColor={{ true: color }} />
        </View>
    );

    return (
        <View style={styles.section}>
            <SectionTitle title="设置列表元素" />
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <SettingItem 
                    icon="wifi" 
                    label="Wi-Fi" 
                    value={wifi} 
                    onValueChange={setWifi} 
                    color="#2196F3" 
                />
                <View style={styles.divider} />
                 <SettingItem 
                    icon="bluetooth" 
                    label="Bluetooth" 
                    value={bluetooth} 
                    onValueChange={setBluetooth} 
                    color="#3F51B5" 
                />
                 <View style={styles.divider} />
                 <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.row}>
                        <View style={[styles.iconBox, { backgroundColor: '#FF5722' }]}>
                            <Ionicons name="notifications" size={20} color="#fff" />
                        </View>
                        <Text style={styles.settingLabel}>Notifications</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
            </Card>
        </View>
    );
};

const InputsSection = () => (
    <View style={styles.section}>
        <SectionTitle title="输入框与按钮" />
        <Card>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                <TextInput style={styles.input} placeholder="name@example.com" placeholderTextColor="#999" />
            </View>
            
            <View style={{ height: 16 }} />
            
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry placeholderTextColor="#999" />
                <Ionicons name="eye-off-outline" size={20} color="#666" />
            </View>

            <View style={{ height: 24 }} />

            <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
             <View style={{ height: 12 }} />
            <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Create Account</Text>
            </TouchableOpacity>
        </Card>
    </View>
);

const GlassSection = () => (
    <View style={styles.section}>
        <SectionTitle title="Glassmorphism (需 Expo Blur)" />
        <View style={styles.glassContainer}>
            <Image source={{ uri: 'https://picsum.photos/600/400' }} style={styles.glassBackground} />
            {Platform.OS !== 'web' && (
                <BlurView intensity={80} tint="light" style={styles.glassCard}>
                    <Text style={styles.glassTitle}>Glass Effect</Text>
                    <Text style={styles.glassText}>
                        This mimics a frosted glass effect using `expo-blur`. It adds depth and modern feel to the UI.
                    </Text>
                    <TouchableOpacity style={styles.glassButton}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Explore</Text>
                    </TouchableOpacity>
                </BlurView>
            )}
            {Platform.OS === 'web' && (
               <View style={[styles.glassCard, { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)' }]}>
                    <Text style={styles.glassTitle}>Glass Effect (Web)</Text>
                    <Text style={styles.glassText}>
                        Simulated glass effect for web platform.
                    </Text>
               </View>
            )}
        </View>
    </View>
);

export default function UIDemoScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <Text style={styles.title}>UI Kit Demo</Text>
            <Text style={styles.subtitle}>Modern Native Components</Text>
        </View>

        <ProfileSection />
        <SettingsSection />
        <EcommerceSection />
        <InputsSection />
        <GlassSection />
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f6',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  // Profile
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  // Setting
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  // Product
  productCard: {
    width: 200,
    marginRight: 16,
    padding: 0,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 12,
  },
  productTag: {
    fontSize: 10,
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Input
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  outlineButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  // Glass
  glassContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  glassCard: {
    width: '85%',
    padding: 24,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  glassTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  glassText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  glassButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  }
});
