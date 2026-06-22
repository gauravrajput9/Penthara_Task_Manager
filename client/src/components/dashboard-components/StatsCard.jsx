import { Card, CardContent } from "../ui/card";

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) => {
  return (
    <Card
      className={`
        relative overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        border-l-4 ${color}
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {value}
            </h2>

            <p className="mt-2 text-xs text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-3">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};