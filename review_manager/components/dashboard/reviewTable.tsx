import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReviewTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/5">Review text</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Source</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}
