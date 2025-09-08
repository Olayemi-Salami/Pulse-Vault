import React, { useState } from 'react';
import { Plus, Shield, FileText, Bot, TrendingUp, Activity, Eye, AlertTriangle, Check, Clock,User,Copy,Settings, LogIn} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'data_access' | 'synchronization' | 'analysis' | 'consent' | 'access_blocked';
  title: string;
  timeAgo: string;
  status?: 'completed' | 'updated' | 'blocked';
}

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const Login: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('select');

  // Mock data
  const walletAddress = "0x74238C955496820232ab96908Bf3B080";
  const decentralizedId = "did:health:zQmhafgZbvDvtm1$5K7Ag144MCqKLnqgmrGabGK";

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      label: 'Avg Sleep',
      value: '7.2h',
      unit: '',
      icon: <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: '2',
      label: 'Resting HR',
      value: '72',
      unit: 'bpm',
      icon: <Activity className="w-6 h-6 text-red-400" />,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      id: '3',
      label: 'Daily Steps',
      value: '8.4k',
      unit: '',
      icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'data_access',
      title: 'Data access granted to Dr. Johnson',
      timeAgo: '3 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'synchronization',
      title: 'Health data synchronized',
      timeAgo: '5 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'analysis',
      title: 'AI analysis completed',
      timeAgo: '8 hours ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'consent',
      title: 'Consent updated for research study',
      timeAgo: '1 day ago',
      status: 'updated'
    },
    {
      id: '5',
      type: 'access_blocked',
      title: 'Unauthorized access attempt blocked',
      timeAgo: '2 days ago',
      status: 'blocked'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'data_access': return <User className="w-4 h-4" />;
      case 'synchronization': return <Activity className="w-4 h-4" />;
      case 'analysis': return <TrendingUp className="w-4 h-4" />;
      case 'consent': return <FileText className="w-4 h-4" />;
      case 'access_blocked': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'updated': return 'text-blue-400';
      case 'blocked': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-purple-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold">PulseVault</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm">Dr. Sarah Chen</span>
          </div>
          <button className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Wallet Info */}
        <section className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-700 rounded"></div>
              Wallet Information
            </h2>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Check className="w-4 h-4" /> Set / Update DID
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Wallet Address', value: walletAddress },
              { label: 'Decentralized ID (DID)', value: decentralizedId }
            ].map((item) => (
              <div key={item.label}>
                <label className="block text-sm text-gray-300 mb-2">{item.label}</label>
                <div className="flex items-center gap-2 bg-purple-950/50 rounded-lg p-3">
                  <span className="flex-1 text-sm font-mono truncate">{item.value}</span>
                  <button 
                    onClick={() => copyToClipboard(item.value)}
                    className="p-1 hover:bg-purple-700/50 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Health Entry', icon: <Plus />, bg: 'bg-green-600', hover: 'hover:bg-green-700' },
              { label: 'Grant Consent', icon: <Shield />, bg: 'bg-blue-600', hover: 'hover:bg-blue-700' },
              { label: 'View Audit Log', icon: <FileText />, bg: 'bg-purple-700', hover: 'hover:bg-purple-800' },
              { label: 'AI Health Coach', icon: <Bot />, bg: 'bg-orange-600', hover: 'hover:bg-orange-700' }
            ].map((action) => (
              <button key={action.label} className={`${action.bg} ${action.hover} rounded-xl p-4 transition-colors group`}>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Health Summary */}
          <section className="lg:col-span-2 bg-purple-900/40 backdrop-blur-sm rounded-xl border border-purple-700/30">
            <div className="p-6 border-b border-purple-700/30 flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" /> Health Summary
              </h3>
              <span className="text-sm text-gray-400">Last updated: 3 hours ago</span>
            </div>
            <div className="p-6 space-y-6">
              {/* AI Insight */}
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-green-300 mb-1">AI Insight</h4>
                  <p className="text-sm text-green-200">
                    Your sleep quality improved by 12% this week! Consistent sleep schedule and reduced screen time are paying off.
                  </p>
                </div>
              </div>

              {/* Health Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="text-center">
                    <div className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      {metric.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {metric.value}{metric.unit && <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>}
                    </div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-purple-900/40 backdrop-blur-sm rounded-xl border border-purple-700/30">
            <div className="p-6 border-b border-purple-700/30 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${activity.status === 'blocked' ? 'bg-red-500/20' : 'bg-purple-700/20'} rounded-full flex items-center justify-center mt-0.5`}>
                    <div className={getActivityColor(activity.status)}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-400">{activity.timeAgo}</p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">
                View All Activity
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center">
          <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-2 border border-purple-700/30">
            <div className="flex items-center gap-2">
              {['select', 'move', 'notes'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTab === tab ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
