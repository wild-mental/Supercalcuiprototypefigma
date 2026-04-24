import { Link } from "react-router";
import { ArrowLeft, Check, ExternalLink, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ErrorReport {
  id: number;
  productName: string;
  productId: string;
  errorType: string;
  description: string;
  email: string;
  reportDate: string;
  status: "pending" | "resolved";
}

const ERROR_TYPE_MAP: Record<string, string> = {
  price: "가격 정보 오류",
  ingredient: "성분 정보 오류",
  badge: "식약처 인정 현황 오류",
  product_info: "제품명/브랜드 오류",
  other: "기타",
};

const MOCK_REPORTS: ErrorReport[] = [
  {
    id: 1,
    productName: "프리미엄 NMN 250mg",
    productId: "1",
    errorType: "price",
    description: "실제 쿠팡 가격은 22,000원인데 25,500원으로 표시되고 있습니다.",
    email: "user1@example.com",
    reportDate: "2026-04-23 15:20",
    status: "pending",
  },
  {
    id: 2,
    productName: "NMN 순도 99% 고함량",
    productId: "2",
    errorType: "ingredient",
    description: "성분표에 비타민 B3가 누락되어 있습니다.",
    email: "user2@example.com",
    reportDate: "2026-04-23 14:10",
    status: "pending",
  },
  {
    id: 3,
    productName: "NMN + 레스베라트롤 복합",
    productId: "3",
    errorType: "badge",
    description: "레스베라트롤이 '인정' 배지로 표시되어야 하는데 '주의'로 나옵니다.",
    email: "",
    reportDate: "2026-04-23 11:30",
    status: "pending",
  },
  {
    id: 4,
    productName: "NMN 150mg 저용량",
    productId: "4",
    errorType: "product_info",
    description: "브랜드명이 '퓨어라이프'가 아니라 '퓨어헬스'입니다.",
    email: "user4@example.com",
    reportDate: "2026-04-22 18:45",
    status: "resolved",
  },
];

export function AdminErrorReports() {
  const [reports, setReports] = useState<ErrorReport[]>(MOCK_REPORTS);

  const handleResolve = (id: number) => {
    setReports((prev) =>
      prev.map((report) => (report.id === id ? { ...report, status: "resolved" as const } : report))
    );
    toast.success("오류 신고가 처리되었습니다.");
  };

  const pendingReports = reports.filter((r) => r.status === "pending");
  const resolvedReports = reports.filter((r) => r.status === "resolved");

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">대시보드로 돌아가기</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">오류 신고 관리</h1>
          <p className="text-slate-400 mt-1">
            미처리 신고: {pendingReports.length}건
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Pending Reports */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">미처리 신고</h2>
          <div className="space-y-4">
            {pendingReports.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-500">
                미처리 신고가 없습니다.
              </div>
            ) : (
              pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {report.productName}
                        </h3>
                        <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs font-medium rounded">
                          {ERROR_TYPE_MAP[report.errorType]}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 mb-3">
                        신고 시간: {report.reportDate}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {report.email ? (
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{report.email}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">이메일 미제공</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${report.productId}`}
                        target="_blank"
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        제품 보기
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        처리 완료
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resolved Reports */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">처리 완료</h2>
          <div className="space-y-4">
            {resolvedReports.map((report) => (
              <div
                key={report.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {report.productName}
                      </h3>
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded">
                        {ERROR_TYPE_MAP[report.errorType]}
                      </span>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-medium rounded">
                        처리됨
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">
                      신고 시간: {report.reportDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
