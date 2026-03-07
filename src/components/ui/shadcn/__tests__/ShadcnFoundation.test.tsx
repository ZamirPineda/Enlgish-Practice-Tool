import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn";

describe("shadcn foundation", () => {
  test("renders button primitive", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  test("renders dialog primitive content", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Titulo</DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Titulo")).toBeInTheDocument();
    expect(screen.getByText("Descripcion")).toBeInTheDocument();
  });

  test("renders sheet primitive content", () => {
    render(
      <Sheet open>
        <SheetContent side="right">
          <SheetTitle>Panel</SheetTitle>
          <SheetDescription>Descripcion panel</SheetDescription>
          <p>Contenido</p>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText("Panel")).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  test("renders select primitive trigger", () => {
    render(
      <Select defaultValue="core">
        <SelectTrigger aria-label="Nivel">
          <SelectValue placeholder="Selecciona nivel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="core">Core</SelectItem>
          <SelectItem value="stretch">Stretch</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Nivel" })).toBeInTheDocument();
  });

  test("renders table primitive", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>English</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText("Skill")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  test("renders tooltip primitive content", () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button type="button">Info</button>
          </TooltipTrigger>
          <TooltipContent>Ayuda contextual</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Ayuda contextual");
  });
});
