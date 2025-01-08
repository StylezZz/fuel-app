"use client"
import { DatePicker } from "@/components/ui/date-picker"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TimePicker } from "@/components/ui/time-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  fecha: z.date({
    required_error: "La fecha es requerida",
  }),
  hora: z.string().min(1, "La hora es requerida"),
  galones: z.number().min(0.1, "Debe ingresar una cantidad válida de galones"),
  placa: z.string()
    .min(6, "La placa debe tener al menos 6 caracteres")
    .max(8, "La placa no puede tener más de 8 caracteres")
    .regex(/^[A-Z0-9-]+$/, "La placa solo puede contener letras mayúsculas, números y guiones"),
  kilometraje: z.number().min(0, "El kilometraje debe ser mayor a 0"),
  nombreChofer: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  costoPorGalon: z.number().min(0.01, "El costo debe ser mayor a 0"),
  direccionOrigen: z.string().min(5, "La dirección de origen es requerida"),
  direccionDestino: z.string().min(5, "La dirección de destino es requerida"),
})

const NuevoConsumo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      galones: 0,
      kilometraje: 0,
      costoPorGalon: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // Aquí iría la lógica para enviar los datos
  }

  // Lista de choferes (esto podría venir de una API o base de datos)
  const choferes = [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
  ]

  // Función para validar entrada numérica
  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number) => void
  ) => {
    const value = e.target.value;
    // Permite números, punto decimal y vacío
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange(value === '' ? 0 : parseFloat(value));
    }
  };

  return (
    <main className="container mx-auto p-4 lg:p-8 h-max [&_input[type='number']]:appearance-none">
      <h1 className="text-3xl font-bold mb-6">Ingresar Nuevo Consumo</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-5">Fecha</FormLabel>
                  <FormControl>
                    <DatePicker
                      startYear={2023}
                      endYear={2030}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora</FormLabel>
                  <FormControl>
                    <TimePicker onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="galones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galones</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      inputMode="decimal"
                      pattern="[0-9]*[.]?[0-9]*"
                      placeholder="Ej: 15.5"
                      onChange={(e) => handleNumericInput(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Ej: ABC-123"
                      className="uppercase"
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kilometraje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometraje</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Ej: 150000"
                      onChange={(e) => handleNumericInput(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombreChofer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Chofer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un chofer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {choferes.map((chofer) => (
                        <SelectItem key={chofer} value={chofer}>
                          {chofer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costoPorGalon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo por Galón</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      inputMode="decimal"
                      pattern="[0-9]*[.]?[0-9]*"
                      placeholder="Ej: 3.75"
                      onChange={(e) => handleNumericInput(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccionOrigen"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-1">
                  <FormLabel>Dirección Origen</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Ingrese la dirección de origen"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccionDestino"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-1">
                  <FormLabel>Dirección Destino</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Ingrese la dirección de destino"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Guardar Consumo
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default NuevoConsumo