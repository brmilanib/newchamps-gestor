"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid,
} from "recharts";

const CORES = ["#4b93e8", "#9b7fe0", "#3b9e77", "#d8942f", "#da6152"];
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Barras de receita por concorrente (mês atual). */
export function ReceitaPorConcorrente({ dados }: { dados: Array<{ nome: string; receita: number }> }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis dataKey="nome" tick={{ fontSize: 12, fill: "#5c6679" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `${(v / 1_000_000).toLocaleString("pt-BR")}M`}
            tick={{ fontSize: 12, fill: "#8a94a6" }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip formatter={(v) => brl(Number(v))} cursor={{ fill: "#eef5fe" }} />
          <Bar dataKey="receita" radius={[6, 6, 0, 0]}>
            {dados.map((_, i) => (
              <Cell key={i} fill={CORES[i % CORES.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Linha de evolução de um valor ao longo dos meses (fica útil com 2+ meses). */
export function EvolucaoMensal({ dados }: { dados: Array<{ mes: string; valor: number }> }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={dados} margin={{ top: 8, right: 12, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7ecf4" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#5c6679" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `${(v / 1_000_000).toLocaleString("pt-BR")}M`}
            tick={{ fontSize: 12, fill: "#8a94a6" }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip formatter={(v) => brl(Number(v))} />
          <Line type="monotone" dataKey="valor" stroke="#4b93e8" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
