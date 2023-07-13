import { API_URL } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { InscriptionResponse } from "../../lib/types";

const InscriptionRenderHTML = ({
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
        sandbox="allow-scripts allow-same-origin"
      >
        Your browser does not support iframes.
      </iframe>
    </div>
  );
};

export default InscriptionRenderHTML;

