"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface FuelRecord {
  id: string;
  fecha: string;
  hora: string;
  galones: number;
  placa: string;
  kilometraje: number;
  nombreChofer: string;
  costoPorGalon: number;
  direccionOrigen: string;
  direccionDestino: string;
}

export default function ReportesPage() {
  const [records, setRecords] = useState<FuelRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockRecords: FuelRecord[] = [
      {
        id: "1",
        fecha: "2024-01-20",
        hora: "14:30",
        galones: 15.5,
        placa: "ABC-123",
        kilometraje: 45000,
        nombreChofer: "Juan Pérez",
        costoPorGalon: 3.85,
        direccionOrigen: "Lima Centro",
        direccionDestino: "Callao",
      },
      {
        id: "2",
        fecha: "2024-01-21",
        hora: "09:15",
        galones: 18.2,
        placa: "XYZ-789",
        kilometraje: 32000,
        nombreChofer: "María García",
        costoPorGalon: 3.95,
        direccionOrigen: "San Isidro",
        direccionDestino: "Miraflores",
      },
      {
        id: "3",
        fecha: "2024-01-21",
        hora: "16:45",
        galones: 12.8,
        placa: "DEF-456",
        kilometraje: 28500,
        nombreChofer: "Carlos López",
        costoPorGalon: 3.75,
        direccionOrigen: "La Victoria",
        direccionDestino: "San Juan de Lurigancho",
      },
      {
        id: "4",
        fecha: "2024-01-22",
        hora: "11:20",
        galones: 20.0,
        placa: "GHI-789",
        kilometraje: 52000,
        nombreChofer: "Ana Martínez",
        costoPorGalon: 3.9,
        direccionOrigen: "Chorrillos",
        direccionDestino: "San Miguel",
      },
    ];
    
    console.log('Cargando registros:', mockRecords.length);
    setRecords(mockRecords);
    setIsLoading(false);
  }, []);

  console.log('Estado actual de records:', records.length);

  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">
        Reporte de Combustible ({records.length} registros)
      </h1>

      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha/Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Placa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Galones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chofer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo/Galón
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(record.fecha), "dd/MM/yyyy")} {record.hora}
                </td>
                <td className="px-6 py-4">{record.placa}</td>
                <td className="px-6 py-4">{record.galones}</td>
                <td className="px-6 py-4">{record.nombreChofer}</td>
                <td className="px-6 py-4">
                  S/ {record.costoPorGalon.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para móviles */}
      <div className="md:hidden space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">
                Fecha/Hora
              </div>
              <div className="text-sm">
                {format(new Date(record.fecha), "dd/MM/yyyy")} {record.hora}
              </div>

              <div className="text-sm font-medium text-gray-500">Placa</div>
              <div className="text-sm">{record.placa}</div>

              <div className="text-sm font-medium text-gray-500">Galones</div>
              <div className="text-sm">{record.galones}</div>

              <div className="text-sm font-medium text-gray-500">Chofer</div>
              <div className="text-sm">{record.nombreChofer}</div>

              <div className="text-sm font-medium text-gray-500">
                Costo/Galón
              </div>
              <div className="text-sm">
                S/ {record.costoPorGalon.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
