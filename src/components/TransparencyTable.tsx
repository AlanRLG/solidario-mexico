import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { transactions } from "@/data/events";
import { ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 6;

const TransparencyTable = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paged = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="h-6 w-6 text-secondary" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Transparencia de Donaciones
        </h2>
      </div>
      <p className="text-muted-foreground mb-6 text-sm">
        Cada peso cuenta. Aquí puedes ver todas las transacciones realizadas en tiempo real.
      </p>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">Fecha</TableHead>
              <TableHead className="font-semibold text-foreground">Donante</TableHead>
              <TableHead className="font-semibold text-foreground">Evento</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((tx, i) => (
              <TableRow
                key={tx.id}
                className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
              >
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">{tx.donor}</TableCell>
                <TableCell className="text-sm text-foreground">{tx.event}</TableCell>
                <TableCell className="text-right text-sm font-semibold text-secondary">
                  ${tx.amount.toLocaleString("es-MX")}.00 MXN
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {page + 1} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransparencyTable;
