import Head from "next/head";
import Link from "next/link";
import {
  SEO_KPI_TARGETS,
  SEO_TARGET_KEYWORDS,
} from "@/data/seoTargetKeywords";

export default function SeoDashboardPage() {
  return (
    <>
      <Head>
        <title>SEO KPI Dashboard | Reecomm (Internal)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">
              SEO & GEO KPI Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              90-day tracking reference. Update weekly from Google Search Console
              and GA4. Full checklist:{" "}
              <code className="text-xs bg-gray-200 px-1 rounded">
                docs/SEO_KPI_TRACKING.md
              </code>
            </p>
          </header>

          <section className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold text-lg mb-4">Baseline vs 90-day goals</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-4">Metric</th>
                    <th className="py-2 pr-4">Baseline</th>
                    <th className="py-2">Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Organic sessions</td>
                    <td className="py-2 pr-4">{SEO_KPI_TARGETS.baseline.organicSessions}</td>
                    <td className="py-2">{SEO_KPI_TARGETS.goals.organicSessions}+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Organic new users</td>
                    <td className="py-2 pr-4">{SEO_KPI_TARGETS.baseline.organicNewUsers}</td>
                    <td className="py-2">{SEO_KPI_TARGETS.goals.organicNewUsers}+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">view_search_results</td>
                    <td className="py-2 pr-4">{SEO_KPI_TARGETS.baseline.viewSearchResults}</td>
                    <td className="py-2">{SEO_KPI_TARGETS.goals.viewSearchResults}+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">404 page views</td>
                    <td className="py-2 pr-4">{SEO_KPI_TARGETS.baseline.page404Views}</td>
                    <td className="py-2">&lt; {SEO_KPI_TARGETS.goals.page404Views}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold text-lg mb-4">
              Target keywords (GSC weekly)
            </h2>
            <ul className="space-y-3">
              {SEO_TARGET_KEYWORDS.map((item) => (
                <li
                  key={item.keyword + item.scope}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 pb-3"
                >
                  <div>
                    <span className="font-medium">{item.keyword}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({item.scope})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Link
                      href={item.page}
                      className="text-blue-600 hover:underline"
                    >
                      Target page
                    </Link>
                    <span className="text-gray-600">
                      Goal: {item.page1Goal} · {item.horizonMonths}mo
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-xl border p-6 text-sm text-gray-600">
            <h2 className="font-semibold text-lg mb-2 text-gray-900">
              GA4 key events to mark
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <code>inquire_initiated</code>
              </li>
              <li>
                <code>inquiry_submit</code>
              </li>
              <li>
                <code>view_vehicle</code>
              </li>
              <li>
                <code>view_search_results</code>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
