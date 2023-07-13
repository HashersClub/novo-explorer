import { API_URL } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { InscriptionResponse } from "../../lib/types";

const InscriptionRenderPDF = ({
  inscription,
  className,
}: {
  inscription: InscriptionResponse;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center bg-[#F2F0ED]", className)}>
      <iframe
        src={`${API_URL}/inscriptions/${inscription.id}/content`}
        title={`Inscription #${inscription.number}`}
        style={{ width: '100%', height: '100%' }}
      >
        Your browser does not support PDFs.
      </iframe>
    </div>
  );
};

export default InscriptionRenderPDF;

