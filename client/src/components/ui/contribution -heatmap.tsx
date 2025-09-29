"use client"

import { useEffect, useState } from "react"
import HeatMap from "@uiw/react-heat-map"

interface ContributionData {
  date: string
  count: number
}

export function ContributionHeatmap({ userId }: { userId: string }) {
  const [data, setData] = useState<{ date: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i).reverse()

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(`/api/contributions?userId=${userId}`)
        const contributions: ContributionData[] = await response.json()

        // Fill missing dates with count: 0
        const filledData = fillMissingDates(contributions)
        setData(filledData)
      } catch (error) {
        console.error("Failed to fetch contributions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [userId])

  function fillMissingDates(contributions: ContributionData[]) {
    const startDate = new Date("2020-01-01")
    const endDate = new Date()
    const contributionMap = new Map(contributions.map((c) => [c.date, c.count]))

    const filledData: { date: string; count: number }[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateStr = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${String(currentDate.getDate()).padStart(2, "0")}`
      filledData.push({
        date: dateStr,
        count: contributionMap.get(dateStr) || 0,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return filledData
  }

  const filteredData = data.filter((item) => {
    const year = Number.parseInt(item.date.split("/")[0])
    return year === selectedYear
  })

  const startDate = new Date(`${selectedYear}-01-01`)
  const endDate = selectedYear === currentYear ? new Date() : new Date(`${selectedYear}-12-31`)

  const totalContributions = filteredData.reduce((sum, item) => sum + item.count, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading contributions...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {totalContributions} contributions in {selectedYear}
          </span>
        </div>
      </div>

      <div className="w-full ">
        <div className="flex w-fit mb-4 flex-row items-center gap-1 border border-border rounded-md p-1 md:sticky md:top-0 md:self-start">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedYear === year
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto">
          <HeatMap
            value={filteredData}
            width="100%"
            startDate={startDate}
            endDate={endDate}
            rectSize={14}
            space={2}
            rectProps={{
              rx: 2,
            }}
            legendCellSize={0}
            panelColors={{
              0: "#ebedf0",
              2: "#9be9a8",
              8: "#40c463",
              16: "#30a14e",
              24: "#216e39",
            }}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
          />
        </div>
      </div>
    </div>
  )
}
