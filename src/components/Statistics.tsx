import { GET_STATISTICS } from "@/graphql/queries/statistics";
import { useQuery } from "@apollo/client/react";
import Spinner from "./Spinner";
import { StatisticsResponse } from "@/types/statistics";
import Statistic from "./Statistic";

export default function Statistics() {
  const { loading, data: statistics } = useQuery<StatisticsResponse>(GET_STATISTICS);
  const THIS_YEAR = new Date().getFullYear()

  if (loading) return <Spinner />
  if (!statistics) return;
  return (
    <section className="bg-card-muted p-4 rounded-md space-y-2 shadow-sm">
      <h2>Statistics</h2>
      <div className="flex gap-4 flex-wrap">
        <Statistic label={`Books read in ${THIS_YEAR}`} value={statistics.readBookYearCount} />
        <Statistic label="Total books read" value={statistics.readBookCount} />
        <Statistic label={`Unique authors read`} value={statistics.distinctAuthors} />
      </div>
    </section>
  )
}