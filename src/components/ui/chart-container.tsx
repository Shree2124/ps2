import type React from "react"

interface ChartContainerProps {
  children: React.ReactNode
  config?: Record<string, { label: string; color: string }>
  className?: string
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background shadow-md p-2 border rounded-md">
        <p className="font-bold">{label}</p>
        {payload.map((item, index) => (
          <p key={`tooltip-${index}`} className="text-muted-foreground text-sm">
            {item.name}: <span style={{ color: item.color }}>{item.value}</span>
          </p>
        ))}
      </div>
    )
  }

  return null
}
