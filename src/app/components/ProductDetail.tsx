import { useParams, Link } from "react-router";
import { ArrowLeft, ExternalLink, Check, AlertTriangle, X, HelpCircle, ChevronDown, Share2, Flag } from "lucide-react";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ShareModal } from "./ShareModal";
import { ErrorReportModal } from "./ErrorReportModal";

type BadgeStatus = "APPROVED" | "CAUTION" | "NOT_APPROVED" | "UNREGISTERED";

interface Ingredient {
  name: string;
  amount: string;
  status: BadgeStatus;
  evidence: string;
}

const MOCK_PRODUCT = {
  id: 1,
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
  brand: "헬스케어랩",
  name: "프리미엄 NMN 250mg",
  servingSize: "1캡슐",
  dailyCost: 850,
  finalPrice: 25500,
  packageInfo: "30일분",
  ingredients: [
    {
      name: "NMN (니코틴아마이드 모노뉴클레오타이드)",
      amount: "250mg",
      status: "CAUTION" as BadgeStatus,
      evidence: "식약처 고시 기능성 원료는 아니나, 국내 일부 제품에서 '니코틴산아마이드' 형태로 인정받은 사례가 있습니다. 다만 NMN 자체는 현재 개별인정형 원료 신청 검토 중입니다.",
    },
    {
      name: "비타민 B3 (나이아신아마이드)",
      amount: "15mg",
      status: "APPROVED" as BadgeStatus,
      evidence: "식품의약품안전처 고시 제2023-86호에 따라 '에너지 생성에 필요, 피부건강 유지에 필요'로 기능성이 인정된 원료입니다.",
    },
    {
      name: "레스베라트롤",
      amount: "50mg",
      status: "APPROVED" as BadgeStatus,
      evidence: "식약처 개별인정형 기능성 원료로 '항산화 작용을 통한 세포 보호'의 기능성이 인정되었습니다. (인정번호: 2019-21)",
    },
    {
      name: "프테로스틸벤",
      amount: "10mg",
      status: "UNREGISTERED" as BadgeStatus,
      evidence: "식약처 등재 원료가 아닙니다. 국내에서 건강기능식품 기능성 원료로 인정받지 못한 성분입니다.",
    },
  ],
};

const BadgeConfig = {
  APPROVED: {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-800",
    icon: Check,
    label: "인정",
  },
  CAUTION: {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-800",
    icon: AlertTriangle,
    label: "주의",
  },
  NOT_APPROVED: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-800",
    icon: X,
    label: "미인정",
  },
  UNREGISTERED: {
    bg: "bg-slate-100",
    border: "border-slate-300",
    text: "text-slate-700",
    icon: HelpCircle,
    label: "식약처 미등재 원료",
  },
};

function IngredientBadge({ status }: { status: BadgeStatus }) {
  const config = BadgeConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.bg} ${config.border}`}
    >
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
}

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [showSourceInfo, setShowSourceInfo] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl = `${window.location.origin}/share/${productId}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-14 z-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">목록으로 돌아가기</span>
        </button>
      </div>

      {/* Product Header */}
      <div className="bg-white px-4 py-6">
        <div className="w-full aspect-square max-w-xs mx-auto bg-slate-100 rounded-xl overflow-hidden mb-4">
          <img
            src={MOCK_PRODUCT.image}
            alt={MOCK_PRODUCT.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-sm text-slate-500 mb-1">{MOCK_PRODUCT.brand}</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{MOCK_PRODUCT.name}</h1>
        <div className="text-sm text-slate-600">1회 용량: {MOCK_PRODUCT.servingSize}</div>
      </div>

      {/* Price Section */}
      <div className="bg-white px-4 py-5 border-t border-slate-200">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">1일 단가</div>
            <div className="text-4xl font-bold text-blue-600">
              ₩{MOCK_PRODUCT.dailyCost.toLocaleString()}
              <span className="text-lg text-slate-500 ml-1">/ 1일</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">실지불가</div>
            <div className="text-xl font-semibold text-slate-700">
              ₩{MOCK_PRODUCT.finalPrice.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">{MOCK_PRODUCT.packageInfo}</div>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
          최저가 구매
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Badge Verification Section */}
      <div className="mt-4 bg-white px-4 py-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">식약처 기능성 원료 인정 현황</h2>
        <div className="space-y-4">
          {MOCK_PRODUCT.ingredients.map((ingredient, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{ingredient.name}</h3>
                  <div className="text-sm text-slate-600 mb-2">{ingredient.amount}</div>
                </div>
                <IngredientBadge status={ingredient.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Accordion */}
      <div className="mt-4 bg-white px-4 py-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">근거 및 출처</h2>
        <Accordion.Root type="single" collapsible className="space-y-3">
          {MOCK_PRODUCT.ingredients.map((ingredient, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors group">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-1">{ingredient.name}</div>
                    <IngredientBadge status={ingredient.status} />
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 py-4 bg-slate-50 border-t border-slate-200">
                <div className="text-sm text-slate-700 leading-relaxed">{ingredient.evidence}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-6 space-y-3">
        <button
          onClick={() => setShowSourceInfo(true)}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-300"
        >
          출처 확인
          <ExternalLink className="w-4 h-4" />
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            공유하기
          </button>
          <button
            onClick={() => setShowErrorReport(true)}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Flag className="w-4 h-4" />
            오류 신고
          </button>
        </div>
      </div>

      {/* Source Info Modal */}
      {showSourceInfo && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSourceInfo(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">데이터 출처</h3>
              <button
                onClick={() => setShowSourceInfo(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="px-6 py-6 space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">식약처 공식 자료</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• 건강기능식품 기능성 원료 인정 현황 (2026년 4월 기준)</li>
                  <li>• 식품의약품안전처 고시 제2023-86호</li>
                  <li>• 개별인정형 원료 데이터베이스</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">가격 정보</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• 쿠팡 오픈 API (2026-04-23 09:30 기준)</li>
                  <li>• 네이버 쇼핑 가격비교 (수집 중)</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs text-amber-800">
                  본 정보는 참고용이며, 구매 전 반드시 제품 라벨 및 식약처 공식 사이트를
                  확인하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Ingredient Table */}
      <div className="mt-4 bg-white px-4 py-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">전체 성분표</h2>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  성분명
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                  함량
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCT.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-4 py-3 text-sm text-slate-900">{ingredient.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right font-medium">
                    {ingredient.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productName={MOCK_PRODUCT.name}
        productUrl={shareUrl}
      />

      {/* Error Report Modal */}
      <ErrorReportModal
        isOpen={showErrorReport}
        onClose={() => setShowErrorReport(false)}
        productName={MOCK_PRODUCT.name}
        productId={productId}
      />
    </div>
  );
}
