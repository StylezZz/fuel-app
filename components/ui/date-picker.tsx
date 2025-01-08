"use client"
//please
import * as React from "react"
import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  date?: Date | null;
  setDate?: (date: Date | null) => void;
  onChange?: (date: Date | null) => void;
}

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  date,
  setDate,
  onChange,
}: DatePickerProps) {
  // Usar el estado interno solo si no se proporciona date y setDate
  const [internalDate, setInternalDate] = React.useState<Date>(new Date());

  // Usar la fecha proporcionada o la interna
  const selectedDate = date ?? internalDate;

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(selectedDate || new Date(), months.indexOf(month));
    handleDateChange(newDate);
  }

  const handleYearChange = (year: string) => {
    const newDate = setYear(selectedDate || new Date(), parseInt(year));
    handleDateChange(newDate);
  }

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      handleDateChange(selectedData);
    }
  }

  const handleDateChange = (newDate: Date) => {
    if(onChange){
        onChange(newDate);
    }
    if(setDate){
        setDate(newDate);
    }else{
        setInternalDate(newDate);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={selectedDate ? months[getMonth(selectedDate)] : months[0]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={selectedDate ? getYear(selectedDate).toString() : years[0].toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={handleSelect}
          initialFocus
          month={selectedDate || undefined}
          onMonthChange={(newDate) => handleDateChange(newDate)}
        />
      </PopoverContent>
    </Popover>
  )
}