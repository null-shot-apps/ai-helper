import PortfolioOverview from '@/components/PortfolioOverview';
import AIRecommendations from '@/components/AIRecommendations';
import PaymentScheduler from '@/components/PaymentScheduler';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            DeFi Assistant Dashboard
          </h1>
          <p className="text-slate-300">
            AI-powered insights for your decentralized finance portfolio
          </p>
        </header>

        {/* Portfolio Overview */}
        <PortfolioOverview />

        {/* AI Recommendations */}
        <AIRecommendations />

        {/* Payment Scheduler */}
        <PaymentScheduler />
      </div>
    </main>
  );
}

