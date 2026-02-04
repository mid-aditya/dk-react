import React, { useEffect, useRef, useState } from 'react';

interface Agent {
  id: string;
  name: string;
  calls: number;
  successRate: number;
}

const Outbound: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [stats, setStats] = useState({
    totalCalls: 0,
    answeredCalls: 0,
    missedCalls: 0,
    agentsActive: 0,
    callsMade: 0,
    pbxCalls: 0,
    successRate: 0.0,
    capacityPercent: 0,
    trend: '+12.5%',
  });

  const [topAgents, setTopAgents] = useState<Agent[]>([]);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const areaChartRef = useRef<HTMLCanvasElement>(null);

  // Update waktu setiap detik
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const formattedTime = `${dayName}, ${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;
      setCurrentDateTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animate progress bars
  useEffect(() => {
    const animateBars = () => {
      const capacityBar = document.getElementById('capacityBar');
      if (capacityBar) {
        setTimeout(() => {
          capacityBar.style.width = `${stats.capacityPercent}%`;
        }, 500);
      }
    };

    animateBars();
  }, [stats.capacityPercent]);

  // Draw simple canvas charts
  useEffect(() => {
    // Draw donut chart
    if (donutChartRef.current) {
      const canvas = donutChartRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(rect.width, rect.height) / 2 - 20;
        const total = stats.answeredCalls + stats.missedCalls || 1;
        const answeredPercent = (stats.answeredCalls / total) * 100;
        const missedPercent = (stats.missedCalls / total) * 100;

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Draw answered arc (green)
        if (answeredPercent > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (answeredPercent / 100) * 2 * Math.PI);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 20;
          ctx.stroke();
        }

        // Draw missed arc (red)
        if (missedPercent > 0) {
          ctx.beginPath();
          ctx.arc(
            centerX,
            centerY,
            radius,
            (-Math.PI / 2) + (answeredPercent / 100) * 2 * Math.PI,
            (-Math.PI / 2) + 2 * Math.PI
          );
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 20;
          ctx.stroke();
        }
      }
    }

    // Draw area chart
    if (areaChartRef.current) {
      const canvas = areaChartRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        const width = rect.width;
        const height = rect.height;
        const data = [75, 78, 82, 88, 92, 89, 85, 84];
        const min = 70;
        const max = 100;
        const range = max - min;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = (height / 4) * i;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw area
        ctx.beginPath();
        ctx.moveTo(0, height);
        data.forEach((value, index) => {
          const x = (width / (data.length - 1)) * index;
          const y = height - ((value - min) / range) * height;
          ctx.lineTo(x, y);
        });
        ctx.lineTo(width, height);
        ctx.closePath();

        // Fill gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.moveTo(0, height - ((data[0] - min) / range) * height);
        data.forEach((value, index) => {
          const x = (width / (data.length - 1)) * index;
          const y = height - ((value - min) / range) * height;
          ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }, [stats]);

  // Handle window resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force chart redraw on resize by triggering state update
        setStats((prev) => ({ ...prev }));
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Auto refresh every 30 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      // TODO: Fetch new data from API
      // fetchData();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Fetch data (placeholder)
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchStats();
    // fetchTopAgents();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
        <style>{`
          .parent {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto auto;
            gap: 1rem;
          }
          
          .div1 {
            grid-column: 1 / 5;
            grid-row: 1;
          }
          
          .div2 {
            grid-column: 5 / 7;
            grid-row: 1;
          }
          
          .div3 {
            grid-column: 7 / 10;
            grid-row: 1;
          }
          
          .div4 {
            grid-column: 10 / 13;
            grid-row: 1;
          }
          
          .div5 {
            grid-column: 1 / 7;
            grid-row: 2;
          }
          
          .div6 {
            grid-column: 7 / 13;
            grid-row: 2;
          }
          
          @media (max-width: 1024px) {
            .parent {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
            }
            
            .div1, .div2, .div3, .div4, .div5, .div6 {
              grid-column: 1;
              grid-row: auto;
            }
          }
          
          .card {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .metric-value {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1;
          }
        `}</style>

        {/* Header */}
        <div className="mb-2 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Outbound Wallboard
            </h1>
            <p className="text-slate-400">Real-time Performance</p>
          </div>
          <div className="text-right">
            <div className="text-slate-300 text-lg font-medium" id="currentDateTime">
              {currentDateTime}
            </div>
            <div className="text-slate-500 text-sm">Live Data</div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="parent">
          {/* Div 1: Donut Chart with Call Stats */}
          <div className="div1 card rounded-lg p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4">Call Overview</h2>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative" style={{ width: '200px', height: '200px' }}>
                <canvas
                  id="donutChart"
                  ref={donutChartRef}
                  className="absolute inset-0 w-full h-full"
                ></canvas>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-2xl font-bold text-white" id="totalCalls">
                    {stats.totalCalls}
                  </div>
                  <div className="text-xs text-slate-400">Total Calls</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-white" id="totalCalls2">
                  {stats.totalCalls}
                </div>
                <div className="text-xs text-slate-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400" id="answeredCalls">
                  {stats.answeredCalls}
                </div>
                <div className="text-xs text-slate-400">Answered</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-400" id="missedCalls">
                  {stats.missedCalls}
                </div>
                <div className="text-xs text-slate-400">Missed</div>
              </div>
            </div>
          </div>

          {/* Div 2: Agent Active */}
          <div className="div2 card rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-slate-400 text-sm mb-2">Agents Active</div>
            <div className="metric-value text-purple-400">{stats.agentsActive}</div>
            <div className="text-slate-500 text-xs mt-2">Online</div>
            <div className="mt-4 w-full">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Capacity</span>
                <span id="capacityPercent">{stats.capacityPercent}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full capacity-bar transition-all duration-500"
                  id="capacityBar"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Div 3: Calls Made */}
          <div className="div3 card rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-slate-400 text-sm mb-2">Calls Made</div>
            <div className="metric-value text-orange-400">{stats.callsMade}</div>
            <div className="text-slate-500 text-xs mt-2">By agents</div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <i className="bx bx-trending-up text-green-400"></i>
              <span className="text-green-400 font-medium">{stats.trend}</span>
              <span className="text-slate-500">vs yesterday</span>
            </div>
          </div>

          {/* Div 4: PBX Calls */}
          <div className="div4 card rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-slate-400 text-sm mb-2">PBX Calls</div>
            <div className="metric-value text-cyan-400">{stats.pbxCalls}</div>
            <div className="text-slate-500 text-xs mt-2">System</div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400">Status: Online</span>
            </div>
          </div>

          {/* Div 5: Success Rate with Area Chart */}
          <div className="div5 card rounded-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-white">Success Rate</h2>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">{stats.successRate.toFixed(1)}%</div>
                <div className="text-xs text-slate-400">Average</div>
              </div>
            </div>
            <div className="flex-1" style={{ height: '120px' }}>
              <canvas
                id="areaChart"
                ref={areaChartRef}
                className="w-full h-full"
              ></canvas>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-xs text-slate-400 mb-1">Peak</div>
                <div className="text-sm font-bold text-green-400">92.1%</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-xs text-slate-400 mb-1">Avg Rate</div>
                <div className="text-sm font-bold text-blue-400">0/h</div>
              </div>
            </div>
          </div>

          {/* Div 6: Top Agents List */}
          <div className="div6 card rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-white">Top 5 Agents</h2>
              <div className="text-slate-500 text-xs">Live Ranking</div>
            </div>

            <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {topAgents.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <div className="text-slate-400">
                    <i className="bx bx-info-circle text-4xl mb-4"></i>
                    <p>No agent data available</p>
                  </div>
                </div>
              ) : (
                topAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-[var(--bg-tertiary)] rounded-lg p-3 border border-[var(--border-color)]"
                  >
                    <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                      {agent.name}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Calls: {agent.calls}
                    </div>
                    <div className="text-xs text-green-400 font-medium mt-1">
                      {agent.successRate}% success
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Outbound;

