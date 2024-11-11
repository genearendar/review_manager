import { Review } from "@/app/protected/reviews/reviewUtils";
import TempButton from "./tempButton";
import { deleteReview } from "@/lib/reviewActions";
import { TableRow } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { X } from "lucide-react";
import { Pencil } from "lucide-react";

export default function SingleReviewBox({ review }: { review: Review }) {
  return (
    <>
      <TableRow>
        <TableCell>{review.body}</TableCell>
        <TableCell>{review.reviewedBy}</TableCell>
        <TableCell>{review.stars}</TableCell>
        <TableCell>{review.date}</TableCell>
        <TableCell>{review.source}</TableCell>
        <TableCell className="flex gap-2">
          <TempButton action={deleteReview.bind(null, review.id!)}>
            <Pencil size={16} />
          </TempButton>
          <TempButton action={deleteReview.bind(null, review.id!)}>
            <X size={16} />
          </TempButton>
        </TableCell>
      </TableRow>
    </>
  );
}
