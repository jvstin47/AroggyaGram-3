import React, { useState } from 'react';
import {
  Sliders, Play, RefreshCw, AlertTriangle, ShieldCheck, Activity,
  Users, MapPin, Clock, CloudRain, Moon, Sun, CheckCircle2, TrendingUp
} from 'lucide-react';

export const ResponseSimulator: React.FC = () => {
  const [volunteers, setVolunteers] = useState<number>(35);
  const [radiusKm, setRadiusKm] = useState<number>(8);
  const [caseLoad, setCaseLoad] = useState<number>(40);
  const [weather, setWeather] = useState<'clear' | 'monsoon' | 'night'>('clear');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationRan, setSimulationRan] = useState<boolean>(false);

  // Algorithmic simulation calculations
  const calculateMetrics = () => {
    const weatherPenalty = weather === 'monsoon' ? 1.6 : weather === 'night' ? 1.3 : 1.0;
    const densityRatio = volunteers / (caseLoad * 0.8 || 1);
    
    // Average response time in minutes
    const baseMinutes = (radiusKm * 2.2) / Math.max(0.5, densityRatio);
    const avgResponseTime = Math.max(8, Math.round(baseMinutes * weatherPenalty));

    // Coverage rate percentage
    const baseCoverage = Math.min(100, Math.round((volunteers / (caseLoad * 0.6)) * 85));
    const coverageRate = Math.max(45, Math.min(99, Math.round(baseCoverage / (weather === 'monsoon' ? 1.15 : 1))));

    // Volunteer utilization percentage
    const volunteerUtilization = Math.min(100, Math.round((caseLoad / Math.max(1, volunteers)) * 70));

    // Emergency 108 dispatch time (always priority fast-tracked)
    const emergencyDispatchTime = weather === 'monsoon' ? 14 : weather === 'night' ? 11 : 9;

    // Bottleneck detection rules
    const bottlenecks: string[] = [];
    if (volunteers < 20 && caseLoad >= 40) {
      bottlenecks.push('Critical responder shortage: volunteer pool insufficient for peak load.');
    }
    if (radiusKm > 12) {
      bottlenecks.push('Extended response radius exceeds 12 km: rural travel delays degrade urgent medication delivery.');
    }
    if (weather === 'monsoon') {
      bottlenecks.push('Monsoon weather condition: River Road waterlogging slows four-wheeler ambulance transit by 35%.');
    }
    if (volunteerUtilization > 85) {
      bottlenecks.push('High volunteer fatigue risk: average responder assigned to >3 active cases.');
    }
    if (bottlenecks.length === 0) {
      bottlenecks.push('Network operating at optimal equilibrium with zero detected latency bottlenecks.');
    }

    return {
      avgResponseTime,
      coverageRate,
      volunteerUtilization,
      emergencyDispatchTime,
      bottlenecks
    };
  };

  const metrics = calculateMetrics();

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationRan(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationRan(true);
    }, 800);
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-xl mx-auto space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E7A5B]">
            Community Analytics & Testing
          </span>
          <span className="bg-emerald-100 text-[#005448] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
            Live Testbed
          </span>
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">
          Response Network Simulator
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Stress-test the AroggyaGram multi-factor coordination engine under varying volunteer densities, terrain radii, and environmental constraints.
        </p>
      </div>

      {/* PARAMETER CONTROLS CARD */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005448] border-b border-stone-100 pb-2">
          <Sliders className="w-4 h-4" />
          Simulation Parameters
        </div>

        {/* 1. Active Volunteer Pool Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#005448]" />
              Active Verified Volunteers:
            </span>
            <span className="font-black text-sm text-[#005448] bg-emerald-50 px-2 py-0.5 rounded-md">
              {volunteers} responders
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={volunteers}
            onChange={(e) => setVolunteers(Number(e.target.value))}
            className="w-full accent-[#005448] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold">
            <span>5 (Low)</span>
            <span>50 (Moderate)</span>
            <span>100 (Full Network)</span>
          </div>
        </div>

        {/* 2. Response Radius Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Service Cluster Radius:
            </span>
            <span className="font-black text-sm text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
              {radiusKm} km
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={25}
            step={1}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold">
            <span>2 km (Dense Ward)</span>
            <span>12 km (Taluk)</span>
            <span>25 km (District Edge)</span>
          </div>
        </div>

        {/* 3. Daily Incident Load */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-600" />
              Simulated Incident Load:
            </span>
            <span className="font-black text-sm text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
              {caseLoad} cases / day
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={caseLoad}
            onChange={(e) => setCaseLoad(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold">
            <span>10 cases</span>
            <span>50 cases</span>
            <span>100 cases (Peak Surge)</span>
          </div>
        </div>

        {/* 4. Environmental Condition Chips */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-stone-700 block">
            Environmental Constraint:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setWeather('clear')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                weather === 'clear'
                  ? 'bg-emerald-50 border-[#005448] text-[#005448]'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              Clear Weather
            </button>
            <button
              type="button"
              onClick={() => setWeather('monsoon')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                weather === 'monsoon'
                  ? 'bg-blue-50 border-blue-600 text-blue-700'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}
            >
              <CloudRain className="w-4 h-4 text-blue-500" />
              Monsoon Rain
            </button>
            <button
              type="button"
              onClick={() => setWeather('night')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                weather === 'night'
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-500" />
              Late Night
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isSimulating}
          onClick={handleRunSimulation}
          className="w-full py-3.5 bg-[#005448] hover:bg-[#004037] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-[#005448]/20 transition-all flex items-center justify-center gap-2"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Simulating Response Dynamics...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Run Simulation Engine
            </>
          )}
        </button>
      </div>

      {/* SIMULATED PERFORMANCE METRICS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-800">
            Network Efficiency Snapshot
          </h3>
          <span className="text-[10px] text-stone-500 font-bold">
            Simulated in Real Time
          </span>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* 1. Avg Response Time */}
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase">
              <Clock className="w-3.5 h-3.5 text-[#005448]" />
              Avg Arrival Time
            </div>
            <div className="text-2xl font-black text-stone-900">
              {metrics.avgResponseTime} <span className="text-xs font-bold text-stone-500">mins</span>
            </div>
            <p className="text-[10px] text-stone-400">
              From intake synthesis to door
            </p>
          </div>

          {/* 2. Coverage Rate */}
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              Cluster Coverage
            </div>
            <div className="text-2xl font-black text-stone-900">
              {metrics.coverageRate}%
            </div>
            <p className="text-[10px] text-stone-400">
              Requests successfully fulfilled
            </p>
          </div>

          {/* 3. Emergency Dispatch */}
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              108 Dispatch Speed
            </div>
            <div className="text-2xl font-black text-red-700">
              {metrics.emergencyDispatchTime} <span className="text-xs font-bold text-stone-500">mins</span>
            </div>
            <p className="text-[10px] text-stone-400">
              Direct emergency ambulance routing
            </p>
          </div>

          {/* 4. Volunteer Utilization */}
          <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              Volunteer Load
            </div>
            <div className="text-2xl font-black text-stone-900">
              {metrics.volunteerUtilization}%
            </div>
            <p className="text-[10px] text-stone-400">
              Active responder capacity
            </p>
          </div>

        </div>

        {/* AI BOTTLENECK DETECTOR */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            AI Network Bottleneck Diagnostics
          </div>

          <div className="space-y-1.5">
            {metrics.bottlenecks.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <p className="leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
