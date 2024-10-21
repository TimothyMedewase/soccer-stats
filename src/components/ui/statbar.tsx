import { Progress } from "@/components/ui/progress";
function StatBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value.toFixed(1)}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}
export default StatBar;
