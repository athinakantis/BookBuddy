import Card from "@/components/ui/Card";

type StatisticProps = Readonly<{
  value: number;
  label: string;
}>

export default function Statistic(props: StatisticProps) {
  const { value, label } = props;
  return (
    <Card className="bg-card p-4 flex rounded-md gap-2 text-sm grow leading-none w-fit justify-start min-w-30 hover:cursor-default flex-row items-end md:w-full">
      <data className="text-xl font-bold leading-[0.8] font-main">{value}</data>{label}
    </Card>
  );
}