import { Link } from "react-router";
import { ShieldCheck, FileText, AlertCircle, LogOut, Users } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    { label: "대기 중인 제품 등록 요청", value: 12, color: "blue", icon: FileText },
    { label: "미처리 오류 신고", value: 8, color: "red", icon: AlertCircle },
    { label: "총 사용자", value: 1247, color: "green", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Super-Calc 관리자</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">로그아웃</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/registration-requests"
            className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">제품 등록 요청 관리</h3>
                <p className="text-sm text-blue-100">사용자가 요청한 제품을 검토하고 승인합니다</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/error-reports"
            className="bg-red-600 hover:bg-red-700 rounded-xl p-6 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">오류 신고 관리</h3>
                <p className="text-sm text-red-100">사용자가 신고한 데이터 오류를 처리합니다</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
